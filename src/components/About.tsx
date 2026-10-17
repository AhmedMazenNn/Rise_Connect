import React from 'react';
import { Building2Icon, StoreIcon } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import type { HomepageContent } from '../types/content';

const offerings = [
{ id: 'va', title: 'Virtual assistance', text: 'Calls, inbox, admin, and follow-ups handled daily.' },
{ id: 'leads', title: 'Lead generation', text: 'Sourced, skip-traced, and researched prospects.' },
{ id: 'crm', title: 'CRM & workflows', text: 'Tools configured and pipelines kept organized.' }];


const ABOUT_IMAGE = "/d92fc7cf-2244-4e4e-bc96-d8222a64a3be.jpg";


export function About({ home }: {home: HomepageContent;}) {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-24 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-5">
          <div className="overflow-hidden rounded-[28px] bg-brand-mist">
            <img
              src={ABOUT_IMAGE}
              alt="A Rise and Connect assistant on a call while updating a CRM pipeline"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover" />
            
          </div>
          <div className="absolute -bottom-8 right-4 w-[230px] rounded-2xl bg-white p-5 shadow-[0_20px_50px_-15px_rgba(33,24,47,0.25)] ring-1 ring-brand-plum/5 sm:-right-8">
            <p className="text-xs font-semibold text-brand-muted">Who we serve</p>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center gap-3 text-sm font-semibold text-brand-plum">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-mist text-brand">
                  <Building2Icon className="h-4 w-4" />
                </span>
                Real estate investors
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-brand-plum">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-mist text-brand">
                  <StoreIcon className="h-4 w-4" />
                </span>
                Small businesses
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading id="about-heading" eyebrow="About us" title={home.aboutHeading} />
          <Reveal className="mt-8 space-y-5 text-base leading-relaxed text-brand-muted sm:text-lg" delay={0.05}>
            {home.aboutBody.map((paragraph, i) =>
            <p key={i} className={`text-pretty ${i === 0 ? 'text-brand-plum' : ''}`}>
                {paragraph}
              </p>
            )}
          </Reveal>
          <dl className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {offerings.map((offering, i) =>
            <Reveal key={offering.id} delay={0.05 * i} className="border-t-2 border-brand-lavender/40 pt-5">
                <dt className="font-display text-base font-bold text-brand-plum">{offering.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-brand-muted">{offering.text}</dd>
              </Reveal>
            )}
          </dl>
        </div>
      </div>
    </section>);

}