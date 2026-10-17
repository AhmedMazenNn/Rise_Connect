import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, MenuIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { navItems } from '../content/defaultContent';
import { scrollToSection } from '../utils/scroll';

interface NavbarProps {
  companyName: string;
  logoUrl?: string;
  activeId: string;
}

export function Navbar({ companyName, logoUrl, activeId }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${
        solid ?
        'border-white/10 bg-brand-plum/90 backdrop-blur-xl' :
        'border-transparent bg-transparent'}`
        }>
        
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" onClick={(e) => go(e, 'home')} aria-label={`${companyName} — back to top`} className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender">
            <Logo companyName={companyName} logoUrl={logoUrl} />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => go(e, item.id)}
                      aria-current={active ? 'true' : undefined}
                      className={`relative block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender ${
                      active ? 'text-white' : 'text-white/65 hover:text-white'}`
                      }>
                      
                      {active &&
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }} />

                      }
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>);

              })}
            </ul>
          </nav>

          <a
            href="#contact"
            onClick={(e) => go(e, 'contact')}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-plum transition-colors duration-150 hover:bg-brand-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-brand-plum lg:inline-flex">
            
            Get in Touch
            <ArrowRightIcon className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-150 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender lg:hidden">
            
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open &&
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="border-b border-white/10 bg-brand-plum/95 px-5 pb-6 pt-2 backdrop-blur-xl sm:px-8 lg:hidden">
          
            <ul className="flex flex-col">
              {navItems.map((item, i) =>
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}>
              
                  <a
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className={`flex items-center justify-between border-b border-white/10 py-4 font-display text-lg font-semibold focus:outline-none focus-visible:text-brand-lavender ${
                activeId === item.id ? 'text-white' : 'text-white/70'}`
                }>
                
                    {item.label}
                    {activeId === item.id && <span className="h-1.5 w-1.5 rounded-full bg-brand-lavender" />}
                  </a>
                </motion.li>
            )}
            </ul>
            <a
            href="#contact"
            onClick={(e) => go(e, 'contact')}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-brand-plum">
            
              Get in Touch
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </motion.nav>
        }
      </AnimatePresence>
    </header>);

}
