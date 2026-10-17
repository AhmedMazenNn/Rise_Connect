import React from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/testimonials/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useSiteContent } from './hooks/useSiteContent';
import { useActiveSection } from './hooks/useActiveSection';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import { navSectionIds } from './content/defaultContent';

export function App() {
  const { content, status } = useSiteContent();
  const { settings, home, services, testimonials } = content;
  const activeId = useActiveSection(navSectionIds);

  useDocumentMeta({ title: settings.seoTitle, description: settings.seoDescription, image: settings.ogImageUrl });

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full overflow-x-clip bg-white font-sans text-brand-plum">
        <a
          href="#about"
          className="sr-only z-[200] rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-plum focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          
          Skip to content
        </a>
        <Navbar companyName={settings.companyName} logoUrl={settings.logoUrl} activeId={activeId} />
        <main>
          <Hero home={home} />
          <About home={home} />
          <Services home={home} services={services} />
          <WhyChooseUs />
          <HowItWorks />
          <Testimonials home={home} testimonials={testimonials} status={status} />
          <Contact home={home} settings={settings} />
        </main>
        <Footer settings={settings} />
      </div>
    </MotionConfig>);

}
