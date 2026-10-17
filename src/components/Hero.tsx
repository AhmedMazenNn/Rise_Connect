import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, Building2Icon, StoreIcon } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { scrollToSection } from '../utils/scroll';
import type { HomepageContent } from '../types/content';

interface HeroProps {
  home: HomepageContent;
}

const ease = [0.23, 1, 0.32, 1] as const;
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } }
};

export function Hero({ home }: HeroProps) {
  const reduce = useReducedMotion();
  const parts = home.heroHeading.split(/(?<=\.)\s+/);
  const lead = parts.slice(0, -1);
  const last = parts[parts.length - 1];

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden bg-brand-plum pb-20 pt-32 text-white sm:pt-36 lg:pb-28 lg:pt-44">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
          'radial-gradient(60% 50% at 78% 30%, rgba(164,138,200,0.28) 0%, rgba(66,48,96,0.25) 40%, rgba(33,24,47,0) 75%), radial-gradient(40% 40% at 10% 90%, rgba(66,48,96,0.6) 0%, rgba(33,24,47,0) 70%)'
        }} />
      
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full border border-white/[0.06]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}>
        
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-lavender/70" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-10 h-[420px] w-[420px] rounded-full border border-white/[0.05]"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}>
        
        <span className="absolute bottom-6 left-10 h-1.5 w-1.5 rounded-full bg-white/50" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
          <motion.p variants={item} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand-lavender">
            <span className="h-px w-8 bg-brand-lavender" aria-hidden="true" />
            Virtual assistance & lead generation
          </motion.p>
          <motion.h1
            id="hero-heading"
            variants={item}
            className="text-balance font-display text-[40px] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[68px]">
            
            {lead.join(' ')} <span className="text-brand-lavender">{last}</span>
          </motion.h1>
          <motion.p variants={item} className="text-pretty mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {home.heroDescription}
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-lavender px-7 py-4 text-sm font-semibold text-brand-plum transition-colors duration-150 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-plum">
              
              {home.heroPrimaryCta}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/40 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              
              {home.heroSecondaryCta}
            </a>
          </motion.div>
          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/60">
            <span>Built for</span>
            <span className="inline-flex items-center gap-2 text-white/85">
              <Building2Icon className="h-4 w-4 text-brand-lavender" />
              Real estate investors
            </span>
            <span className="inline-flex items-center gap-2 text-white/85">
              <StoreIcon className="h-4 w-4 text-brand-lavender" />
              Small businesses
            </span>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>);

}