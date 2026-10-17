import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarCheckIcon, CheckIcon, PhoneOutgoingIcon } from 'lucide-react';

const columns = [
{
  id: 'new',
  label: 'New leads',
  dot: 'bg-brand-lavender',
  leads: [
  { initials: 'MR', name: 'M. Rivera', tag: 'Skip traced' },
  { initials: 'DK', name: 'D. Kim', tag: 'Researched' }]

},
{
  id: 'follow',
  label: 'Follow-up',
  dot: 'bg-amber-400',
  leads: [
  { initials: 'JT', name: 'J. Thompson', tag: 'Call back' },
  { initials: 'AS', name: 'A. Shah', tag: 'Texted' }]

},
{
  id: 'qualified',
  label: 'Qualified',
  dot: 'bg-emerald-500',
  leads: [{ initials: 'LB', name: 'L. Brooks', tag: 'Motivated' }]
}];


export function HeroVisual() {
  const reduce = useReducedMotion();
  const float = (distance: number, duration: number) =>
  reduce ?
  {} :
  {
    animate: { y: [0, -distance, 0] },
    transition: { duration, repeat: Infinity, ease: 'easeInOut' as const }
  };

  return (
    <div className="relative mx-auto w-full max-w-[540px] px-2 py-10 sm:px-6" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
        
        <div className="flex items-center justify-between border-b border-brand-mist px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-lilac" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-lilac" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-lilac" />
            </div>
            <span className="font-display text-sm font-bold text-brand-plum">Lead pipeline</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Synced
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5 bg-brand-mist/60 p-3 sm:gap-3 sm:p-4">
          {columns.map((col) =>
          <div key={col.id} className="min-w-0">
              <div className="mb-2.5 flex items-center gap-1.5 px-1">
                <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                <span className="truncate text-[11px] font-semibold text-brand-muted sm:text-xs">{col.label}</span>
              </div>
              <div className="space-y-2">
                {col.leads.map((lead) =>
              <div key={lead.name} className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-brand-plum/5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-white">
                        {lead.initials}
                      </span>
                      <span className="truncate text-[11px] font-semibold text-brand-plum sm:text-xs">{lead.name}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-4/5 rounded-full bg-brand-mist" />
                    <span className="mt-2 inline-block rounded-md bg-brand-mist px-1.5 py-0.5 text-[10px] font-medium text-brand">
                      {lead.tag}
                    </span>
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="absolute -left-1 top-0 sm:-left-6">
        
        <motion.div {...float(8, 5)} className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 shadow-xl ring-1 ring-brand-plum/5 backdrop-blur">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
            <PhoneOutgoingIcon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] font-medium text-brand-muted">Outreach queue</p>
            <p className="text-xs font-semibold text-brand-plum">Next call · Phoenix, AZ</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute -right-1 top-1/2 hidden sm:-right-8 sm:block">
        
        <motion.div {...float(6, 6)} className="flex items-center gap-2 rounded-full bg-brand-plum px-3.5 py-2 text-white shadow-xl ring-1 ring-white/10">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
            <CheckIcon className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className="text-xs font-semibold">CRM updated</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="absolute -bottom-1 right-2 sm:right-4">
        
        <motion.div {...float(7, 5.5)} className="w-[210px] rounded-2xl bg-white p-4 shadow-xl ring-1 ring-brand-plum/5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-mist text-brand">
              <CalendarCheckIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-brand-plum">Appointment set</p>
              <p className="text-[11px] text-brand-muted">Tue · 10:30 AM</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-brand-mist pt-3">
            <span className="h-1.5 flex-1 rounded-full bg-brand-lavender" />
            <span className="h-1.5 flex-1 rounded-full bg-brand-lavender" />
            <span className="h-1.5 flex-1 rounded-full bg-brand" />
          </div>
        </motion.div>
      </motion.div>
    </div>);

}