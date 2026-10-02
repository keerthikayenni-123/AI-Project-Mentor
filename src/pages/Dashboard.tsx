import React from 'react';
import {
  FolderKanban,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Milestone,
  FileText,
  ShieldCheck,
  MessageSquareCode,
  ArrowRight,
  Clock,
  AlertCircle,
  PlusCircle,
  Tag,
  Github,
  Calendar,
} from 'lucide-react';
import { Project, Task, RecentActivity, UserAccount } from '../types';
import { DashboardCard } from '../components/DashboardCard';
import { ProgressBar } from '../components/ProgressBar';
import { NavPage } from '../components/Sidebar';

interface DashboardProps {
  projects: Project[];
  activeProject?: Project;
  tasks: Task[];
  activities: RecentActivity[];
  onNavigate: (page: NavPage) => void;
  onOpenNewProject: () => void;
  onToggleTask: (taskId: string) => void;
  onSelectProject: (projectId: string) => void;
  currentUser?: UserAccount | null;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  activeProject,
  tasks,
  activities,
  onNavigate,
  onOpenNewProject,
  onToggleTask,
  onSelectProject,
  currentUser,
}) => {
  // Statistics calculations
  const totalProjects = projects.length;
  const activeProjectsCount = projects.filter((p) => p.status !== 'Completed').length;
  const completedProjectsCount = projects.filter((p) => p.status === 'Completed').length;

  const activeProjectTasks = activeProject
    ? tasks.filter((t) => t.projectId === activeProject.id)
    : tasks;

  const totalTasksCount = activeProjectTasks.length;
  const completedTasksCount = activeProjectTasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = activeProjectTasks.filter((t) => t.status !== 'Completed');

  const overallProgress =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : activeProject?.progress || 0;

  // Dynamic user details based on logged in account
  const studentDisplayName = currentUser?.fullName || 'Student';
  const studentDepartment = currentUser?.degreeOrBranch || 'Engineering & Technology';

  // Upcoming top 4 pending tasks
  const upcomingTasks = pendingTasks.slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Student Workspace
            </span>
            <span className="text-xs text-slate-400">
              {currentUser?.semesterOrYear ? `${currentUser.semesterOrYear} • ` : ''}{studentDepartment}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Welcome back, <span className="text-indigo-400">{studentDisplayName}</span>!
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Here is the current state of your engineering projects, upcoming roadmap milestones, and AI guidance.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <MessageSquareCode className="w-4 h-4 text-indigo-400" />
            <span>Ask Mentor</span>
          </button>

          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Active Projects"
          value={activeProjectsCount}
          subtitle={`${completedProjectsCount} completed • ${totalProjects} total`}
          icon={FolderKanban}
          badge={{ text: 'Tracking', type: 'accent' }}
          onClick={() => onNavigate('projects')}
        />
        <DashboardCard
          title="Milestone Tasks"
          value={`${completedTasksCount}/${totalTasksCount}`}
          subtitle={`${pendingTasks.length} pending action`}
          icon={CheckCircle2}
          badge={{ text: `${overallProgress}% done`, type: 'positive' }}
          onClick={() => onNavigate('roadmap')}
        />
        <DashboardCard
          title="Project Velocity"
          value={`${overallProgress}%`}
          subtitle={activeProject ? activeProject.status : 'On schedule'}
          icon={TrendingUp}
          badge={{ text: 'Sprint 3', type: 'neutral' }}
          onClick={() => onNavigate('roadmap')}
        />
        <DashboardCard
          title="AI Mentoring"
          value={activities.length}
          subtitle="Diagnostics & doc runs"
          icon={Sparkles}
          badge={{ text: 'Gemini 3.8', type: 'positive' }}
          onClick={() => onNavigate('chat')}
        />
      </div>

      {/* Current Active Project Spotlight */}
      {activeProject ? (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Current Spotlight Project
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                  {activeProject.domain}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    activeProject.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : activeProject.status === 'Testing'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {activeProject.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white">{activeProject.name}</h2>
              <p className="text-xs text-slate-300 max-w-3xl mt-1 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="View GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => onNavigate('evaluator')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Evaluate Viva</span>
              </button>
            </div>
          </div>

          {/* Progress Bar & Tech Chips */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-400">Roadmap Completion</span>
              <span className="text-white font-bold">{overallProgress}%</span>
            </div>
            <ProgressBar progress={overallProgress} size="md" />

            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
                <Tag className="w-3 h-3 text-slate-400" />
                <span>Stack:</span>
              </span>
              {activeProject.technologies.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Module Jump Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              onClick={() => onNavigate('roadmap')}
              className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/70 border border-slate-800 hover:border-indigo-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <Milestone className="w-3.5 h-3.5 text-indigo-400" />
                  Roadmap
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">8 Phases & Tasks</p>
            </button>

            <button
              onClick={() => onNavigate('code-mentor')}
              className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/70 border border-slate-800 hover:border-indigo-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Code Mentor
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Debug & Explain</p>
            </button>

            <button
              onClick={() => onNavigate('documentation')}
              className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/70 border border-slate-800 hover:border-indigo-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  Documentation
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">SRS & README</p>
            </button>

            <button
              onClick={() => onNavigate('evaluator')}
              className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/70 border border-slate-800 hover:border-indigo-500/30 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  Evaluator
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">9 Viva Rubrics</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-dashed border-slate-800 text-center">
          <p className="text-sm text-slate-400">No active project selected.</p>
          <button
            onClick={onOpenNewProject}
            className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl cursor-pointer"
          >
            Create Your First Project
          </button>
        </div>
      )}

      {/* Two Column Layout: Upcoming Tasks & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upcoming Tasks with Quick Status Toggle */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Upcoming Milestone Tasks</span>
              </h3>
              <p className="text-xs text-slate-400">Click circle to mark completed or advance status</p>
            </div>
            <button
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer flex items-center gap-1"
            >
              <span>View all ({pendingTasks.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 flex items-start gap-3 transition-colors group"
                >
                  <button
                    onClick={() => onToggleTask(t.id)}
                    className="mt-0.5 shrink-0 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
                    title={`Current: ${t.status}. Click to advance.`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        t.status === 'Completed'
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : t.status === 'In Progress'
                          ? 'border-indigo-400 bg-indigo-500/20'
                          : 'border-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {t.status === 'In Progress' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    </div>
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-200 truncate">{t.title}</p>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          t.priority === 'High'
                            ? 'bg-rose-500/20 text-rose-300'
                            : t.priority === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.phaseName}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                      <span>Est: {t.estimatedTime}</span>
                      {t.dueDate && <span>Due: {t.dueDate}</span>}
                      <span className="text-indigo-400/80 font-medium">{t.status}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                All tasks are marked completed! Generate a new roadmap or add tasks.
              </div>
            )}
          </div>
        </div>

        {/* Right: Recent AI Activity & Quick Recommendations */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Recent AI Guidance & Activity</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Live Sync</span>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 4).map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-slate-200 truncate">{act.title}</p>
                    <span className="text-[10px] text-slate-500 shrink-0">{act.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{act.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick AI Tip Callout */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Mentor Pro-Tip:</span>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                Before your semester viva presentation, use the <strong>Project Evaluator</strong> to run a mock
                audit across all 9 categories so there are no surprises during examiner questions!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
