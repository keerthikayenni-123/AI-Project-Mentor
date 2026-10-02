/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project, Task, RecentActivity, ProjectIdea, UserAccount } from './types';
import { storageService } from './services/storageService';
import { projectService } from './services/projectService';
import { Navbar } from './components/Navbar';
import { Sidebar, NavPage } from './components/Sidebar';
import { ProjectModal } from './components/ProjectModal';
import { AuthPortal } from './pages/AuthPortal';

// Pages
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { IdeaGenerator } from './pages/IdeaGenerator';
import { Roadmap } from './pages/Roadmap';
import { CodeMentor } from './pages/CodeMentor';
import { Documentation } from './pages/Documentation';
import { Evaluator } from './pages/Evaluator';
import { Skills } from './pages/Skills';
import { MentorChat } from './pages/MentorChat';
import { About } from './pages/About';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<NavPage>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(undefined);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Initialize data and check auth on mount
  useEffect(() => {
    const user = storageService.getCurrentUser();
    setCurrentUser(user);
    setIsAuthLoading(false);

    loadData();
    const savedTheme = storageService.getTheme();
    setTheme(savedTheme);
    storageService.setTheme(savedTheme);
  }, []);

  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    loadData();
  };

  const handleLogout = () => {
    storageService.logoutUser();
    setCurrentUser(null);
  };

  const loadData = () => {
    const projs = storageService.getProjects();
    setProjects(projs);

    const active = storageService.getActiveProject();
    setActiveProject(active);

    const allTasks = storageService.getTasks();
    setTasks(allTasks);

    const acts = storageService.getRecentActivities();
    setActivities(acts);
  };

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    storageService.setTheme(next);
  };

  const handleSelectProject = (id: string) => {
    storageService.setActiveProjectId(id);
    const selected = storageService.getProjectById(id);
    setActiveProject(selected);
  };

  const handleOpenNewProject = () => {
    setProjectToEdit(undefined);
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsProjectModalOpen(true);
  };

  const handleProjectSubmit = (data: any) => {
    if (projectToEdit) {
      const updated = storageService.updateProject({
        ...projectToEdit,
        ...data,
      });
      loadData();
      setActiveProject(updated);
    } else {
      const created = storageService.saveProject(data);
      loadData();
      setActiveProject(created);
      setCurrentPage('roadmap');
    }
  };

  const handleDeleteProject = (id: string) => {
    storageService.deleteProject(id);
    loadData();
  };

  const handleToggleTask = (taskId: string) => {
    storageService.toggleTaskStatus(taskId);
    loadData();
  };

  const handleAddTask = (taskData: any) => {
    storageService.saveTask(taskData);
    loadData();
  };

  const handleUpdateTask = (task: Task) => {
    storageService.updateTask(task);
    loadData();
  };

  const handleDeleteTask = (taskId: string) => {
    storageService.deleteTask(taskId);
    loadData();
  };

  const handleResetData = () => {
    storageService.resetToSampleData();
    loadData();
  };

  // Adopt idea from Idea Generator
  const handleAdoptIdea = (idea: ProjectIdea) => {
    const techArray = [
      idea.recommendedTechStack.frontend,
      idea.recommendedTechStack.backend,
      idea.recommendedTechStack.database,
      idea.recommendedTechStack.aiMl,
    ]
      .filter(Boolean)
      .join(', ')
      .split(',')
      .map((s) => s.trim());

    const created = storageService.saveProject({
      name: idea.title,
      description: `${idea.problemStatement} — ${idea.proposedSolution}`,
      domain: 'AI / Machine Learning',
      difficulty: idea.expectedDifficulty,
      technologies: techArray,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
      teamSize: 'Individual',
      status: 'Planning',
    });

    loadData();
    setActiveProject(created);
  };

  const handleAdoptAnalyzedProject = (data: {
    title: string;
    description: string;
    domain: string;
    tech: string[];
  }) => {
    const created = storageService.saveProject({
      name: data.title,
      description: data.description,
      domain: data.domain,
      difficulty: 'Intermediate',
      technologies: data.tech,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
      teamSize: 'Individual',
      status: 'Planning',
    });

    loadData();
    setActiveProject(created);
  };

  // If loading session
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-slate-400 font-medium">Initializing student workspace...</span>
        </div>
      </div>
    );
  }

  // Auth gate: User must create account or login first
  if (!currentUser) {
    return (
      <AuthPortal
        onAuthSuccess={handleAuthSuccess}
        currentTheme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-600/30 selection:text-white ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        projects={projects}
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
        onOpenNewProject={handleOpenNewProject}
        onResetData={handleResetData}
        currentTheme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onNavigateLanding={() => setCurrentPage('landing')}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => setCurrentPage(page)}
          activeProject={activeProject}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Center Content View Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentPage === 'landing' && (
            <Landing
              onNavigate={(page) => setCurrentPage(page)}
              onOpenNewProject={handleOpenNewProject}
              projectCount={projects.length}
            />
          )}

          {currentPage === 'dashboard' && (
            <Dashboard
              projects={projects}
              activeProject={activeProject}
              tasks={tasks}
              activities={activities}
              onNavigate={(page) => setCurrentPage(page)}
              onOpenNewProject={handleOpenNewProject}
              onToggleTask={handleToggleTask}
              onSelectProject={handleSelectProject}
              currentUser={currentUser}
            />
          )}

          {currentPage === 'projects' && (
            <Projects
              projects={projects}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onOpenNewProject={handleOpenNewProject}
              onEditProject={handleOpenEditProject}
              onDeleteProject={handleDeleteProject}
              onNavigate={(page) => setCurrentPage(page)}
            />
          )}

          {currentPage === 'idea-generator' && (
            <IdeaGenerator
              onAdoptIdea={handleAdoptIdea}
              onAdoptAnalyzedProject={handleAdoptAnalyzedProject}
              onNavigate={(page) => setCurrentPage(page)}
            />
          )}

          {currentPage === 'roadmap' && (
            <Roadmap
              projects={projects}
              activeProject={activeProject}
              tasks={tasks}
              onSelectProject={handleSelectProject}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onRefreshTasks={loadData}
            />
          )}

          {currentPage === 'code-mentor' && (
            <CodeMentor
              activeProject={activeProject}
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          )}

          {currentPage === 'documentation' && (
            <Documentation activeProject={activeProject} />
          )}

          {currentPage === 'evaluator' && (
            <Evaluator activeProject={activeProject} />
          )}

          {currentPage === 'skills' && (
            <Skills activeProject={activeProject} />
          )}

          {currentPage === 'chat' && (
            <MentorChat activeProject={activeProject} />
          )}

          {currentPage === 'about' && (
            <About onNavigate={(page) => setCurrentPage(page)} />
          )}
        </main>
      </div>

      {/* Global Project Create/Edit Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleProjectSubmit}
        initialProject={projectToEdit}
      />
    </div>
  );
}
