import React from 'react';
import {
  Info,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Code2,
  Milestone,
  ExternalLink,
  Github,
  Award,
} from 'lucide-react';
import { NavPage } from '../components/Sidebar';

interface AboutProps {
  onNavigate: (page: NavPage) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const vivaTips = [
    {
      title: '1. Know Your Architecture by Heart',
      desc: 'Be able to draw the presentation layer, REST API controller layer, AI inference logic, and database schemas on a whiteboard in under 2 minutes.',
    },
    {
      title: '2. Explain the "Why", Not Just the "What"',
      desc: 'Examiners rarely ask "what does this line do?". They ask "why did you pick PostgreSQL instead of MongoDB?" or "why did you use Gemini 3.8 Flash instead of training an RNN?".',
    },
    {
      title: '3. Demonstrate Offline Resilience',
      desc: 'Always have realistic fallback data ready so your live demo never crashes due to wifi drops or external API rate limits during examination.',
    },
    {
      title: '4. Highlight Boundary Testing & Benchmarks',
      desc: 'Show at least 3 unit tests verifying unexpected inputs, edge cases, and latency comparisons against a naive baseline.',
    },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 text-indigo-400" />
          <span>Engineering Project & Viva Defense Guide (All Departments)</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Everything you need to successfully execute, present, and defend your engineering project across CSE, ECE, EEE, Mechanical, Civil, AI/DS, and all disciplines.
        </p>
      </div>

      {/* Overview Card */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>About AI Project Mentor</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>AI Project Mentor</strong> is an intelligent technical companion built specifically for
          undergraduate and graduate engineering students. It removes the guesswork from semester capstones by
          integrating five core engines: <strong>Idea Generation & Analysis</strong>, an{' '}
          <strong>8-Phase Milestone Roadmap</strong>, a <strong>Pedagogical Code Mentor</strong>,{' '}
          <strong>Instant Documentation & README Generator</strong>, and a{' '}
          <strong>9-Category Academic Evaluator</strong>.
        </p>
      </div>

      {/* 4 Viva Defense Pillars */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Top Viva Defense Strategies</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vivaTips.map((tip, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h4 className="text-xs font-bold text-indigo-300">{tip.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Architecture Blueprint */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Application Architectural Flow</span>
        </h3>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
          <div className="text-indigo-400 font-bold">Presentation Layer (Client SPA):</div>
          <div className="pl-4 text-slate-400">
            React 19 + TypeScript + TailwindCSS + Lucide Icons
          </div>

          <div className="text-cyan-400 font-bold mt-2">API Controller & Validation Layer:</div>
          <div className="pl-4 text-slate-400">
            Express.js + Vite Middleware (Dev) / Production Static Serving
          </div>

          <div className="text-emerald-400 font-bold mt-2">AI Inference & Guardrails Service:</div>
          <div className="pl-4 text-slate-400">
            Google Gemini 3.8 Flash SDK (@google/genai) with Structured JSON Schema & Graceful Fallbacks
          </div>

          <div className="text-amber-400 font-bold mt-2">Persistence Layer:</div>
          <div className="pl-4 text-slate-400">
            Browser Storage (Local & Session) with Seed Data & Reset Capabilities
          </div>
        </div>
      </div>

      {/* Vercel & GitHub Deployment Checklist */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Github className="w-4 h-4 text-slate-300" />
          <span>GitHub & Vercel Deployment Checklist</span>
        </h3>

        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Zero Hardcoded Secrets:</strong> Never commit your real API key to GitHub. Use{' '}
              <code>.env.example</code> for documentation.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Production Build Verification:</strong> Test <code>npm run build</code> locally to
              guarantee TypeScript type safety and bundling without warnings.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>One-Click Vercel Deploy:</strong> Import the repository directly in Vercel with default
              Vite presets or run the full-stack server.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
