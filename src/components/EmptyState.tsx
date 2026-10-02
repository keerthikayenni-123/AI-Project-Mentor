import React from 'react';
import { LucideIcon, FolderPlus, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderPlus,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-200">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mt-1 leading-relaxed">{description}</p>
      
      <div className="flex items-center gap-3 mt-6">
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {secondaryActionText && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};
