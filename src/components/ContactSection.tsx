import { useState, type FormEvent } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Send,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import {
  buildGmailComposeHref,
  buildMailtoHref,
  formatInquiryPlainText,
  INQUIRY_TYPES,
  validateContactForm,
  type ContactFormInput,
  type InquiryType,
} from '../utils/portfolioLogic';
import { SplitWordHeading } from './KineticText';

type CopyField = 'email' | 'phone' | 'location' | 'message';

interface SubmittedState {
  input: ContactFormInput;
  deliveredVia: 'resend' | 'smtp' | 'client_dispatch';
  mailtoHref: string;
  gmailHref: string;
  formattedText: string;
}

const INITIAL_FORM: ContactFormInput = {
  fullName: '',
  email: '',
  inquiryType: 'Internship',
  projectDetails: '',
};

export function ContactSection() {
  const [formState, setFormState] = useState<ContactFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedState | null>(null);
  const [copiedField, setCopiedField] = useState<CopyField | null>(null);

  const handleCopy = async (field: CopyField, value: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2200);
    } catch {
      setCopiedField(field);
    }
  };

  const triggerMailtoDispatch = (mailtoHref: string) => {
    const anchor = document.createElement('a');
    anchor.href = mailtoHref;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm(formState);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const fallbackMailto = buildMailtoHref(formState, PROFILE.email);
    const fallbackGmail = buildGmailComposeHref(formState, PROFILE.email);
    const fallbackText = formatInquiryPlainText(formState);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          deliveredVia?: 'resend' | 'smtp' | 'client_dispatch';
          mailtoHref?: string;
          gmailHref?: string;
          formattedText?: string;
        };

        const deliveredVia = data.deliveredVia ?? 'client_dispatch';
        const mailtoHref = data.mailtoHref ?? fallbackMailto;
        const gmailHref = data.gmailHref ?? fallbackGmail;
        const formattedText = data.formattedText ?? fallbackText;

        setSubmittedData({
          input: { ...formState },
          deliveredVia,
          mailtoHref,
          gmailHref,
          formattedText,
        });

        if (deliveredVia === 'client_dispatch') {
          triggerMailtoDispatch(mailtoHref);
        }
        return;
      }
    } catch {
      // Fallback seamlessly to direct client-side email dispatch
    } finally {
      setIsSubmitting(false);
    }

    setSubmittedData({
      input: { ...formState },
      deliveredVia: 'client_dispatch',
      mailtoHref: fallbackMailto,
      gmailHref: fallbackGmail,
      formattedText: fallbackText,
    });
    triggerMailtoDispatch(fallbackMailto);
  };

  const handleReset = () => {
    setFormState(INITIAL_FORM);
    setErrors({});
    setSubmittedData(null);
  };

  const contactChannels = [
    {
      id: 'email' as CopyField,
      label: 'Direct Email',
      value: PROFILE.email,
      icon: Mail,
      copyAria: `Copy email address ${PROFILE.email}`,
    },
    {
      id: 'phone' as CopyField,
      label: 'Phone',
      value: PROFILE.phone,
      icon: Phone,
      copyAria: `Copy phone number ${PROFILE.phone}`,
    },
    {
      id: 'location' as CopyField,
      label: 'Location',
      value: PROFILE.location,
      icon: MapPin,
      copyAria: `Copy location ${PROFILE.location}`,
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SplitWordHeading
          eyebrow="04. Direct Channels"
          text="Start a Conversation or Collaboration"
        />
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-400">
          Available for AI engineering internships, fintech architecture builds, and technical
          collaborations. Submit the brief below to send your details directly to my email (
          <span className="text-slate-200">{PROFILE.email}</span>).
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: One-Click Copy Channels */}
          <div className="space-y-4 lg:col-span-5">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              const isCopied = copiedField === channel.id;
              return (
                <div
                  key={channel.id}
                  className="glass-surface glass-surface-hover flex items-center justify-between gap-4 rounded-xl p-4 sm:p-5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-cyan-300">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-slate-400">{channel.label}</div>
                      <div className="truncate text-sm font-medium text-slate-100">
                        {channel.value}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(channel.id, channel.value)}
                    aria-label={channel.copyAria}
                    className={`inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isCopied
                        ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-300'
                        : 'border-slate-700 bg-slate-900/90 text-slate-200 hover:border-cyan-400/60 hover:text-cyan-200'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}

            <div className="glass-surface rounded-xl p-5">
              <div className="font-mono text-xs text-slate-400">Portfolio Reference</div>
              <p className="mt-1.5 text-sm text-slate-300">
                View my companion showcase and live product deployments:
              </p>
              <a
                href={PROFILE.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="kinetic-underline mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
              >
                <span>rohit-jangra-5wzh.myseera.com</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form & Dispatch Confirmation */}
          <div className="glass-surface rounded-2xl p-6 sm:p-8 lg:col-span-7">
            {!submittedData ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-full-name"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-full-name"
                      name="fullName"
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, fullName: e.target.value }));
                        if (errors.fullName) {
                          setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }
                      }}
                      placeholder="Aarav Sharma"
                      aria-invalid={Boolean(errors.fullName)}
                      className="mt-2 w-full rounded-lg border border-slate-700/90 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    {errors.fullName && (
                      <p role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                      placeholder="aarav@company.com"
                      aria-invalid={Boolean(errors.email)}
                      className="mt-2 w-full rounded-lg border border-slate-700/90 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-inquiry-type"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="contact-inquiry-type"
                    name="inquiryType"
                    value={formState.inquiryType}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        inquiryType: e.target.value as InquiryType,
                      }))
                    }
                    className="mt-2 w-full rounded-lg border border-slate-700/90 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-slate-950 text-slate-100">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-details"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Project / Work Details
                  </label>
                  <textarea
                    id="contact-details"
                    name="projectDetails"
                    rows={4}
                    required
                    value={formState.projectDetails}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, projectDetails: e.target.value }));
                      if (errors.projectDetails) {
                        setErrors((prev) => ({ ...prev, projectDetails: undefined }));
                      }
                    }}
                    placeholder="Share scope, timeline, or collaboration goals..."
                    aria-invalid={Boolean(errors.projectDetails)}
                    className="mt-2 w-full rounded-lg border border-slate-700/90 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  {errors.projectDetails && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-400">
                      {errors.projectDetails}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-xs text-slate-400">
                    Dispatches directly to {PROFILE.email}
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-cyan-300 disabled:opacity-65 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div
                data-testid="contact-confirmation"
                className="space-y-5 animate-[fadeIn_260ms_cubic-bezier(0.16,1,0.3,1)]"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-300">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-50">
                      {submittedData.deliveredVia === 'client_dispatch'
                        ? 'Inquiry Ready & Mail App Launched'
                        : 'Email Delivered to Rohit’s Inbox'}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      {submittedData.deliveredVia === 'client_dispatch' ? (
                        <>
                          Your device email client was triggered with a pre-formatted message
                          addressed to <span className="text-cyan-300">{PROFILE.email}</span>. You
                          can also send immediately via Gmail Web below.
                        </>
                      ) : (
                        <>
                          Your inquiry details and reply address were emailed directly to{' '}
                          <span className="text-cyan-300">{PROFILE.email}</span>.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm space-y-2">
                  <div className="flex justify-between gap-4 border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Sender</span>
                    <span className="font-medium text-slate-100">
                      {submittedData.input.fullName} ({submittedData.input.email})
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Inquiry Type</span>
                    <span className="font-medium text-cyan-300">
                      {submittedData.input.inquiryType}
                    </span>
                  </div>
                  <div className="pt-1">
                    <span className="block text-slate-400">Details</span>
                    <p className="mt-1 text-slate-200 whitespace-pre-wrap">
                      {submittedData.input.projectDetails}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={submittedData.gmailHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-300 whitespace-nowrap"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Open in Gmail Web</span>
                  </a>

                  <a
                    href={submittedData.mailtoHref}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-200 whitespace-nowrap"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Open Mail App</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy('message', submittedData.formattedText)}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-200 whitespace-nowrap"
                  >
                    {copiedField === 'message' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied Message</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:text-slate-100 whitespace-nowrap"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>New Inquiry</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
