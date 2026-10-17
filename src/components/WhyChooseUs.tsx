import React from "react";
import { CalendarClockIcon, ClockIcon, LayoutListIcon, RepeatIcon, BoxIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { benefits, dailyRhythm } from '../content/defaultContent';
const benefitIcons: Record<string, BoxIcon> = {
  time: ClockIcon,
  'follow-up': RepeatIcon,
  workflow: LayoutListIcon,
  appointments: CalendarClockIcon
};
export function WhyChooseUs() {
  return <section id="why-choose-us" aria-labelledby="why-heading" className="relative overflow-hidden bg-brand-plum py-24 text-white sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{
      background: 'radial-gradient(50% 60% at 0% 0%, rgba(66,48,96,0.7) 0%, rgba(33,24,47,0) 70%)'
    }} />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeading id="why-heading" eyebrow="Why Rise and Connect" title="Less busywork. More consistent growth." description="We take on the steady, repeatable work behind a healthy pipeline — so nothing falls through the cracks while you focus on deals." tone="dark" />
          <Reveal delay={0.08} className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <p className="font-display text-sm font-bold text-white">A day of support, at a glance</p>
            <ol className="relative mt-6 space-y-5 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-white/15">
              {dailyRhythm.map((entry) => <li key={entry.id} className="relative flex gap-4 pl-0">
                  <span className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-brand-lavender bg-brand-plum" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-brand-lavender">{entry.time}</p>
                    <p className="mt-0.5 text-sm text-white/80">{entry.task}</p>
                  </div>
                </li>)}
            </ol>
          </Reveal>
        </div>

        <ul className="lg:col-span-7">
          {benefits.map((benefit, i) => {
          const Icon = benefitIcons[benefit.id] ?? ClockIcon;
          return <Reveal as="li" key={benefit.id} delay={i * 0.04} className="flex gap-6 border-t border-white/10 py-10 first:border-t-0 first:pt-0 sm:gap-8 lg:first:pt-2">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-lavender/15 text-brand-lavender">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{benefit.title}</h3>
                  <p className="text-pretty mt-3 max-w-lg text-base leading-relaxed text-white/65">{benefit.description}</p>
                </div>
              </Reveal>;
        })}
        </ul>
      </div>
    </section>;
}
