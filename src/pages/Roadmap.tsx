import React, { useState } from 'react';
import {
  Milestone,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Flag,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Project, Task, TaskPriority, TaskStatus } from '../types';
import { ProgressBar } from '../components/ProgressBar';
import { TaskModal } from '../components/TaskModal';
import { LoadingState } from '../components/LoadingState';
import { ErrorMessage } from '../components/ErrorMessage';
import { EmptyState } from '../components/EmptyState';
import { aiService } from '../services/aiService';
import { projectService } from '../services/projectService';

interface RoadmapProps {
  projects: Project[];
  activeProject?: Project;
  tasks: Task[];
  onSelectProject: (id: string) => void;
  onToggleTask: (taskId: string) => void;
  onAddTask: (taskData: any) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onRefreshTasks: () => void;
}

const PHASES = [
  { id: 'phase-1', number: 1, name: 'Phase 1 — Requirement Analysis' },
  { id: 'phase-2', number: 2, name: 'Phase 2 — UI/UX Design & Architecture' },
  { id: 'phase-3', number: 3, name: 'Phase 3 — Database & Data Layer' },
  { id: 'phase-4', number: 4, name: 'Phase 4 — Core Backend / APIs' },
  { id: 'phase-5', number: 5, name: 'Phase 5 — AI Integration & Logic' },
  { id: 'phase-6', number: 6, name: 'Phase 6 — Testing & Quality Assurance' },
  { id: 'phase-7', number: 7, name: 'Phase 7 — Documentation & Polish' },
  { id: 'phase-8', number: 8, name: 'Phase 8 — Deployment & Presentation' },
];

export const Roadmap: React.FC<RoadmapProps> = ({
  projects,
  activeProject,
  tasks,
  onSelectProject,
  onToggleTask,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onRefreshTasks,
}) => {
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | TaskStatus>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | TaskPriority>('All');
  const [phaseFilter, setPhaseFilter] = useState<string>('All');

  // Accordion state: which phases are expanded (default: all expanded or first 4)
  const [expandedPhases, setExpandedPhases] = useState<{ [key: string]: boolean }>({
    'phase-1': true,
    'phase-2': true,
    'phase-3': true,
    'phase-4': true,
    'phase-5': true,
    'phase-6': true,
    'phase-7': true,
    'phase-8': true,
  });

  // Modal state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [targetPhaseForNewTask, setTargetPhaseForNewTask] = useState<string>('phase-1');

  // AI Roadmap Generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  // Filter tasks to active project
  const projectTasks = activeProject
    ? tasks.filter((t) => t.projectId === activeProject.id)
    : tasks;

  // Filter tasks by search & selects
  const filteredTasks = projectTasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesPhase = phaseFilter === 'All' || t.phaseId === phaseFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesPhase;
  });

  // Stats
  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = projectTasks.filter((t) => t.status === 'In Progress').length;
  const pendingTasks = projectTasks.filter((t) => t.status === 'Not Started').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Determine current active phase
  let currentPhaseName = 'Phase 1 — Requirement Analysis';
  for (const ph of PHASES) {
    const phTasks = projectTasks.filter((t) => t.phaseId === ph.id);
    const phCompleted = phTasks.filter((t) => t.status === 'Completed').length;
    if (phTasks.length === 0 || phCompleted < phTasks.length) {
      currentPhaseName = ph.name;
      break;
    }
  }

  const togglePhaseExpand = (phaseId: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const handleOpenAddTask = (phaseId?: string) => {
    setTaskToEdit(undefined);
    setTargetPhaseForNewTask(phaseId || 'phase-1');
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskSubmit = (data: any) => {
    if (!activeProject) return;
    if (taskToEdit) {
      onUpdateTask({
        ...taskToEdit,
        ...data,
      });
    } else {
      onAddTask({
        ...data,
        projectId: activeProject.id,
      });
    }
    setIsTaskModalOpen(false);
  };

  const handleGenerateAiRoadmap = async () => {
    if (!activeProject) return;
    setIsGenerating(true);
    setGenError(null);

    const res = await aiService.generateRoadmap({
      title: activeProject.name,
      description: activeProject.description,
      domain: activeProject.domain,
      techStack: activeProject.technologies.join(', '),
      difficulty: activeProject.difficulty,
    });

    setIsGenerating(false);
    if (res.success && res.data) {
      projectService.saveRoadmapTasks(activeProject.id, res.data);
      onRefreshTasks();
    } else {
      setGenError(res.error || 'Failed to generate roadmap from AI.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Milestone className="w-6 h-6 text-indigo-400" />
            <span>AI Project Roadmap & Task Planner</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track your capstone progress across 8 engineering phases. Completion auto-updates project status.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleGenerateAiRoadmap}
            disabled={!activeProject || isGenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Auto-Generate 8-Phase Roadmap</span>
          </button>

          <button
            onClick={() => handleOpenAddTask()}
            disabled={!activeProject}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/30 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {genError && <ErrorMessage message={genError} onRetry={handleGenerateAiRoadmap} />}

      {/* Active Project Switcher Strip */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">Target Project:</span>
          <select
            value={activeProject?.id || ''}
            onChange={(e) => onSelectProject(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer max-w-xs"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.domain})
              </option>
            ))}
          </select>
        </div>

        {activeProject && (
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">
              Current Focus: <strong className="text-indigo-300">{currentPhaseName}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Progress Dashboard Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] text-slate-400">Total Tasks</span>
            <p className="text-xl font-bold text-white mt-0.5">{totalTasks}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] text-emerald-400">Completed</span>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">{completedTasks}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] text-indigo-400">In Progress</span>
            <p className="text-xl font-bold text-indigo-400 mt-0.5">{inProgressTasks}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] text-slate-400">Not Started</span>
            <p className="text-xl font-bold text-slate-300 mt-0.5">{pendingTasks}</p>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-300">Development Velocity</span>
            <span className="text-white font-mono">{progressPercent}% Completed</span>
          </div>
          <ProgressBar progress={progressPercent} size="md" />
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search milestone tasks or requirements..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as any)}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <select
          value={phaseFilter}
          onChange={(e) => setPhaseFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="All">All 8 Phases</option>
          {PHASES.map((p) => (
            <option key={p.id} value={p.id}>
              Phase {p.number}
            </option>
          ))}
        </select>
      </div>

      {isGenerating && (
        <LoadingState
          title="Synthesizing 8-Phase Engineering Roadmap..."
          message="Structuring software requirements, UI architecture, database schema, AI guardrails, testing suite, and viva defense presentation..."
        />
      )}

      {/* 8-Phase Visual Roadmap Accordion */}
      <div className="space-y-4">
        {PHASES.map((phase) => {
          const phaseTasks = filteredTasks.filter((t) => t.phaseId === phase.id);
          const allPhaseTasks = projectTasks.filter((t) => t.phaseId === phase.id);
          const phaseCompleted = allPhaseTasks.filter((t) => t.status === 'Completed').length;
          const phaseProgress =
            allPhaseTasks.length > 0 ? Math.round((phaseCompleted / allPhaseTasks.length) * 100) : 0;
          const isExpanded = expandedPhases[phase.id] ?? true;

          return (
            <div
              key={phase.id}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
            >
              {/* Phase Header Accordion Toggle */}
              <div
                onClick={() => togglePhaseExpand(phase.id)}
                className="p-4 sm:px-6 flex items-center justify-between cursor-pointer bg-slate-950/40 hover:bg-slate-950/70 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      phaseProgress === 100
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}
                  >
                    {phase.number}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>{phase.name}</span>
                      {phaseProgress === 100 && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {phaseCompleted} of {allPhaseTasks.length} tasks completed ({phaseProgress}%)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenAddTask(phase.id);
                    }}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>

                  <div className="w-20 hidden md:block">
                    <ProgressBar progress={phaseProgress} size="sm" />
                  </div>

                  <div className="p-1 rounded-lg text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Tasks List inside Phase */}
              {isExpanded && (
                <div className="p-4 sm:px-6 pt-2 border-t border-slate-800/80 space-y-2.5">
                  {phaseTasks.length > 0 ? (
                    phaseTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                          task.status === 'Completed'
                            ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                            : task.status === 'In Progress'
                            ? 'bg-indigo-950/20 border-indigo-500/30'
                            : 'bg-slate-950/80 border-slate-800/80'
                        }`}
                      >
                        {/* Status Checkbox Button */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <button
                            onClick={() => onToggleTask(task.id)}
                            className="mt-0.5 shrink-0 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
                            title={`Status: ${task.status}. Click to cycle: Not Started -> In Progress -> Completed`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                task.status === 'Completed'
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : task.status === 'In Progress'
                                  ? 'border-indigo-400 bg-indigo-500/20'
                                  : 'border-slate-600 hover:border-slate-400'
                              }`}
                            >
                              {task.status === 'In Progress' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              )}
                            </div>
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-xs font-semibold ${
                                  task.status === 'Completed'
                                    ? 'line-through text-slate-400'
                                    : 'text-slate-100'
                                }`}
                              >
                                {task.title}
                              </span>

                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                  task.priority === 'High'
                                    ? 'bg-rose-500/20 text-rose-300'
                                    : task.priority === 'Medium'
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {task.priority}
                              </span>

                              <span className="text-[10px] text-slate-500 font-mono">
                                {task.status}
                              </span>
                            </div>

                            {task.description && (
                              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                                {task.description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{task.estimatedTime}</span>
                              </span>
                              {task.dueDate && <span>Due: {task.dueDate}</span>}
                              {task.dependencies && task.dependencies.length > 0 && (
                                <span>Prereq: {task.dependencies.join(', ')}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Task Action Buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleOpenEditTask(task)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Edit Task"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-xs text-slate-500">
                      No tasks found in this phase matching your active filters.{' '}
                      <button
                        onClick={() => handleOpenAddTask(phase.id)}
                        className="text-indigo-400 hover:underline cursor-pointer"
                      >
                        + Add a task
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Task Creation / Edit Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleTaskSubmit}
        initialTask={taskToEdit}
        defaultPhaseId={targetPhaseForNewTask}
      />
    </div>
  );
};

export default Roadmap;
