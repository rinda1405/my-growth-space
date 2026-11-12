import React from 'react';

interface StatBoxProps {
  label: string;
  value: string | number;
  subtext?: string;
  badge?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'cyan';
}

export const StatBox: React.FC<StatBoxProps> = ({
  label,
  value,
  subtext,
  badge,
  icon,
  variant = 'default',
}) => {
  const isCyan = variant === 'cyan';
  return (
    <div
      className={`rounded-xl p-4 border transition-all ${
        isCyan
          ? 'bg-cyan-50 border-cyan/40 text-navy'
          : 'bg-white border-navy/10 text-navy'
      }`}
    >
      <div className="flex items-center justify-between text-navy-500 mb-1">
        <span className="text-xs font-medium uppercase tracking-wider text-navy-500">
          {label}
        </span>
        {icon && <div className="p-1 rounded bg-navy/5 text-navy">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-2xl font-bold tracking-tight text-navy">{value}</span>
        {badge && (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-cyan text-navy">
            {badge}
          </span>
        )}
      </div>
      {subtext && <p className="text-xs text-navy-500 mt-1">{subtext}</p>}
    </div>
  );
};
