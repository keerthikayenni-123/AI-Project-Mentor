import React, { useState, useEffect } from 'react';
import {
  Target,
  Sparkles,
  Layers,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Clock,
  AlertCircle,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { Project, SkillGapAnalysis, TechRecommendation } from '../types';
import { aiService } from '../services/aiService';
import { LoadingState } from '../components/LoadingState';
import { ErrorMessage } from '../components/ErrorMessage';

interface SkillsProps {
  activeProject?: Project;
}

const DEFAULT_KNOWN_SKILLS = [
  { name: 'Python Fundamentals', level: 'Intermediate' },
  { name: 'React & Component UI', level: 'Intermediate' },
  { name: 'SQL & Database Basics', level: 'Beginner' },
  { name: 'Git & GitHub', level: 'Intermediate' },
];

export const Skills: React.FC<SkillsProps> = ({ activeProject }) => {
  const [activeTab, setActiveTab] = useState<'gap' | 'tech'>('gap');

  // Skill Gap state
  const [targetProjectText, setTargetProjectText] = useState('');
  const [currentSkillsList, setCurrentSkillsList] = useState(DEFAULT_KNOWN_SKILLS);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Strong'>('Intermediate');

  // Tech recommender state
  const [techProjectDesc, setTechProjectDesc] = useState('');
  const [techDomain, setTechDomain] = useState('Healthcare');

  // Async States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillAnalysis, setSkillAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [techRecommendation, setTechRecommendation] = useState<TechRecommendation | null>(null);

  useEffect(() => {
    if (activeProject) {
      setTargetProjectText(`${activeProject.name}: ${activeProject.description} (Tech: ${activeProject.technologies.join(', ')})`);
      setTechProjectDesc(activeProject.description);
      setTechDomain(activeProject.domain);
    } else {
      setTargetProjectText('AI Medical Symptom Triage Chatbot with FastAPI and React');
      setTechProjectDesc('AI conversational triage agent with automated risk classification and emergency routing.');
    }
  }, [activeProject]);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setCurrentSkillsList([
      ...currentSkillsList,
      { name: newSkillName.trim(), level: newSkillLevel },
    ]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (index: number) => {
    setCurrentSkillsList(currentSkillsList.filter((_, i) => i !== index));
  };

  const handleAnalyzeSkills = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetProjectText.trim()) {
      setError('Please provide target project details.');
      return;
    }

    setError(null);
    setLoading(true);
    setSkillAnalysis(null);

    const res = await aiService.analyzeSkills({
      targetProject: targetProjectText.trim(),
      currentSkills: currentSkillsList,
    });

    setLoading(false);
    if (res.success && res.data) {
      setSkillAnalysis(res.data);
    } else {
      setError(res.error || 'Failed to analyze skill gap.');
    }
  };

  const handleRecommendTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techProjectDesc.trim()) {
      setError('Please provide project description.');
      return;
    }

    setError(null);
    setLoading(true);
    setTechRecommendation(null);

    const res = await aiService.recommendTechnologies({
      projectDescription: techProjectDesc.trim(),
      domain: techDomain,
    });

    setLoading(false);
    if (res.success && res.data) {
      setTechRecommendation(res.data);
    } else {
      setError(res.error || 'Failed to recommend technology stack.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
          <Target className="w-6 h-6 text-indigo-400" />
          <span>Skill Gap Analyzer & Tech Recommender</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Bridge what you already know with what your capstone requires. Recommends modern open-source stacks with 100% free student tiers.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => {
            setActiveTab('gap');
            setError(null);
          }}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'gap'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Skill Gap Analyzer</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('tech');
            setError(null);
          }}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'tech'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Free Tech Stack Recommender</span>
        </button>
      </div>

      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

      {/* ======================================================== */}
      {/* TAB 1: SKILL GAP ANALYZER */}
      {/* ======================================================== */}
      {activeTab === 'gap' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Skill Comparison Inputs</span>
            </h2>

            <form onSubmit={handleAnalyzeSkills} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Project & Objectives
                </label>
                <textarea
                  rows={2}
                  value={targetProjectText}
                  onChange={(e) => setTargetProjectText(e.target.value)}
                  placeholder="Describe the project and expected technical stack..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {/* Your Known Skills List */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Your Current Self-Reported Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentSkillsList.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] font-semibold text-indigo-400">({skill.level})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="text-slate-500 hover:text-rose-400 cursor-pointer ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Add skill (e.g. Docker, TypeScript)..."
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Strong">Strong</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Target className="w-4 h-4" />
                  <span>Analyze Missing Skills & Learning Order</span>
                </button>
              </div>
            </form>
          </div>

          {loading && (
            <LoadingState
              title="Analyzing Skill Gap & Sequencing..."
              message="Evaluating prerequisite technologies, estimating study hours, and mapping out practical mini-tasks..."
            />
          )}

          {skillAnalysis && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 animate-in fade-in duration-200">
              {/* Summary Advice */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs">
                <span className="font-bold text-indigo-300 block mb-1">
                  Mentor Learning Roadmap Summary:
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {skillAnalysis.learningRoadmapSummary}
                </p>
              </div>

              {/* Skills to Learn (Prioritized) */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Skills to Master (Ranked by Importance)
                </h3>

                <div className="space-y-3">
                  {skillAnalysis.skillsToLearn.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-[10px]">
                            {s.learningOrder}
                          </span>
                          <span className="font-bold text-white text-sm">{s.name}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              s.importance === 'Must-have'
                                ? 'bg-rose-500/20 text-rose-300'
                                : s.importance === 'Important'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {s.importance}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{s.reason}</p>

                        {/* Suggested practice tasks */}
                        <div className="pt-2">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">
                            Suggested Practice Tasks:
                          </span>
                          <ul className="space-y-0.5 text-[11px] text-slate-400">
                            {s.suggestedPracticeTasks.map((t, ti) => (
                              <li key={ti} className="flex items-start gap-1.5">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="shrink-0 sm:text-right">
                        <span className="text-[11px] text-slate-400 flex items-center sm:justify-end gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Est: {s.estimatedHours}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: FREE TECH RECOMMENDER */}
      {/* ======================================================== */}
      {activeTab === 'tech' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Project Blueprint for Open-Source Architecture</span>
            </h2>

            <form onSubmit={handleRecommendTech} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Description
                </label>
                <textarea
                  rows={2}
                  value={techProjectDesc}
                  onChange={(e) => setTechProjectDesc(e.target.value)}
                  placeholder="Explain what your system needs to do..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Domain</label>
                <input
                  type="text"
                  value={techDomain}
                  onChange={(e) => setTechDomain(e.target.value)}
                  placeholder="e.g. Healthcare, FinTech, CyberSecurity"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Recommend Free / Open-Source Stack</span>
                </button>
              </div>
            </form>
          </div>

          {loading && (
            <LoadingState
              title="Formulating Free & Open-Source Stack..."
              message="Evaluating student-friendly cloud tiers, open-source libraries, and zero-cost hosting options..."
            />
          )}

          {techRecommendation && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recommended Stack (Zero-Cost for Students)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Frontend */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-400">Frontend:</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {techRecommendation.frontend.freeTierNotes}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm">{techRecommendation.frontend.tech}</p>
                  <p className="text-[11px] text-slate-300">{techRecommendation.frontend.reason}</p>
                </div>

                {/* Backend */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-400">Backend:</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {techRecommendation.backend.freeTierNotes}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm">{techRecommendation.backend.tech}</p>
                  <p className="text-[11px] text-slate-300">{techRecommendation.backend.reason}</p>
                </div>

                {/* Database */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-400">Database:</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {techRecommendation.database.freeTierNotes}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm">{techRecommendation.database.tech}</p>
                  <p className="text-[11px] text-slate-300">{techRecommendation.database.reason}</p>
                </div>

                {/* AI / ML Framework */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-400">AI / ML Framework:</span>
                    <span className="text-[10px] text-indigo-400 font-mono">
                      {techRecommendation.aiMlFramework.freeTierNotes}
                    </span>
                  </div>
                  <p className="font-bold text-indigo-300 text-sm">{techRecommendation.aiMlFramework.tech}</p>
                  <p className="text-[11px] text-slate-300">{techRecommendation.aiMlFramework.reason}</p>
                </div>

                {/* Deployment */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-400">Deployment & CI/CD:</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {techRecommendation.deployment.freeTierNotes}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm">{techRecommendation.deployment.option}</p>
                  <p className="text-[11px] text-slate-300">{techRecommendation.deployment.reason}</p>
                </div>

                {/* Testing Tools */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="font-semibold text-slate-400 block">Testing Tools:</span>
                  <div className="space-y-1">
                    {techRecommendation.testingTools.map((t, idx) => (
                      <div key={idx} className="text-[11px]">
                        <strong className="text-white">{t.tool}</strong>: {t.reason}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Skills;
