import { useState } from 'react';
import { Award, Cpu, GraduationCap, Shield } from 'lucide-react';
import {
  CREDENTIALS,
  JOURNEY_TIMELINE,
  PROFILE,
  TECHNICAL_ARSENAL,
} from '../data/portfolioData';
import { useReveal } from '../utils/useReveal';
import { SplitWordHeading } from './KineticText';

const CREDENTIAL_ICONS = [GraduationCap, Cpu, Award, Shield];
type ProfileTab = 'stack' | 'timeline';

export function AboutCredentialsSection() {
  const { ref: credsRef, isVisible: credsVisible } = useReveal<HTMLDivElement>(0.1);
  const [activeTab, setActiveTab] = useState<ProfileTab>('stack');
  const [spotlightPos, setSpotlightPos] = useState<Record<string, { x: number; y: number }>>({});

  return (
    <section id="about" className="border-b border-slate-800/70 py-20 sm:py-24 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* About Narrative + Interactive Stack/Timeline Panel */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SplitWordHeading
              eyebrow="01. Background"
              text="Engineering AI systems with real-world security and fintech rigor"
            />
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              I am <span className="font-semibold text-slate-100">{PROFILE.name}</span>, a{' '}
              <span className="text-slate-100">{PROFILE.degree}</span> student at{' '}
              <span className="text-slate-100">{PROFILE.university}</span>. My work sits at the
              intersection of full-stack software architecture, machine learning, and financial
              security.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              As Founder of <span className="text-cyan-300">SwiftPay Gateway</span> and a Cyber
              Crime Volunteer &amp; Intervention Officer at the{' '}
              <span className="text-slate-200">CyberSecurity Council of India</span>, I build
              digital products that are both intelligent and resilient against real-world abuse.
            </p>
          </div>

          {/* Interactive Tabbed Panel: Core Stack & Journey Timeline */}
          <div className="lg:col-span-7">
            <div className="glass-surface rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-100">
                    {activeTab === 'stack' ? 'Core Engineering Stack' : 'Milestone Timeline'}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-400">
                    {activeTab === 'stack'
                      ? 'Production tooling across neural networks, payment backends, and threat defense.'
                      : 'Key academic, entrepreneurial, and cybersecurity appointments.'}
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label="About details view"
                  className="inline-flex items-center gap-1 self-start rounded-xl border border-slate-800 bg-slate-950/70 p-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'stack'}
                    onClick={() => setActiveTab('stack')}
                    className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      activeTab === 'stack'
                        ? 'bg-cyan-400 text-slate-950'
                        : 'text-slate-300 hover:text-slate-100'
                    }`}
                  >
                    Core Stack
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'timeline'}
                    onClick={() => setActiveTab('timeline')}
                    className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      activeTab === 'timeline'
                        ? 'bg-cyan-400 text-slate-950'
                        : 'text-slate-300 hover:text-slate-100'
                    }`}
                  >
                    Journey Timeline
                  </button>
                </div>
              </div>

              {activeTab === 'stack' ? (
                <div
                  key="stack-panel"
                  className="mt-6 divide-y divide-slate-800/80 animate-[fadeIn_220ms_cubic-bezier(0.16,1,0.3,1)]"
                >
                  {TECHNICAL_ARSENAL.map((group) => (
                    <div
                      key={group.domain}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <span className="font-display text-sm font-semibold text-cyan-300 shrink-0 sm:w-44">
                        {group.domain}
                      </span>
                      <div className="text-sm text-slate-300 leading-relaxed">
                        {group.items.map((item, idx) => (
                          <span key={item}>
                            {item}
                            {idx < group.items.length - 1 && (
                              <span className="mx-2 text-slate-600" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ol
                  key="timeline-panel"
                  className="mt-6 space-y-4 animate-[fadeIn_220ms_cubic-bezier(0.16,1,0.3,1)]"
                >
                  {JOURNEY_TIMELINE.map((item) => (
                    <li
                      key={item.title}
                      className="flex flex-col gap-1 border-b border-slate-800/70 pb-3.5 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-5"
                    >
                      <span className="font-mono text-xs font-semibold text-emerald-300 tabular-nums shrink-0 sm:w-20">
                        {item.year}
                      </span>
                      <div>
                        <div className="font-display text-sm font-semibold text-slate-100">
                          {item.title}{' '}
                          <span className="font-normal text-slate-400">
                            · {item.organization}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>

        {/* Credentials & Leadership */}
        <div id="credentials" className="mt-20 pt-4 scroll-mt-24">
          <SplitWordHeading
            eyebrow="02. Verified Milestones"
            text="Academic, National & Leadership Credentials"
          />

          <div ref={credsRef} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {CREDENTIALS.map((cred, index) => {
              const Icon = CREDENTIAL_ICONS[index % CREDENTIAL_ICONS.length];
              const spot = spotlightPos[cred.id];

              return (
                <article
                  key={cred.id}
                  onPointerMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
                    const y = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
                    setSpotlightPos((prev) => ({ ...prev, [cred.id]: { x, y } }));
                  }}
                  onPointerLeave={() => {
                    setSpotlightPos((prev) => {
                      const next = { ...prev };
                      delete next[cred.id];
                      return next;
                    });
                  }}
                  style={{
                    opacity: credsVisible ? 1 : 0.2,
                    transform: credsVisible ? 'translateY(0px)' : 'translateY(14px)',
                    transitionProperty: 'opacity, transform, border-color, box-shadow',
                    transitionDuration: '420ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${index * 60}ms`,
                  }}
                  className="glass-surface glass-surface-hover relative overflow-hidden rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                >
                  {spot && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(34, 211, 238, 0.1), transparent 55%)`,
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-xs font-mono text-slate-400">
                        {cred.category} <span aria-hidden="true">·</span> {cred.period}
                      </div>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-cyan-300">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-semibold text-slate-50 leading-snug">
                      {cred.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-emerald-300">
                      {cred.organization}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {cred.description}
                    </p>
                  </div>

                  <p className="relative z-10 mt-5 border-t border-slate-800/80 pt-4 font-mono text-xs text-slate-400">
                    {cred.highlight}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
