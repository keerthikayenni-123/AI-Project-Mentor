import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FolderPlus,
  Cpu,
  Clock,
  Layers,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ProjectIdea, ProjectAnalysis, ProjectDifficulty } from '../types';
import { aiService } from '../services/aiService';
import { LoadingState } from '../components/LoadingState';
import { ErrorMessage } from '../components/ErrorMessage';
import { NavPage } from '../components/Sidebar';

interface IdeaGeneratorProps {
  onAdoptIdea: (idea: ProjectIdea) => void;
  onAdoptAnalyzedProject: (data: { title: string; description: string; domain: string; tech: string[] }) => void;
  onNavigate: (page: NavPage) => void;
}

const DEPARTMENTS = [
  'All Departments / Multi-Disciplinary',
  'Computer Science & Engineering (CSE)',
  'Electronics & Communication Engineering (ECE / IoT)',
  'Electrical & Electronics Engineering (EEE / Power & EV)',
  'Mechanical Engineering (MECH / Robotics)',
  'Civil & Environmental Engineering (CIVIL / Smart Infra)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Biomedical & Healthcare Engineering (BME)',
  'Robotics & Automation / Mechatronics',
  'Aerospace & Aeronautical Engineering',
  'Chemical & Materials Engineering',
];

const DOMAINS = [
  'Healthcare & Biomedical',
  'IoT, Embedded Systems & Sensors',
  'Robotics & Autonomous Systems',
  'Electric Vehicles & Renewable Energy',
  'Smart City & Civil Infrastructure',
  'Mechanical Automation & CAD/CAM',
  'AI, Machine Learning & NLP',
  'Cybersecurity & Network Systems',
  'FinTech & Digital Economy',
  'Precision Agriculture & Environmental Tech',
  'Education & Assistive Technology',
  'Industrial Automation & Industry 4.0',
];

export const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({
  onAdoptIdea,
  onAdoptAnalyzedProject,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'analyze'>('generate');

  // Generator form state
  const [department, setDepartment] = useState('All Departments / Multi-Disciplinary');
  const [domain, setDomain] = useState('Healthcare & Biomedical');
  const [areaOfInterest, setAreaOfInterest] = useState('Intelligent triage and automated diagnostic risk scoring');
  const [skills, setSkills] = useState('Python, C++, Embedded IoT, React, Machine Learning');
  const [aiInterests, setAiInterests] = useState('Gemini API, Edge AI, Predictive Analytics');
  const [difficulty, setDifficulty] = useState<ProjectDifficulty>('Intermediate');
  const [techPreference, setTechPreference] = useState('Microcontroller/FastAPI + React + Database');
  const [duration, setDuration] = useState('6 weeks');
  const [teamType, setTeamType] = useState('Small Team (2-3)');

  // Analyzer form state
  const [analyzeTitle, setAnalyzeTitle] = useState('');
  const [analyzeDescription, setAnalyzeDescription] = useState('');
  const [analyzeDomain, setAnalyzeDomain] = useState('AI / Machine Learning');
  const [analyzeTech, setAnalyzeTech] = useState('React, Python, Gemini API');

  // Async States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedIdeas, setGeneratedIdeas] = useState<ProjectIdea[] | null>(null);
  const [projectAnalysis, setProjectAnalysis] = useState<ProjectAnalysis | null>(null);
  const [adoptedIndex, setAdoptedIndex] = useState<number | null>(null);

  // Form Validation
  const [genErrors, setGenErrors] = useState<{ [key: string]: string }>({});
  const [analyzeErrors, setAnalyzeErrors] = useState<{ [key: string]: string }>({});

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      setGenErrors({ domain: 'Please select a domain.' });
      return;
    }
    setGenErrors({});
    setError(null);
    setLoading(true);
    setGeneratedIdeas(null);
    setAdoptedIndex(null);

    const targetDomain =
      department !== 'All Departments / Multi-Disciplinary'
        ? `${department} — ${domain}`
        : domain;

    const response = await aiService.generateProjectIdeas({
      domain: targetDomain,
      areaOfInterest,
      skills,
      aiInterests,
      difficulty,
      techPreference,
      duration,
      teamType,
    });

    setLoading(false);
    if (response.success && response.data) {
      setGeneratedIdeas(response.data);
    } else {
      setError(response.error || 'Failed to generate ideas.');
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};
    if (!analyzeTitle.trim()) errs.title = 'Please enter your project title.';
    if (!analyzeDescription.trim()) errs.description = 'Please explain your project description.';
    else if (analyzeDescription.trim().length < 15) {
      errs.description = 'Description should be at least 15 characters.';
    }

    if (Object.keys(errs).length > 0) {
      setAnalyzeErrors(errs);
      return;
    }

    setAnalyzeErrors({});
    setError(null);
    setLoading(true);
    setProjectAnalysis(null);

    const response = await aiService.analyzeProject({
      title: analyzeTitle.trim(),
      description: analyzeDescription.trim(),
      domain: analyzeDomain,
      techStack: analyzeTech,
    });

    setLoading(false);
    if (response.success && response.data) {
      setProjectAnalysis(response.data);
    } else {
      setError(response.error || 'Failed to analyze project idea.');
    }
  };

  const handleAdopt = (idea: ProjectIdea, index: number) => {
    onAdoptIdea(idea);
    setAdoptedIndex(index);
    setTimeout(() => {
      onNavigate('roadmap');
    }, 800);
  };

  const handleAdoptAnalysis = () => {
    if (!analyzeTitle || !analyzeDescription) return;
    const techArray = analyzeTech.split(',').map((t) => t.trim()).filter(Boolean);
    onAdoptAnalyzedProject({
      title: analyzeTitle,
      description: analyzeDescription,
      domain: analyzeDomain,
      tech: techArray.length > 0 ? techArray : ['React', 'Python', 'FastAPI'],
    });
    onNavigate('roadmap');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          <span>AI Project Idea Generator & Analyzer</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Synthesize academically sound engineering capstone projects or critique your existing project idea with Gemini AI.
        </p>
      </div>

      {/* Mode Switch Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => {
            setActiveTab('generate');
            setError(null);
          }}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'generate'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Project Ideas</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('analyze');
            setError(null);
          }}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'analyze'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Analyze My Existing Project</span>
        </button>
      </div>

      {/* Error Banner */}
      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

      {/* ======================================================== */}
      {/* TAB 1: GENERATE PROJECT IDEAS */}
      {/* ======================================================== */}
      {activeTab === 'generate' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Project Parameters</span>
            </h2>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Engineering Department */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Department / Branch <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Domain */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Domain <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as ProjectDifficulty)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Beginner">Beginner (1st/2nd Year)</option>
                    <option value="Intermediate">Intermediate (3rd/4th Year)</option>
                    <option value="Advanced">Advanced (Capstone/Master's)</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="2-3 weeks">2-3 weeks (Mini Project)</option>
                    <option value="4-6 weeks">4-6 weeks (Sprint Project)</option>
                    <option value="8-12 weeks">8-12 weeks (Semester Capstone)</option>
                    <option value="Semester Thesis">Full Academic Year</option>
                  </select>
                </div>

                {/* Team Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Team Format</label>
                  <select
                    value={teamType}
                    onChange={(e) => setTeamType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Individual">Individual (Solo)</option>
                    <option value="Small Team (2-3)">Small Team (2-3)</option>
                    <option value="Team (4 Members)">Cap-stone Group (4)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Area of Interest</label>
                  <input
                    type="text"
                    value={areaOfInterest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                    placeholder="e.g. Diagnostic triage, algorithmic trading, fraud detection"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Known Skills</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. Python, React, SQL, Scikit-Learn"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">AI / ML Focus</label>
                  <input
                    type="text"
                    value={aiInterests}
                    onChange={(e) => setAiInterests(e.target.value)}
                    placeholder="e.g. Gemini LLM, Computer Vision, Random Forest"
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
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Project Blueprints</span>
                </button>
              </div>
            </form>
          </div>

          {/* Loading State */}
          {loading && (
            <LoadingState
              title="Generating Academic Capstone Blueprints..."
              message="Synthesizing real-world problem statements, evaluating difficulty thresholds, and structuring tech stack architectures..."
            />
          )}

          {/* Generated Ideas Cards */}
          {generatedIdeas && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Generated Project Proposals ({generatedIdeas.length})</span>
                </h2>
                <span className="text-xs text-slate-400">Click "Adopt as Workspace Project" to start</span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {generatedIdeas.map((idea, index) => {
                  const isAdopted = adoptedIndex === index;

                  return (
                    <div
                      key={idea.title}
                      className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {idea.expectedDifficulty}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              Est: {idea.estimatedDevelopmentTime}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              Users: {idea.targetUsers}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white leading-tight">{idea.title}</h3>
                        </div>

                        <button
                          onClick={() => handleAdopt(idea, index)}
                          disabled={isAdopted}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-md ${
                            isAdopted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:scale-95'
                          }`}
                        >
                          <FolderPlus className="w-4 h-4" />
                          <span>{isAdopted ? 'Project Adopted!' : 'Adopt as Project'}</span>
                        </button>
                      </div>

                      {/* Problem & Solution */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                          <span className="font-semibold text-rose-300 flex items-center gap-1 mb-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Problem Statement
                          </span>
                          <p className="text-slate-300 leading-relaxed">{idea.problemStatement}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                          <span className="font-semibold text-emerald-300 flex items-center gap-1 mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Proposed Solution Architecture
                          </span>
                          <p className="text-slate-300 leading-relaxed">{idea.proposedSolution}</p>
                        </div>
                      </div>

                      {/* Key Features & AI Components */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="font-semibold text-slate-300 block mb-1.5">Key Features:</span>
                          <ul className="space-y-1 text-slate-300">
                            {idea.keyFeatures.map((f, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-semibold text-slate-300 block mb-1.5">AI / ML Components:</span>
                          <ul className="space-y-1 text-slate-300">
                            {idea.aiComponents.map((c, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Recommended Tech Stack */}
                      <div className="pt-3 border-t border-slate-800/80">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                          Recommended Open-Source Tech Stack:
                        </span>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                            Frontend: <strong className="text-white">{idea.recommendedTechStack.frontend}</strong>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                            Backend: <strong className="text-white">{idea.recommendedTechStack.backend}</strong>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                            Database: <strong className="text-white">{idea.recommendedTechStack.database}</strong>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                            AI/ML: <strong className="text-indigo-300">{idea.recommendedTechStack.aiMl}</strong>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                            Deploy: <strong className="text-white">{idea.recommendedTechStack.deployment}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: ANALYZE EXISTING PROJECT IDEA */}
      {/* ======================================================== */}
      {activeTab === 'analyze' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Enter Your Project Details for AI Evaluation</span>
            </h2>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={analyzeTitle}
                  onChange={(e) => setAnalyzeTitle(e.target.value)}
                  placeholder="e.g. Decentralized Voting Verification System using Zero Knowledge Proofs"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                {analyzeErrors.title && <p className="text-xs text-rose-400 mt-1">{analyzeErrors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Problem Description & Intended Approach <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={analyzeDescription}
                  onChange={(e) => setAnalyzeDescription(e.target.value)}
                  placeholder="Describe the target users, core problem, proposed system flow, and technologies you are thinking of using..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
                {analyzeErrors.description && (
                  <p className="text-xs text-rose-400 mt-1">{analyzeErrors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Domain</label>
                  <select
                    value={analyzeDomain}
                    onChange={(e) => setAnalyzeDomain(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Proposed Tech Stack</label>
                  <input
                    type="text"
                    value={analyzeTech}
                    onChange={(e) => setAnalyzeTech(e.target.value)}
                    placeholder="e.g. Next.js, Python FastAPI, PostgreSQL, Gemini API"
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
                  <Cpu className="w-4 h-4" />
                  <span>Analyze Feasibility & Improvements</span>
                </button>
              </div>
            </form>
          </div>

          {/* Loading State */}
          {loading && (
            <LoadingState
              title="Analyzing Project Feasibility & Modules..."
              message="Auditing problem statement clarity, identifying missing architectural components, and extracting AI integration opportunities..."
            />
          )}

          {/* Analysis Results Display */}
          {projectAnalysis && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Analysis Completed
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{analyzeTitle}</h3>
                </div>

                <button
                  onClick={handleAdoptAnalysis}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 active:scale-95 cursor-pointer shrink-0"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Add to Workspace</span>
                </button>
              </div>

              {/* Scores: Clarity & Feasibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-slate-300">Problem Clarity</span>
                    <span className="text-xs font-bold text-indigo-400">
                      {projectAnalysis.problemClarity.score} / 10
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {projectAnalysis.problemClarity.feedback}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-slate-300">Technical Feasibility</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {projectAnalysis.technicalFeasibility.score} / 10
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {projectAnalysis.technicalFeasibility.assessment}
                  </p>
                </div>
              </div>

              {/* Required Modules & Suggested Tech */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-200 block">Required System Modules:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {projectAnalysis.requiredModules.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-200 block">AI Integration Opportunities:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {projectAnalysis.aiOpportunities.map((opp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing Components & Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Missing / Overlooked Components:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {projectAnalysis.missingComponents.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    Possible Challenges & Mitigations:
                  </span>
                  <div className="space-y-2 text-xs">
                    {projectAnalysis.possibleChallenges.map((c, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <p className="font-semibold text-rose-300">Risk: {c.challenge}</p>
                        <p className="text-slate-400 mt-0.5">Fix: {c.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
                <span className="text-xs font-bold text-indigo-300">
                  Recommended Academic Improvements for Top Viva Score:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {projectAnalysis.suggestedImprovements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
