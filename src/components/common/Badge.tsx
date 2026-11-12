import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'navy' | 'outline' | 'subtle';
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
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-sans leading-none tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
