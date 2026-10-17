import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { GmailIcon } from './icons/GmailIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { SlackIcon } from './icons/SlackIcon';
import { SectionHeading } from './SectionHeading';
import { PlaceholderBadge } from './PlaceholderBadge';
import { SlackMessageForm } from './SlackMessageForm';
import { useCoarsePointer } from '../hooks/useCoarsePointer';
import { gmailComposeUrl, isValidEmail, isValidUrl, mailtoUrl } from '../utils/contact';
import { isValidSlackWebhook } from '../utils/slack';
import { showPlaceholders } from '../utils/sanity';
import type { HomepageContent, SiteSettings } from '../types/content';

interface ContactProps {
  home: HomepageContent;
  settings: SiteSettings;
}

interface ContactChannel {
  id: string;
  platform: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  kind: 'link' | 'form';
  href?: string;
  newTab: boolean;
  available: boolean;
  settingName: string;
}

export function Contact({ home, settings }: ContactProps) {
  const coarse = useCoarsePointer();
  const [slackOpen, setSlackOpen] = useState(false);
  const closeSlack = useCallback(() => setSlackOpen(false), []);
  const email = isValidEmail(settings.contactEmail) ? settings.contactEmail.trim() : undefined;
  const slackDestination = isValidUrl(settings.slackEndpointUrl)
    ? settings.slackEndpointUrl.trim()
    : isValidSlackWebhook(settings.slackWebhookUrl)
      ? settings.slackWebhookUrl.trim()
      : undefined;

  const channels: ContactChannel[] = [
  {
    id: 'gmail',
    platform: 'Gmail',
    label: 'Contact via Gmail',
    description: 'Send us a message and we’ll reply by email.',
    icon: <GmailIcon className="h-7 w-7" />,
    kind: 'link',
    href: email ? coarse ? mailtoUrl(email) : gmailComposeUrl(email) : undefined,
    newTab: !coarse,
    available: !!email,
    settingName: 'contact email'
  },
  {
    id: 'discord',
    platform: 'Discord',
    label: 'Connect on Discord',
    description: 'Join our server and chat with the team.',
    icon: <DiscordIcon className="h-7 w-7" />,
    kind: 'link',
    href: isValidUrl(settings.discordUrl) ? settings.discordUrl : undefined,
    newTab: true,
    available: isValidUrl(settings.discordUrl),
    settingName: 'Discord URL'
  },
  {
    id: 'slack',
    platform: 'Slack',
    label: 'Connect on Slack',
    description: 'Send a quick message straight to our team’s Slack.',
    icon: <SlackIcon className="h-7 w-7" />,
    kind: 'form',
    newTab: false,
    // The form stays usable in preview so it can be reviewed before the webhook is added.
    available: !!slackDestination || showPlaceholders,
    settingName: 'Slack webhook URL'
  }];


  const visible = channels.filter((c) => c.available || showPlaceholders);

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden bg-brand py-24 text-white sm:py-28 lg:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
          'radial-gradient(45% 60% at 50% 0%, rgba(164,138,200,0.35) 0%, rgba(66,48,96,0) 70%), radial-gradient(40% 50% at 100% 100%, rgba(33,24,47,0.6) 0%, rgba(66,48,96,0) 70%)'
        }} />
      
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="contact-heading" eyebrow="Contact us" title={home.contactHeading} description={home.contactDescription} tone="dark" align="center" />

        {visible.length > 0 ?
        <ul className={`mx-auto mt-14 grid gap-4 sm:gap-5 ${visible.length === 3 ? 'md:grid-cols-3' : visible.length === 2 ? 'max-w-3xl md:grid-cols-2' : 'max-w-md'}`}>
            {visible.map((channel, i) =>
          <motion.li
            key={channel.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: i * 0.05 }}
            className="h-full">
            
                {!channel.available ?
            <ChannelPlaceholder channel={channel} /> :
            channel.kind === 'form' ?
            <ChannelCard channel={channel} as="button" onClick={() => setSlackOpen(true)} /> :

            <ChannelCard channel={channel} as="a" />
            }
              </motion.li>
          )}
          </ul> :

        <p className="mt-12 text-center text-white/70">Contact options will be available shortly.</p>
        }

        {email &&
        <p className="mt-8 text-center text-sm text-white/65">
            Prefer your own email app?{' '}
            <a href={mailtoUrl(email)} className="font-semibold text-white underline decoration-brand-lavender underline-offset-4 hover:decoration-white focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand-lavender">
              {email}
            </a>
          </p>
        }
      </div>
      <SlackMessageForm open={slackOpen} onClose={closeSlack} endpointUrl={slackDestination} />
    </section>);

}

const cardClass =
'group flex h-full w-full flex-row items-center gap-5 rounded-3xl bg-white p-5 text-left text-brand-plum shadow-[0_20px_50px_-20px_rgba(33,24,47,0.5)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(33,24,47,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-lavender focus-visible:ring-offset-4 focus-visible:ring-offset-brand active:translate-y-0 active:scale-[0.99] md:flex-col md:items-start md:p-7';

type ChannelCardProps =
{channel: ContactChannel;as: 'a';onClick?: never;} |
{channel: ContactChannel;as: 'button';onClick: () => void;};

function ChannelCard({ channel, as, onClick }: ChannelCardProps) {
  const ActionIcon = channel.kind === 'form' ? ArrowRightIcon : ArrowUpRightIcon;
  const body =
  <>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-mist transition-transform duration-200 ease-out group-hover:scale-105">
        {channel.icon}
      </span>
      <span className="min-w-0 flex-1 md:mt-6">
        <span className="block text-xs font-semibold text-brand-muted">{channel.platform}</span>
        <span className="mt-0.5 block font-display text-lg font-bold">{channel.label}</span>
        <span className="mt-1.5 hidden text-sm leading-relaxed text-brand-muted sm:block">{channel.description}</span>
      </span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-mist text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white md:mt-6" aria-hidden="true">
        <ActionIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
      </span>
    </>;


  if (as === 'button') {
    return (
      <button type="button" onClick={onClick} aria-haspopup="dialog" className={cardClass}>
        {body}
      </button>);

  }

  return (
    <a
      href={channel.href}
      target={channel.newTab ? '_blank' : undefined}
      rel={channel.newTab ? 'noopener noreferrer' : undefined}
      aria-label={`${channel.label}${channel.newTab ? ' (opens in a new tab)' : ''}`}
      className={cardClass}>
      
      {body}
    </a>);

}

function ChannelPlaceholder({ channel }: {channel: ContactChannel;}) {
  return (
    <div
      aria-disabled="true"
      className="flex h-full flex-row items-center gap-5 rounded-3xl border border-dashed border-white/30 bg-white/[0.06] p-5 md:flex-col md:items-start md:p-7">
      
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 opacity-80">{channel.icon}</span>
      <span className="min-w-0 flex-1 md:mt-6">
        <PlaceholderBadge tone="dark" label="Not configured" />
        <span className="mt-2 block font-display text-lg font-bold text-white">{channel.label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-white/65">
          Add the {channel.settingName} in Sanity Site Settings to enable this button.
        </span>
      </span>
    </div>);

}
