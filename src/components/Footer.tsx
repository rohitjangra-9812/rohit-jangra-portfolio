import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050810] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-base font-semibold text-slate-100">
            {PROFILE.name}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            © 2026 {PROFILE.name} <span aria-hidden="true">·</span> {PROFILE.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-400">
          <a
            href="https://swift-pay-taupe.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            SwiftPay Gateway
          </a>
          <a
            href="https://carrergoalgps.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            Career Goal GPS
          </a>
          <a
            href={PROFILE.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            MySeera Portfolio
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-cyan-300 transition-colors"
          >
            Email
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
