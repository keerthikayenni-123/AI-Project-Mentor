import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    type?: 'positive' | 'neutral' | 'accent' | 'warning';
  };
  onClick?: () => void;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  onClick,
  className = '',
}) => {
  const badgeClasses = {
    positive: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    neutral: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
    accent: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  }[badge?.type || 'accent'];

  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 group ${
        onClick ? 'cursor-pointer hover:bg-slate-900/90 hover:scale-[1.01]' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{value}</span>
        {badge && (
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${badgeClasses}`}>
            {badge.text}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
};
