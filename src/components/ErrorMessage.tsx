import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start justify-between gap-3 text-rose-300 text-sm ${className}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-rose-200">Attention</p>
          <p className="text-xs text-rose-300/90 mt-0.5">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 rounded-lg transition-colors shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
