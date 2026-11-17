import { ArrowRight, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';
import { HERO_STATS, PROFILE } from '../data/portfolioData';
import { ParticleWaveCanvas } from './ParticleWaveCanvas';
import { GlitchShimmerHeading, TypewriterRoles } from './KineticText';

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-800/70 bg-[#060911]"
    >
      {/* Dynamic Particle-Network & Geometric Wave Canvas */}
      <ParticleWaveCanvas />

      {/* Subtle top-to-bottom readability scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060911]/35 via-transparent to-[#060911]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 lg:pt-24 lg:pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Typographic Anchor */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="mb-4 font-mono text-xs sm:text-sm font-medium text-slate-400">
                {PROFILE.degree} <span aria-hidden="true">·</span> {PROFILE.university} <span aria-hidden="true">·</span> {PROFILE.location}
              </p>

              <GlitchShimmerHeading
                text={PROFILE.name}
                className="text-4xl sm:text-5xl lg:text-6xl"
              />

              <div className="mt-4">
                <TypewriterRoles roles={PROFILE.typewriterRoles} />
              </div>

              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
                {PROFILE.heroLead}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-cyan-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060911]"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/75 px-6 py-3 text-sm font-semibold text-slate-100 transition-colors duration-150 hover:border-cyan-400/60 hover:text-cyan-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Hire / Contact Me</span>
              </a>

              <a
                href={PROFILE.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="kinetic-underline inline-flex min-h-[44px] items-center gap-1.5 px-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-300 whitespace-nowrap shrink-0"
              >
                <span>MySeera Profile</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Architectural Profile Card (Matched Height) */}
          <div className="lg:col-span-5 flex">
            <div className="glass-surface glass-surface-hover flex w-full flex-col justify-between rounded-2xl p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                    <span className="font-mono text-xs font-medium text-slate-300">
                      Engineering Brief
                    </span>
                  </div>
                  <span className="font-mono text-xs text-emerald-400">
                    Bhiwani, IN
                  </span>
                </div>

                <h2 className="mt-5 font-display text-xl font-semibold text-slate-50">
                  Fintech Systems, Applied AI & Cyber Defense
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  Bridging deterministic payment infrastructure with deep-learning models and real-world cybercrime intervention workflows.
                </p>

                <dl className="mt-6 space-y-3.5 border-t border-slate-800/80 pt-5 text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-slate-400">Venture</dt>
                    <dd className="text-right font-medium text-slate-100">
                      Founder, SwiftPay Gateway
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-slate-400">Security Role</dt>
                    <dd className="text-right font-medium text-slate-100">
                      Intervention Officer, CSCI
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-slate-400">Pitch Honor</dt>
                    <dd className="text-right font-medium text-slate-100">
                      BITSoM Vertex 2026 Finalist
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-slate-400">Certification</dt>
                    <dd className="text-right font-medium text-slate-100">
                      ISRO Certified Technologist
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  Open to Internships & Fintech Builds
                </span>
                <a
                  href="#projects"
                  className="font-mono text-cyan-300 hover:text-cyan-200 whitespace-nowrap"
                >
                  Explore Work
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quick Stats Row Below Hero Split */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-slate-800/80 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800/70 bg-slate-900/40 px-5 py-4"
            >
              <div className="font-display text-2xl font-bold tracking-tight text-slate-50 tabular-nums">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-cyan-300">
                {stat.label}
              </div>
              <div className="mt-0.5 text-xs text-slate-400">{stat.context}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
