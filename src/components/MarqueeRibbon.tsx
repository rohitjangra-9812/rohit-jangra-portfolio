import { MARQUEE_ITEMS } from '../data/portfolioData';

export function MarqueeRibbon() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      aria-hidden="true"
      className="marquee-wrapper overflow-hidden border-b border-slate-800/70 bg-[#070b14] py-3.5 select-none"
    >
      <div className="marquee-track items-center gap-6">
        {items.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-6 whitespace-nowrap font-mono text-xs tracking-wider text-slate-400"
          >
            <span className="transition-colors hover:text-cyan-300">{item}</span>
            <span className="text-cyan-500/60">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
