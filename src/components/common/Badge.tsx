import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'navy' | 'outline' | 'subtle' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  const variantStyles = {
    cyan: 'bg-cyan text-navy border border-cyan-400/40',
    navy: 'bg-navy text-white border border-navy-800',
    outline: 'bg-transparent text-navy border border-navy/20',
    subtle: 'bg-navy/5 text-navy-700 border border-navy/10',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-sans leading-none tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
