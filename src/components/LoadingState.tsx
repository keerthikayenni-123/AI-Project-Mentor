import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  title?: string;
  message?: string;
  variant?: 'skeleton' | 'ai-spinner' | 'card';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'AI Mentor is Analyzing...',
  message = 'Consulting Computer Science knowledge base and generating structured results...',
  variant = 'ai-spinner',
}) => {
  if (variant === 'skeleton') {
    return (
      <div className="w-full space-y-4 animate-pulse p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <div className="h-6 bg-slate-800 rounded-md w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-800/60 rounded w-full"></div>
          <div className="h-4 bg-slate-800/60 rounded w-5/6"></div>
          <div className="h-4 bg-slate-800/60 rounded w-4/6"></div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="h-20 bg-slate-800/40 rounded-xl"></div>
          <div className="h-20 bg-slate-800/40 rounded-xl"></div>
          <div className="h-20 bg-slate-800/40 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-900/40 border border-indigo-500/20 rounded-2xl backdrop-blur-sm">
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse shadow-lg shadow-indigo-500/10">
          <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1 text-white shadow-md">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mt-1.5 leading-relaxed">{message}</p>
      <div className="flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/60 text-xs text-indigo-300">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
        <span>Gemini 3.8 Flash • Real-time synthesis</span>
      </div>
    </div>
  );
};
