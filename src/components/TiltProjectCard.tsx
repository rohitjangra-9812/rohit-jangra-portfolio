import { useRef, useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { computeTiltTransform, type TiltTransform } from '../utils/portfolioLogic';

interface TiltProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

const DEFAULT_TILT: TiltTransform = {
  rotateX: 0,
  rotateY: 0,
  glareX: 50,
  glareY: 50,
};

export function TiltProjectCard({ project, onSelect }: TiltProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [tilt, setTilt] = useState<TiltTransform>(DEFAULT_TILT);
  const [isHovered, setIsHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    setTilt(computeTiltTransform(relX, relY, 6.5));
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt(DEFAULT_TILT);
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      data-testid={`project-card-${project.id}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.012, 1.012, 1.012)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered
          ? 'transform 90ms ease-out'
          : 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="glass-surface relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 transition-colors duration-200 hover:border-cyan-400/45 will-change-transform"
    >
      {/* Dynamic Cursor Specular Glare */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(34, 211, 238, 0.13), transparent 55%)`,
        }}
      />

      {/* 4:3 Project Visual with Zero-Broken-Image Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-slate-800/80 bg-slate-900">
        {!imgFailed ? (
          <img
            src={project.imageUrl}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 ease-out"
            style={{
              transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0b172a] to-slate-950 p-6 text-center">
            <Layers className="h-8 w-8 text-cyan-400/80" aria-hidden="true" />
            <span className="mt-3 font-display text-base font-semibold text-slate-200">
              {project.title}
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060911]/85 via-transparent to-transparent"
        />
      </div>

      {/* Card Body */}
      <div className="relative z-20 flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="font-mono text-xs text-cyan-300">
            {project.category} <span className="text-slate-600" aria-hidden="true">·</span>{' '}
            <span className="text-slate-400 tabular-nums">{project.year}</span>{' '}
            <span className="text-slate-600" aria-hidden="true">·</span>{' '}
            <span className="text-slate-400">{project.role}</span>
          </div>

          <h3 className="mt-2.5 font-display text-xl font-bold text-slate-50">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-emerald-300/95">
            {project.subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {project.summary}
          </p>

          <p className="mt-4 font-mono text-xs leading-relaxed text-slate-400">
            {project.stack.join(' · ')}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-100 transition-colors duration-150 hover:border-cyan-400/60 hover:text-cyan-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Inspect Architecture
          </button>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.liveLabel ?? project.title} (opens in new tab)`}
              className="kinetic-underline inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:text-cyan-200 whitespace-nowrap"
            >
              <span>Live App</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : (
            <span className="font-mono text-xs text-slate-500">
              {project.impactMetric}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
