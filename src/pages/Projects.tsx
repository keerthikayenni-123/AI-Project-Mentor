import React, { useState } from 'react';
import {
  FolderKanban,
  Search,
  Filter,
  PlusCircle,
  Tag,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit3,
  ArrowRight,
  ExternalLink,
  Github,
  Users,
  FileText,
  Sparkles,
  Download,
} from 'lucide-react';
import { Project, ProjectDifficulty, ProjectStatus } from '../types';
import { ProgressBar } from '../components/ProgressBar';
import { EmptyState } from '../components/EmptyState';
import { NavPage } from '../components/Sidebar';
import { SRSViewerModal } from '../components/SRSViewerModal';

interface ProjectsPageProps {
  projects: Project[];
  activeProject?: Project;
  onSelectProject: (id: string) => void;
  onOpenNewProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onNavigate: (page: NavPage) => void;
}

export const Projects: React.FC<ProjectsPageProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onOpenNewProject,
  onEditProject,
  onDeleteProject,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [selectedSRSProject, setSelectedSRSProject] = useState<Project | null>(null);
  const [isSRSModalOpen, setIsSRSModalOpen] = useState(false);

  // Extract distinct domains from existing projects
  const domains = ['All', ...Array.from(new Set(projects.map((p) => p.domain)))];

  // Filtering logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = selectedDomain === 'All' || project.domain === selectedDomain;
    const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;

    return matchesSearch && matchesDomain && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <FolderKanban className="w-6 h-6 text-indigo-400" />
            <span>My Engineering Projects</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage student workspaces, track completion progress, and switch AI mentoring context.
          </p>
        </div>

        <button
          onClick={onOpenNewProject}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/30 cursor-pointer active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* SRS Quick Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/60 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30 shrink-0 mt-0.5">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">IEEE 830-1998 SRS Document Engine</h3>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                12 Pages · Min 10 Required
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Generate an academic-ready Software Requirements Specification for any project below with 1-click download in PDF, Word (.doc), Markdown, or Vector Print!
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedSRSProject(activeProject || projects[0]);
            setIsSRSModalOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Active Project SRS</span>
        </button>
      </div>

      {/* Search and Filters Strip */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, description, or tech stack (e.g. Python, React)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Domain Dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {domains.map((d) => (
              <option key={d} value={d}>
                Domain: {d}
              </option>
            ))}
          </select>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">Difficulty: All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="Planning">Planning</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Active Filter Chips indicator */}
        {(selectedDomain !== 'All' || selectedDifficulty !== 'All' || selectedStatus !== 'All' || searchQuery) && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <span>Active filters:</span>
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200">
                Keyword: "{searchQuery}"
              </span>
            )}
            {selectedDomain !== 'All' && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200">{selectedDomain}</span>
            )}
            {selectedDifficulty !== 'All' && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200">{selectedDifficulty}</span>
            )}
            {selectedStatus !== 'All' && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200">{selectedStatus}</span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('All');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
              }}
              className="text-indigo-400 hover:underline cursor-pointer ml-auto"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => {
            const isActive = project.id === activeProject?.id;

            return (
              <div
                key={project.id}
                className={`p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-2 border-indigo-500/70 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Badges & Actions */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {project.domain}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          project.difficulty === 'Advanced'
                            ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            : project.difficulty === 'Intermediate'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {project.difficulty}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          project.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-indigo-500/20 text-indigo-300'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditProject(project)}
                        title="Edit Project Details"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setProjectToDelete(project.id)}
                        title="Delete Project"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white leading-snug">{project.name}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.technologies.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] text-slate-500 self-center">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom section: Progress, dates, and actions */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-slate-400">Milestone Progress</span>
                      <span className="text-white font-bold">{project.progress}%</span>
                    </div>
                    <ProgressBar progress={project.progress} size="sm" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>Target: {project.targetDate}</span>
                      </span>
                      {project.teamSize && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-500" />
                          <span>{project.teamSize}</span>
                        </span>
                      )}
                    </div>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white"
                        title="GitHub Link"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Context Activation & Quick Launch */}
                  <div className="flex items-center gap-2 pt-1">
                    {isActive ? (
                      <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Active Context</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSelectProject(project.id)}
                        className="flex-1 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                      >
                        Set as Active
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onSelectProject(project.id);
                        onNavigate('roadmap');
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <span>Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 10+ Page SRS Document Button */}
                  <button
                    onClick={() => {
                      setSelectedSRSProject(project);
                      setIsSRSModalOpen(true);
                    }}
                    className="w-full mt-1.5 py-2 px-3 text-xs font-semibold text-indigo-200 bg-indigo-950/60 hover:bg-indigo-900/80 hover:text-white rounded-xl transition-all border border-indigo-700/50 hover:border-indigo-500 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    title="Generate and download minimum 10-page IEEE 830 SRS Document (PDF, Word, Markdown, Print)"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>📄 10+ Page SRS Document</span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      IEEE 830
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={FolderKanban}
          title="No projects match your filter"
          description="Try clearing your search query or adjusting domain/difficulty filter options."
          actionText="Create New Project"
          onAction={onOpenNewProject}
        />
      )}

      {/* SRS Document Generator & Multi-Page Viewer Modal */}
      <SRSViewerModal
        project={selectedSRSProject || activeProject || projects[0]}
        isOpen={isSRSModalOpen}
        onClose={() => setIsSRSModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" />
              Delete Project?
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Are you sure you want to delete this project? All associated tasks, milestone progress, and notes
              will be permanently removed.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteProject(projectToDelete);
                  setProjectToDelete(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
