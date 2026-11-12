import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'cyan' | 'navy';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-navy/10 text-navy',
    cyan: 'bg-cyan-50 border border-cyan/40 text-navy',
    navy: 'bg-navy text-white border border-navy',
  };

  return (
    <div
      className={`rounded-xl p-5 transition-all duration-150 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
