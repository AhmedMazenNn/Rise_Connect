import React from "react";
import { motion } from "framer-motion";
import { CalendarCheckIcon, CheckIcon, DatabaseIcon, HouseIcon, PhoneCallIcon, SparklesIcon, BoxIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { sanityImage } from "../utils/sanity";
import { HomepageContent, Service, ServiceIconKey } from "../types/content";
const iconMap: Record<ServiceIconKey, BoxIcon> = {
  phone: PhoneCallIcon,
  home: HouseIcon,
  database: DatabaseIcon,
  calendar: CalendarCheckIcon
};

// Asymmetric bento rhythm: wide / narrow, then narrow / wide.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];
interface ServicesProps {
  home: HomepageContent;
  services: Service[];
}
export function Services({
  home,
  services
}: ServicesProps) {
  return <section id="services" aria-labelledby="services-heading" className="bg-brand-mist py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="services-heading" eyebrow="Our services" title={home.servicesHeading} />
          <p className="text-pretty max-w-md text-base leading-relaxed text-brand-muted lg:pb-2">{home.servicesIntro}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {services.map((service, i) => <ServiceCard key={service.id} service={service} featured={i === 0} span={spans[i % spans.length]} index={i} />)}
        </div>
      </div>
    </section>;
}
interface ServiceCardProps {
  service: Service;
  featured: boolean;
  span: string;
  index: number;
}
function ServiceCard({
  service,
  featured,
  span,
  index
}: ServiceCardProps) {
  const Icon = service.icon && iconMap[service.icon] || SparklesIcon;
  const image = sanityImage(service.imageUrl, 160);
  return <motion.article initial={{
    opacity: 0,
    y: 16
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: '-60px'
  }} transition={{
    duration: 0.3,
    ease: [0.23, 1, 0.32, 1],
    delay: index % 2 * 0.05
  }} className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-[28px] p-7 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 sm:p-9 ${span} ${featured ? 'bg-brand text-white hover:shadow-[0_30px_60px_-20px_rgba(66,48,96,0.6)]' : 'bg-white text-brand-plum ring-1 ring-brand-plum/5 hover:shadow-[0_30px_60px_-25px_rgba(33,24,47,0.25)]'}`}>
      <Icon aria-hidden="true" strokeWidth={1} className={`pointer-events-none absolute -bottom-8 -right-8 h-48 w-48 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105 ${featured ? 'text-white/[0.07]' : 'text-brand/[0.06]'}`} />
      <div className="relative">
        <span className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl transition-colors duration-200 ${featured ? 'bg-brand-lavender text-brand-plum' : 'bg-brand-mist text-brand group-hover:bg-brand group-hover:text-white'}`}>
          {image ? <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" /> : <Icon className="h-6 w-6" />}
        </span>
        <h3 className="mt-8 max-w-sm text-balance font-display text-2xl font-bold leading-tight tracking-tight">
          {service.title}
        </h3>
        <p className={`text-pretty mt-3 max-w-md text-[15px] leading-relaxed ${featured ? 'text-white/75' : 'text-brand-muted'}`}>
          {service.description}
        </p>
      </div>
      {service.points.length > 0 && <ul className="relative mt-auto flex flex-wrap gap-2 pt-8">
          {service.points.map((point) => <li key={point} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium ${featured ? 'bg-white/10 text-white' : 'bg-brand-mist text-brand-plum'}`}>
              <CheckIcon className={`h-3.5 w-3.5 ${featured ? 'text-brand-lavender' : 'text-brand'}`} strokeWidth={2.5} />
              {point}
            </li>)}
        </ul>}
    </motion.article>;
}