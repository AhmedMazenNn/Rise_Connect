import React from 'react';

export function PlaceholderBadge({ label = 'Placeholder', tone = 'light' }: {label?: string;tone?: 'light' | 'dark';}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
      tone === 'dark' ? 'bg-white/15 text-white' : 'bg-brand-plum/80 text-white'}`
      }>
      
      {label}
    </span>);

}