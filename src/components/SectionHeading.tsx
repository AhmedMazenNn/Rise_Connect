import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  id
}: SectionHeadingProps) {
  const isDark = tone === 'dark';
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignment}`}>
      <span
        className={`mb-4 inline-flex items-center gap-2 text-sm font-semibold ${
        isDark ? 'text-brand-lavender' : 'text-brand'}`
        }>
        
        <span className="h-1.5 w-1.5 rounded-full bg-brand-lavender" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        id={id}
        className={`text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px] ${
        isDark ? 'text-white' : 'text-brand-plum'}`
        }>
        
        {title}
      </h2>
      {description &&
      <p
        className={`text-pretty mt-5 text-base leading-relaxed sm:text-lg ${
        isDark ? 'text-white/70' : 'text-brand-muted'}`
        }>
        
          {description}
        </p>
      }
    </Reveal>);

}