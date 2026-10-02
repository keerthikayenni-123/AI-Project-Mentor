import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Clock, Flag } from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    phaseId: string;
    phaseName: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    estimatedTime: string;
    dueDate?: string;
  }) => void;
  initialTask?: Task;
  defaultPhaseId?: string;
}

const PHASES = [
  { id: 'phase-1', name: 'Phase 1 — Requirement Analysis' },
  { id: 'phase-2', name: 'Phase 2 — UI/UX Design & Architecture' },
  { id: 'phase-3', name: 'Phase 3 — Database & Data Layer' },
  { id: 'phase-4', name: 'Phase 4 — Core Backend / APIs' },
  { id: 'phase-5', name: 'Phase 5 — AI Integration & Logic' },
  { id: 'phase-6', name: 'Phase 6 — Testing & Quality Assurance' },
  { id: 'phase-7', name: 'Phase 7 — Documentation & Polish' },
  { id: 'phase-8', name: 'Phase 8 — Deployment & Presentation' },
];

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
  defaultPhaseId,
}) => {
  const [title, setTitle] = useState('');
  const [phaseId, setPhaseId] = useState(defaultPhaseId || 'phase-1');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [status, setStatus] = useState<TaskStatus>('Not Started');
  const [estimatedTime, setEstimatedTime] = useState('2 days');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setPhaseId(initialTask.phaseId);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
      setEstimatedTime(initialTask.estimatedTime);
      setDueDate(initialTask.dueDate || '');
    } else {
      setTitle('');
      setPhaseId(defaultPhaseId || 'phase-1');
      setDescription('');
      setPriority('Medium');
      setStatus('Not Started');
      setEstimatedTime('2 days');
      setDueDate('');
    }
    setErrors({});
  }, [initialTask, defaultPhaseId, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Please enter a task title.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedPhase = PHASES.find((p) => p.id === phaseId);
    onSubmit({
      title: title.trim(),
      phaseId,
      phaseName: matchedPhase?.name || 'Phase 1 — Requirement Analysis',
      description: description.trim(),
      priority,
      status,
      estimatedTime: estimatedTime.trim() || '2 days',
      dueDate: dueDate || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h2 className="text-base font-bold text-white">
            {initialTask ? 'Edit Milestone Task' : 'Add Milestone Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Task Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement Pydantic validation schema for chat endpoint"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Phase</label>
            <select
              value={phaseId}
              onChange={(e) => setPhaseId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {PHASES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Technical objectives, files to edit, acceptance test..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Flag className="w-3.5 h-3.5 text-slate-400" />
                <span>Priority</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Estimated Time</span>
              </label>
              <input
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="e.g. 3 days / 6 hours"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Due Date (Optional)</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/30 cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{initialTask ? 'Update Task' : 'Add to Roadmap'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
