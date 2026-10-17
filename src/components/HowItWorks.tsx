import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { PhoneCallIcon, RocketIcon, UserSearchIcon, UsersIcon, BoxIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { processSteps } from '../content/defaultContent';
const stepIcons: Record<string, BoxIcon> = {
  define: PhoneCallIcon,
  source: UserSearchIcon,
  shortlist: UsersIcon,
  onboard: RocketIcon
};
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 55%']
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30
  });
  const [reached, setReached] = useState(-1);
  const [focused, setFocused] = useState<number | null>(null);
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setReached(value <= 0.02 ? -1 : Math.round(value * (processSteps.length - 1)));
  });
  return <section id="how-it-works" aria-labelledby="how-heading" className="bg-white py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="how-heading" eyebrow="How it works" title="From first call to your new hire getting started." description="A clear, coordinated process — so you meet qualified candidates quickly and onboard with confidence." align="center" />

        <ol ref={ref} className="relative mt-16 grid gap-12 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {/* Horizontal connector (desktop) */}
          <div className="absolute left-7 right-[calc(25%-1.75rem)] top-7 hidden h-[2px] rounded-full bg-brand-mist lg:block" aria-hidden="true">
            <motion.div className="h-full origin-left rounded-full bg-brand" style={{
            scaleX: progress
          }} />
          </div>
          {/* Vertical connector (mobile & tablet) */}
          <div className="absolute bottom-4 left-7 top-4 w-[2px] rounded-full bg-brand-mist lg:hidden" aria-hidden="true">
            <motion.div className="h-full w-full origin-top rounded-full bg-brand" style={{
            scaleY: progress
          }} />
          </div>

          {processSteps.map((step, i) => {
          const Icon = stepIcons[step.id] ?? PhoneCallIcon;
          const isReached = i <= reached;
          const isFocused = focused === i;
          return <li key={step.id} className="relative flex gap-6 lg:flex-col lg:gap-0" onMouseEnter={() => setFocused(i)} onMouseLeave={() => setFocused(null)}>
                <div className="flex items-center gap-4 lg:h-14">
                  <motion.span animate={{
                scale: isFocused ? 1.08 : 1
              }} transition={{
                duration: 0.16,
                ease: 'easeOut'
              }} className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${isReached ? 'border-brand bg-brand text-white' : 'border-brand-lilac bg-white text-brand'}`}>
                    <Icon className="h-5 w-5" />
                  </motion.span>
                </div>
                <motion.div initial={{
              opacity: 0,
              y: 12
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: '-60px'
            }} transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: i * 0.05
            }} className={`flex flex-1 flex-col rounded-3xl p-6 ring-1 transition-colors duration-200 lg:mt-6 ${isFocused ? 'bg-brand-mist ring-brand-lilac' : 'bg-white ring-brand-plum/5'}`}>
                  <span className="inline-flex self-start whitespace-nowrap rounded-full bg-brand-mist px-3 py-1 text-xs font-semibold text-brand">
                    {step.timing}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-brand-plum">{step.phase}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-lavender">{step.label}</p>
                  <p className="text-pretty mt-4 text-[15px] leading-relaxed text-brand-muted">{step.description}</p>
                  <div className="mt-auto pt-6">
                    <div className="border-t border-brand-plum/10 pt-4">
                      <p className="text-xs font-semibold text-brand-plum">Outcome</p>
                      <p className="text-pretty mt-1 text-sm leading-relaxed text-brand-plum/80">{step.outcome}</p>
                    </div>
                  </div>
                </motion.div>
              </li>;
        })}
        </ol>
      </div>
    </section>;
}
