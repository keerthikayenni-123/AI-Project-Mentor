import React from 'react';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Milestone,
  Code2,
  FileText,
  ShieldCheck,
  Target,
  CheckCircle2,
  FolderGit2,
  Terminal,
  Zap,
} from 'lucide-react';
import { NavPage } from '../components/Sidebar';

interface LandingProps {
  onNavigate: (page: NavPage) => void;
  onOpenNewProject: () => void;
  projectCount: number;
}

export const Landing: React.FC<LandingProps> = ({
  onNavigate,
  onOpenNewProject,
  projectCount,
}) => {
  const workflowSteps = [
    { num: '01', title: 'Ideate & Analyze', desc: 'Brainstorm academic problem statements with feasibility scores & AI tech stacks.' },
    { num: '02', title: '8-Phase Roadmap', desc: 'Break semester goals into 8 structured milestones with priority tasks.' },
    { num: '03', title: 'Code & Debug', desc: 'Split-screen engineering mentor explaining underlying error reasons and bug fixes.' },
    { num: '04', title: 'Auto-Generate Docs', desc: 'Produce comprehensive SRS, system architecture diagrams, and full README.md.' },
    { num: '05', title: 'Evaluate Readiness', desc: 'Audit against 9 viva rubrics and get concrete improvement suggestions.' },
  ];

  const features = [
    {
      icon: Lightbulb,
      title: 'AI Idea Generator & Analyzer',
      description:
        'Input your domain, skill level, and timeframe. Get novel problem statements, architecture blueprints, and feasibility analysis.',
      badge: 'Feature 1',
      page: 'idea-generator' as NavPage,
    },
    {
      icon: Milestone,
      title: '8-Phase Roadmap & Tasks',
      description:
        'Structured roadmap from Requirement Analysis to Deployment & Viva. Live progress tracking automatically synchronizes across workspace.',
      badge: 'Feature 2',
      page: 'roadmap' as NavPage,
    },
    {
      icon: Code2,
      title: 'AI Code Mentor & Debugger',
      description:
        'Supports Python, Java, JS/TS, C++, SQL. Explains why bugs occur, provides line diffs, expected outputs, and exam-ready learning tips.',
      badge: 'Feature 3',
      page: 'code-mentor' as NavPage,
    },
    {
      icon: FileText,
      title: 'Documentation & README Generator',
      description:
        'Generates complete technical documentation, architecture explanations, database schemas, and one-click downloadable README.md.',
      badge: 'Feature 4',
      page: 'documentation' as NavPage,
    },
    {
      icon: ShieldCheck,
      title: 'Project Evaluator & Readiness Rubric',
      description:
        'Scores project health across 9 academic categories including Functionality, UI/UX, AI Rigor, Testing, and Presentation Readiness.',
      badge: 'Feature 5',
      page: 'evaluator' as NavPage,
    },
    {
      icon: Target,
      title: 'Skill Gap & Tech Recommender',
      description:
        'Identifies what you know vs what you need to learn. Recommends modern open-source stacks with 100% free student tiers.',
      badge: 'Skill Tool',
      page: 'skills' as NavPage,
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10 pb-8 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Tailored for Computer Science Engineering Students</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight">
          Plan, Build & Defend Your{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Capstone Project
          </span>{' '}
          with AI
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From problem statement generation and 8-phase roadmap planning, to interactive code debugging,
          instant documentation, and viva evaluation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95 cursor-pointer"
          >
            <span>Launch Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('idea-generator')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Generate Project Ideas</span>
          </button>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 pt-8 border-t border-slate-800/80 text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-xs text-slate-400">Sample Projects</p>
            <p className="text-xl font-bold text-white mt-0.5">{projectCount} Pre-loaded</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-xs text-slate-400">Roadmap Depth</p>
            <p className="text-xl font-bold text-indigo-400 mt-0.5">8 Full Phases</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-xs text-slate-400">Code Mentor Actions</p>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">8 Diagnostics</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-xs text-slate-400">Evaluation Rubrics</p>
            <p className="text-xl font-bold text-cyan-400 mt-0.5">9 Categories</p>
          </div>
        </div>
      </section>

      {/* Structured 5-Step Workflow Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">The Academic Workflow</h2>
          <p className="text-2xl font-bold text-white mt-1">From Blank Terminal to Final Viva Defense</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {workflowSteps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black text-indigo-500/40 font-mono">{step.num}</span>
                <h3 className="text-sm font-bold text-white mt-2">{step.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Step {idx + 1} of 5</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Modular AI Suite</h2>
            <p className="text-2xl font-bold text-white mt-1">Five Core Engineering Engines</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore all modules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => onNavigate(feat.page)}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{feat.description}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-indigo-400">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Free & Open Source Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              100% Free & Student-Friendly
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Zero Paid Dependencies or Mandatory Subscriptions
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Engineered with browser local storage persistence, responsive client components, and graceful
              fallback execution if API keys are missing. Works offline or with Google AI Studio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenNewProject}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Create New Project
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              Browse 4 Sample Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
