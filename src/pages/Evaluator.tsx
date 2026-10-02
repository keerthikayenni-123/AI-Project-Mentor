import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Award,
  Layers,
  FileText,
  Terminal,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { Project, ProjectEvaluation } from '../types';
import { aiService } from '../services/aiService';
import { LoadingState } from '../components/LoadingState';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProgressBar } from '../components/ProgressBar';

interface EvaluatorProps {
  activeProject?: Project;
}

export const Evaluator: React.FC<EvaluatorProps> = ({ activeProject }) => {
  // Input fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completedFeatures, setCompletedFeatures] = useState('');
  const [techStack, setTechStack] = useState('');
  const [currentProgress, setCurrentProgress] = useState('65%');
  const [githubUrl, setGithubUrl] = useState('');
  const [documentationStatus, setDocumentationStatus] = useState('README and API specs drafted');
  const [knownProblems, setKnownProblems] = useState('Unit tests pending, edge-case validation needed');

  // Async States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<ProjectEvaluation | null>(null);

  // Pre-fill from active project
  useEffect(() => {
    if (activeProject) {
      setTitle(activeProject.name);
      setDescription(activeProject.description);
      setTechStack(activeProject.technologies.join(', '));
      setCurrentProgress(`${activeProject.progress}%`);
      setGithubUrl(activeProject.githubUrl || '');
      setCompletedFeatures(
        'Core user interface, REST controllers, AI prompt engineering pipeline, and local persistence layer.'
      );
    }
  }, [activeProject]);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please provide project title and description.');
      return;
    }

    setError(null);
    setLoading(true);
    setEvaluation(null);

    const res = await aiService.evaluateProject({
      title: title.trim(),
      description: description.trim(),
      completedFeatures: completedFeatures.trim(),
      techStack: techStack.trim(),
      currentProgress,
      githubUrl: githubUrl.trim(),
      documentationStatus,
      knownProblems,
    });

    setLoading(false);
    if (res.success && res.data) {
      setEvaluation(res.data);
    } else {
      setError(res.error || 'Failed to evaluate project.');
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Strong':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Adequate':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Needs Attention':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Critical Missing':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-purple-400" />
          <span>AI Project Evaluator & Readiness Rubric</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Rigorous academic audit across 9 categories to prepare you for semester viva defense and technical interviews.
        </p>
      </div>

      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

      {/* Input Parameters Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Project Parameters for Academic Evaluation</span>
        </h2>

        <form onSubmit={handleEvaluate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI Medical Symptom Triage Chatbot"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies Used</label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. Python, FastAPI, React, PostgreSQL"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Progress</label>
              <input
                type="text"
                value={currentProgress}
                onChange={(e) => setCurrentProgress(e.target.value)}
                placeholder="e.g. 70%"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Project Description & Architecture <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe core problem, target audience, and architecture layers..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Completed Features
              </label>
              <input
                type="text"
                value={completedFeatures}
                onChange={(e) => setCompletedFeatures(e.target.value)}
                placeholder="e.g. Authentication, chat UI, risk calculation algorithm"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Known Bottlenecks or Missing Items
              </label>
              <input
                type="text"
                value={knownProblems}
                onChange={(e) => setKnownProblems(e.target.value)}
                placeholder="e.g. Unit tests not written, latency under load"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Run Comprehensive 9-Category Evaluation</span>
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <LoadingState
          title="Performing Academic Capstone Audit..."
          message="Evaluating functionality, UI accessibility, testing coverage, AI guardrails, and presentation readiness according to university grading criteria..."
        />
      )}

      {/* Evaluation Results */}
      {evaluation && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Score Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                Overall Academic Assessment
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Status: <span className="text-indigo-400">{evaluation.readinessStatus}</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Calculated across Functionality, Code Quality, AI Rigor, Architecture, Testing, and Viva Presentation readiness.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0">
              <Award className="w-10 h-10 text-amber-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block">Readiness Score</span>
                <span className="text-3xl font-black text-white font-mono">{evaluation.overallScore}/100</span>
              </div>
            </div>
          </div>

          {/* Project Readiness Dashboard */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Project Readiness Dashboard</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block font-semibold">Features Milestone:</span>
                <p className="text-slate-200 mt-0.5">{evaluation.readinessDashboard.featuresCompletedStatus}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block font-semibold">Documentation Status:</span>
                <p className="text-slate-200 mt-0.5">{evaluation.readinessDashboard.documentationStatus}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block font-semibold">Testing Status:</span>
                <p className="text-slate-200 mt-0.5">{evaluation.readinessDashboard.testingStatus}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block font-semibold">Deployment Status:</span>
                <p className="text-slate-200 mt-0.5">{evaluation.readinessDashboard.deploymentStatus}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block font-semibold">AI Implementation:</span>
                <p className="text-slate-200 mt-0.5">{evaluation.readinessDashboard.aiImplementationStatus}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block font-semibold">Critical Next Tasks:</span>
                <p className="text-slate-200 mt-0.5">
                  {evaluation.readinessDashboard.remainingCriticalTasks.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* 9 Category Breakdown Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Detailed Evaluation Across 9 Categories</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {evaluation.categories.map((cat) => (
                <div
                  key={cat.name}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-white">{cat.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(cat.status)}`}>
                        {cat.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Score</span>
                      <span className="font-bold text-white font-mono">{cat.score} / 10</span>
                    </div>

                    <ProgressBar progress={cat.score * 10} size="sm" />

                    {/* Findings */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Findings:</span>
                      <ul className="text-[11px] text-slate-300 space-y-1">
                        {cat.findings.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-1.5">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {cat.suggestions && cat.suggestions.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                        Next Suggestion:
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        {cat.suggestions[0]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Missing Items & Prioritized Action Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Missing Items */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Identified Missing Items</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {evaluation.missingItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prioritized Action Plan */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <ListTodo className="w-4 h-4 text-indigo-400" />
                <span>Recommended Next Actions for Top Viva Grade</span>
              </h4>
              <div className="space-y-2">
                {evaluation.nextRecommendedActions.map((act, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{act.action}</p>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          act.priority === 'High'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {act.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Impact: {act.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluator;
