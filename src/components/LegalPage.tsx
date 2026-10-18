import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { defaultSettings } from '../content/defaultContent';

type LegalKind = 'privacy' | 'terms' | 'refund';

const pageCopy: Record<LegalKind, { title: string; intro: string }> = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'This Privacy Policy explains how Rise and Connect collects, uses, and protects information when you visit our website or contact us about our services.'
  },
  terms: {
    title: 'Terms and Conditions',
    intro: 'These Terms and Conditions govern your use of the Rise and Connect website and your discussions with us about virtual assistance, lead generation, and related business support services.'
  },
  refund: {
    title: 'Refund and Cancellation Policy',
    intro: 'We want our clients to understand what happens after a payment is made and how to request a cancellation or refund.'
  }
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  const copy = pageCopy[kind];
  const { address } = defaultSettings;
  const year = new Date().getFullYear();

  return <div className="min-h-screen bg-white text-brand-plum">
    <header className="border-b border-brand-plum/10">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="/" className="font-display text-lg font-bold tracking-tight">{defaultSettings.companyName}</a>
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-plum/70 hover:text-brand-plum"><ArrowLeft className="h-4 w-4" /> Back to home</a>
      </div>
    </header>
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Rise and Connect</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
      <p className="mt-6 text-lg leading-8 text-brand-plum/70">{copy.intro}</p>
      <p className="mt-4 text-sm text-brand-plum/55">Last updated: October {year}</p>

      {kind === 'privacy' && <div className="legal-content">
        <h2>Information we collect</h2><p>We may collect information you choose to provide, such as your name, company, email address, phone number, and the contents of a message or service request. We also receive basic technical information such as browser, device, and pages visited when needed to operate and secure the website.</p>
        <h2>How we use information</h2><p>We use information to respond to enquiries, provide and improve our services, communicate about an engagement, maintain business records, prevent misuse, and meet legal or payment-processing obligations. We do not sell personal information.</p>
        <h2>Service providers</h2><p>We may use trusted providers for website hosting, content management, communications, analytics, and payment processing. These providers may process information only as needed to perform their services and under their own applicable privacy terms.</p>
        <h2>Retention and security</h2><p>We retain information for as long as reasonably necessary for the purpose collected, an active client relationship, accounting, dispute handling, or legal compliance. We use reasonable administrative and technical safeguards, but no internet transmission can be guaranteed completely secure.</p>
        <h2>Your choices</h2><p>You may ask us to access, correct, or delete personal information where applicable. Contact us using the details below. You may also stop receiving non-essential communications by following the instructions in the message or contacting us directly.</p>
        <h2>Contact</h2><p>Rise and Connect<br />{address?.street}<br />{address?.cityStateZip}<br /><a href={`tel:${address?.phone}`}>{address?.phone}</a></p>
      </div>}

      {kind === 'terms' && <div className="legal-content">
        <h2>Our services</h2><p>Rise and Connect provides virtual assistance, outreach, lead generation, CRM and dialer support, lead qualification, and appointment-setting services. The exact scope, timing, price, deliverables, and client responsibilities are agreed in a separate proposal, order, or service agreement.</p>
        <h2>Website use</h2><p>You may use this website for lawful business and informational purposes. Do not misuse the website, submit unlawful or harmful content, attempt unauthorized access, or interfere with its operation.</p>
        <h2>Client responsibilities</h2><p>Clients are responsible for providing accurate information, lawful instructions, required access, timely approvals, and any permissions needed for contact lists or marketing activity. Clients remain responsible for their legal and regulatory obligations, including applicable telemarketing, privacy, advertising, and consent requirements.</p>
        <h2>Payments and fulfillment</h2><p>Prices, billing timing, deliverables, and expected start dates are disclosed before a purchase or engagement. Services are delivered digitally or remotely according to the agreed scope. We do not ship physical products. Payment processing may be handled by Stripe or another authorized provider under its terms.</p>
        <h2>Intellectual property</h2><p>Website text, branding, graphics, and other materials belong to Rise and Connect or their respective owners. You may not copy or reuse them commercially without permission. Client-provided materials remain the client’s property, subject to the rights needed to perform the agreed services.</p>
        <h2>Disclaimers and limitation</h2><p>We do not guarantee a particular number of leads, appointments, hires, revenue, or business outcome unless expressly stated in a signed agreement. To the extent permitted by law, Rise and Connect is not liable for indirect or consequential losses arising from website use or an engagement.</p>
        <h2>Contact</h2><p>Questions about these terms can be sent to Rise and Connect at {address?.street}, {address?.cityStateZip}, or by calling <a href={`tel:${address?.phone}`}>{address?.phone}</a>.</p>
      </div>}

      {kind === 'refund' && <div className="legal-content">
        <h2>Digital and service-based work</h2><p>Our services are customized, digital, and delivered remotely. There are no physical products or shipping charges. Any delivery milestones, access dates, or service windows are stated in the applicable proposal or service agreement.</p>
        <h2>Cancellation</h2><p>Clients may cancel a recurring service by giving at least seven days’ notice before the next billing date. For one-time projects, cancellation is available before work begins. If a service agreement contains different notice terms, that agreement controls.</p>
        <h2>Refunds</h2><p>If a client cancels before work begins, we will provide a full refund less any clearly disclosed, non-refundable third-party costs. If work has started, we may refund the unused portion of prepaid services after deducting work already completed and approved expenses. Completed work, consumed service hours, and third-party costs are non-refundable.</p>
        <h2>Refund timing and service issues</h2><p>Approved refunds are returned to the original payment method within five to ten business days, subject to the payment provider. If a client believes a service was not delivered as agreed, they should contact us within fourteen days of the relevant delivery date so we can investigate and work toward a fair resolution.</p>
        <h2>How to request help</h2><p>Contact us promptly with your name, the service or payment concerned, the date of payment, and the reason for your request. We aim to acknowledge requests within three business days and will work in good faith to resolve service or billing questions.</p>
        <h2>Contact</h2><p>Rise and Connect<br />{address?.street}<br />{address?.cityStateZip}<br /><a href={`tel:${address?.phone}`}>{address?.phone}</a></p>
      </div>}
    </main>
    <footer className="border-t border-brand-plum/10 px-5 py-8 text-center text-sm text-brand-plum/55">© {year} {defaultSettings.companyName}. All rights reserved.</footer>
  </div>;
}
