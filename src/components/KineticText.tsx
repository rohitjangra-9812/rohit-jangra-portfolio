import { useEffect, useState } from 'react';
import { useReveal } from '../utils/useReveal';

interface GlitchShimmerHeadingProps {
  text: string;
  className?: string;
}

export function GlitchShimmerHeading({ text, className = '' }: GlitchShimmerHeadingProps) {
  return (
    <h1
      className={`shimmer-name font-display font-bold tracking-tight leading-[1.06] text-balance ${className}`}
    >
      {text}
    </h1>
  );
}

interface TypewriterRolesProps {
  roles: string[];
  className?: string;
}

export function TypewriterRoles({ roles, className = '' }: TypewriterRolesProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState(roles[0] ?? '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || roles.length === 0) {
      setDisplayed(roles[0] ?? '');
      return;
    }

    const currentRole = roles[roleIndex % roles.length];
    let timeoutId: number;

    if (!isDeleting && displayed === currentRole) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 2100);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextLength = displayed.length + (isDeleting ? -1 : 1);
      const speed = isDeleting ? 34 : 58;
      timeoutId = window.setTimeout(() => {
        setDisplayed(currentRole.slice(0, nextLength));
      }, speed);
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayed, isDeleting, roleIndex, roles]);

  return (
    <div
      className={`font-mono text-base sm:text-lg font-medium text-cyan-300 min-h-[1.75rem] flex items-center ${className}`}
      aria-live="polite"
      data-testid="typewriter-role"
    >
      <span>{displayed}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-5 w-[2px] bg-emerald-400 animate-pulse"
      />
    </div>
  );
}

interface SplitWordHeadingProps {
  text: string;
  eyebrow?: string;
  className?: string;
}

export function SplitWordHeading({ text, eyebrow, className = '' }: SplitWordHeadingProps) {
  const words = text.split(' ');
  const { ref, isVisible } = useReveal<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className={className}>
      {eyebrow && (
        <p className="mb-2 font-mono text-xs font-medium tracking-wider text-cyan-400">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-50 text-balance">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            style={{
              opacity: isVisible ? 1 : 0.15,
              transform: isVisible ? 'translateY(0px)' : 'translateY(10px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '420ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${index * 45}ms`,
            }}
            className="mr-[0.28em] inline-block kinetic-underline cursor-default"
          >
            {word}
          </span>
        ))}
      </h2>
    </div>
  );
}
