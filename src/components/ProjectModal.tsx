import React, { useState, useEffect } from 'react';
import { X, FolderPlus, Tag, Calendar, Users, Github, CheckCircle2 } from 'lucide-react';
import { Project, ProjectDifficulty } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    domain: string;
    difficulty: ProjectDifficulty;
    technologies: string[];
    startDate: string;
    targetDate: string;
    teamSize?: string;
    githubUrl?: string;
  }) => void;
  initialProject?: Project;
}

const DOMAINS = [
  'Healthcare',
  'FinTech',
  'Education',
  'Cybersecurity',
  'AI / Machine Learning',
  'Developer Tools',
  'E-Commerce',
  'IoT & Smart City',
  'Social Good & Sustainability',
  'Computer Vision',
  'Natural Language Processing',
  'Other',
];

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialProject,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('AI / Machine Learning');
  const [difficulty, setDifficulty] = useState<ProjectDifficulty>('Intermediate');
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState('');
  const [teamSize, setTeamSize] = useState('Individual');
  const [githubUrl, setGithubUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialProject) {
      setName(initialProject.name);
      setDescription(initialProject.description);
      setDomain(initialProject.domain);
      setDifficulty(initialProject.difficulty);
      setTechnologies(initialProject.technologies);
      setStartDate(initialProject.startDate);
      setTargetDate(initialProject.targetDate);
      setTeamSize(initialProject.teamSize || 'Individual');
      setGithubUrl(initialProject.githubUrl || '');
    } else {
      setName('');
      setDescription('');
      setDomain('AI / Machine Learning');
      setDifficulty('Intermediate');
      setTechnologies(['React', 'Python', 'FastAPI', 'Gemini API']);
      setStartDate(new Date().toISOString().split('T')[0]);
      // Default target date: 6 weeks from today
      const d = new Date();
      d.setDate(d.getDate() + 42);
      setTargetDate(d.toISOString().split('T')[0]);
      setTeamSize('Individual');
      setGithubUrl('');
    }
    setErrors({});
  }, [initialProject, isOpen]);

  if (!isOpen) return null;

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = techInput.trim().replace(/^,+|,+$/g, '');
      if (trimmed && !technologies.includes(trimmed)) {
        setTechnologies([...technologies, trimmed]);
        setTechInput('');
      }
    }
  };

  const removeTech = (item: string) => {
    setTechnologies(technologies.filter((t) => t !== item));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Please enter a project name.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Project name must be at least 3 characters.';
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a project description.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Description should be at least 15 characters to explain project goals.';
    }

    if (technologies.length === 0) {
      newErrors.technologies = 'Please add at least one technology stack item.';
    }

    if (!targetDate) {
      newErrors.targetDate = 'Please select a target completion date.';
    } else if (targetDate < startDate) {
      newErrors.targetDate = 'Target completion date cannot be before start date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      domain,
      difficulty,
      technologies,
      startDate,
      targetDate,
      teamSize,
      githubUrl: githubUrl.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {initialProject ? 'Edit Project Details' : 'Create New Student Project'}
              </h2>
              <p className="text-xs text-slate-400">Set up your workspace and AI mentoring context</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Project Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Project Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AI Medical Symptom Triage Chatbot"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description & Objectives <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the problem statement, proposed approach, and target users..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
            {errors.description && <p className="text-xs text-rose-400 mt-1">{errors.description}</p>}
          </div>

          {/* Domain & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as ProjectDifficulty[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                      difficulty === lvl
                        ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tech Stack & Libraries <span className="text-rose-400">*</span>
            </label>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 focus-within:border-indigo-500">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {technologies.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700/80"
                  >
                    <Tag className="w-3 h-3 text-indigo-400" />
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => removeTech(t)}
                      className="hover:text-rose-400 ml-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                placeholder="Type technology (e.g. Next.js, PyTorch) and press Enter..."
                className="w-full bg-transparent px-1 text-xs text-white focus:outline-none"
              />
            </div>
            {errors.technologies && <p className="text-xs text-rose-400 mt-1">{errors.technologies}</p>}
          </div>

          {/* Dates & Team */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Start Date</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Target Date</span>
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              {errors.targetDate && <p className="text-xs text-rose-400 mt-1">{errors.targetDate}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Team Size</span>
              </label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Individual">Individual (Solo)</option>
                <option value="2 Members">2 Members</option>
                <option value="3 Members">3 Members</option>
                <option value="4 Members">4 Members (Cap-stone)</option>
              </select>
            </div>
          </div>

          {/* GitHub Repository Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub Repository URL (Optional)</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-username/your-project"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/30 cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{initialProject ? 'Save Changes' : 'Initialize Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
