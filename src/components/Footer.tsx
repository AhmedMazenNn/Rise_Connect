import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { Logo } from './Logo';
import { DiscordIcon } from './icons/DiscordIcon';
import { navItems } from '../content/defaultContent';
import { scrollToSection } from '../utils/scroll';
import { isValidEmail, isValidUrl } from '../utils/contact';
import type { SiteSettings } from '../types/content';

export function Footer({ settings }: {settings: SiteSettings;}) {
  const year = new Date().getFullYear();
  const contacts = [
  isValidUrl(settings.discordUrl) && { id: 'discord', label: 'Discord', href: settings.discordUrl, icon: <DiscordIcon className="h-4 w-4" /> }].
  filter(Boolean) as {id: string;label: string;href: string;icon: React.ReactNode;}[];
  const socials = settings.socialLinks.filter((link) => link.label && isValidUrl(link.url));

  return (
    <footer className="bg-brand-plum text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo companyName={settings.companyName} logoUrl={settings.logoUrl} variant="full" />
            <p className="text-pretty mt-5 max-w-sm text-sm leading-relaxed text-white/60">{settings.footerText}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {navItems.map((item) =>
              <li key={item.id}>
                  <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="text-sm text-white/60 transition-colors duration-150 hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline">
                  
                    {item.label}
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold text-white">Get in touch</h2>
            {isValidEmail(settings.contactEmail) &&
            <p className="mt-5 text-sm text-white/70">{settings.contactEmail}</p>
            }
            {contacts.length > 0 ?
            <ul className="mt-4 space-y-3">
                {contacts.map((contact) =>
              <li key={contact.id}>
                    <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-sm text-white/70 transition-colors duration-150 hover:text-white focus:outline-none focus-visible:text-white">
                  
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">{contact.icon}</span>
                      {contact.label}
                      <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-50 transition-opacity duration-150 group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
              )}
              </ul> :

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="mt-5 inline-flex text-sm text-white/60 hover:text-white">
              
                Visit the contact section
              </a>
            }
            {socials.length > 0 &&
            <ul className="mt-6 flex flex-wrap gap-2">
                {socials.map((social) =>
              <li key={social.url}>
                    <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors duration-150 hover:border-white/40 hover:text-white">
                  
                      {social.label}
                    </a>
                  </li>
              )}
              </ul>
            }
            {settings.address &&
            <address className="mt-7 not-italic text-sm leading-relaxed text-white/60">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Business contact</div>
              <div>{settings.address.street}</div>
              <div>{settings.address.cityStateZip}</div>
              <a className="mt-3 inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-base font-semibold tracking-wide text-white transition-colors hover:border-white/50 hover:bg-white/15" href={`tel:${settings.address.phone}`}>
                <span className="mr-2 text-xs font-normal uppercase tracking-[0.12em] text-white/60">Phone</span>
                {settings.address.phone}
              </a>
            </address>
            }
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {settings.companyName}. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</a>
            <a href="/refund-policy" className="hover:text-white">Refund Policy</a>
          </nav>
        </div>
      </div>
    </footer>);

}
