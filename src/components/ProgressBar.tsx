import React from 'react';

interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  // Dynamic gradient based on completion
  const colorClass =
    clamped >= 100
      ? 'from-emerald-500 to-teal-400'
      : clamped >= 70
      ? 'from-indigo-500 to-emerald-400'
      : clamped >= 30
      ? 'from-indigo-600 to-blue-400'
      : 'from-amber-500 to-indigo-500';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-slate-400">
          <span>Completion</span>
          <span className="text-slate-200 font-semibold">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden ${heightClass} p-0.5 border border-slate-700/50`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
