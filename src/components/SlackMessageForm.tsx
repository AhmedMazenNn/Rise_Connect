import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon, SendIcon, XIcon } from 'lucide-react';
import { SlackIcon } from './icons/SlackIcon';
import { isValidEmail } from '../utils/contact';
import { sendSlackMessage, type SlackMessage } from '../utils/slack';

interface SlackMessageFormProps {
  open: boolean;
  onClose: () => void;
  endpointUrl?: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';
type Errors = Partial<Record<keyof SlackMessage, string>>;

const emptyForm: SlackMessage = { name: '', email: '', company: '', message: '' };

export function SlackMessageForm({ open, onClose, endpointUrl }: SlackMessageFormProps) {
  const [form, setForm] = useState<SlackMessage>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const isPreview = !endpointUrl;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        setForm(emptyForm);
        setErrors({});
        setStatus('idle');
      }, 250);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const update = (field: keyof SlackMessage) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: event.target.value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!isValidEmail(form.email)) next.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'Please share a little more detail (at least 10 characters).';
    return next;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus('sending');
    try {
      if (endpointUrl) {
        await sendSlackMessage(endpointUrl, {
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          message: form.message.trim()
        });
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-plum/80 backdrop-blur-sm sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={onClose}>
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="slack-form-title"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] bg-white p-6 text-brand-plum shadow-2xl sm:max-w-lg sm:rounded-[28px] sm:p-8">
          
            <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-brand-muted transition-colors duration-150 hover:bg-brand-mist hover:text-brand-plum focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender">
            
              <XIcon className="h-5 w-5" />
            </button>

            {status === 'success' ?
          <div className="flex flex-col items-center py-8 text-center" role="status">
                <motion.span
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              
                  <CheckCircle2Icon className="h-8 w-8" />
                </motion.span>
                <h2 className="mt-5 font-display text-2xl font-bold">Message sent</h2>
                <p className="mt-2 max-w-xs text-brand-muted">
                  Thanks, {form.name.split(' ')[0]}. Our team received your message on Slack and will reply to {form.email}.
                </p>
                {isPreview &&
            <p className="mt-4 rounded-xl bg-brand-mist px-4 py-2 text-xs text-brand-muted">
                    Preview only — nothing was sent because no Slack webhook is configured.
                  </p>
            }
                <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-plum focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender focus-visible:ring-offset-2">
              
                  Done
                </button>
              </div> :

          <>
                <div className="flex items-center gap-3 pr-10">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-mist">
                    <SlackIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 id="slack-form-title" className="font-display text-xl font-bold">
                      Connect on Slack
                    </h2>
                    <p className="text-sm text-brand-muted">Your message goes straight to our team’s Slack.</p>
                  </div>
                </div>

                {isPreview &&
            <p className="mt-5 rounded-xl border border-dashed border-brand-lilac bg-brand-mist px-4 py-3 text-xs leading-relaxed text-brand-muted">
                  Preview mode: add a Slack Cloudflare Worker endpoint in Sanity Site Settings to deliver submissions.
                  </p>
            }

                <form onSubmit={submit} noValidate className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" id="slack-name" error={errors.name}>
                      <input
                    ref={firstFieldRef}
                    id="slack-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={update('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'slack-name-error' : undefined}
                    className={inputClass(!!errors.name)} />
                  
                    </Field>
                    <Field label="Email" id="slack-email" error={errors.email}>
                      <input
                    id="slack-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'slack-email-error' : undefined}
                    className={inputClass(!!errors.email)} />
                  
                    </Field>
                  </div>
                  <Field label="Company" id="slack-company" optional>
                    <input
                  id="slack-company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={update('company')}
                  className={inputClass(false)} />
                
                  </Field>
                  <Field label="How can we help?" id="slack-message" error={errors.message}>
                    <textarea
                  id="slack-message"
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'slack-message-error' : undefined}
                  className={`${inputClass(!!errors.message)} resize-none`} />
                
                  </Field>

                  {status === 'error' &&
              <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
                      We couldn’t send your message. Please check your connection and try again.
                    </p>
              }

                  <button
                type="submit"
                disabled={status === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-plum focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-80">
                
                    {status === 'sending' ?
                <>
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                        Sending…
                      </> :

                <>
                        Send message
                        <SendIcon className="h-4 w-4" />
                      </>
                }
                  </button>
                </form>
              </>
          }
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}

function Field({ label, id, error, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center justify-between text-sm font-semibold text-brand-plum">
        {label}
        {optional && <span className="text-xs font-normal text-brand-muted">Optional</span>}
      </label>
      {children}
      {error &&
      <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      }
    </div>);

}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-brand-plum placeholder:text-brand-muted/60 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-4 ${
  hasError ?
  'border-red-400 focus:border-red-500 focus:ring-red-100' :
  'border-brand-plum/15 focus:border-brand focus:ring-brand-lavender/25'}`;

}
