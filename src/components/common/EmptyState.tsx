import React from 'react';
import { HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-navy/15 bg-white">
      <div className="p-3 rounded-full bg-cyan-50 border border-cyan/40 text-navy mb-3">
        {icon || <HelpCircle className="h-6 w-6 text-navy" />}
      </div>
      <h4 className="text-sm font-semibold text-navy mb-1">{title}</h4>
      <p className="text-xs text-navy-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-medium rounded-lg bg-cyan text-navy border border-cyan hover:bg-cyan-400 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
