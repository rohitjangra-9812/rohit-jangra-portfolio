import { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/portfolioData';
import { filterProjects } from '../utils/portfolioLogic';
import { SplitWordHeading } from './KineticText';
import { TiltProjectCard } from './TiltProjectCard';

const CATEGORIES: ProjectCategory[] = ['All', 'Fintech', 'AI & ML', 'Cybersecurity'];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects = filterProjects(PROJECTS, activeCategory);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="border-b border-slate-800/70 py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SplitWordHeading
              eyebrow="03. Selected Systems"
              text="Featured Projects & Live Builds"
            />
            <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-400">
              Interactive fintech infrastructure, neural sequence models, and cyber defense
              systems built for production clarity.
            </p>
          </div>

          {/* Interactive Category Filter Segmented Control */}
          <div
            role="group"
            aria-label="Filter projects by domain"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/75 p-1 self-start md:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-5 font-mono text-xs text-slate-400 tabular-nums" data-testid="project-count">
          Showing {visibleProjects.length} of {PROJECTS.length} systems
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <TiltProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Case Study Architecture Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-surface relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <p className="font-mono text-xs text-cyan-300">
                  {selectedProject.category} <span aria-hidden="true">·</span>{' '}
                  {selectedProject.year} <span aria-hidden="true">·</span>{' '}
                  {selectedProject.role}
                </p>
                <h3
                  id="modal-project-title"
                  className="mt-1.5 font-display text-2xl font-bold text-slate-50"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.imageAlt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-200">
                {selectedProject.summary}
              </p>

              {/* System Pipeline Flow */}
              <div className="mt-6 rounded-xl border border-slate-800/80 bg-slate-950/70 p-4">
                <h4 className="font-mono text-xs font-medium text-slate-400">
                  Execution Pipeline Flow
                </h4>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {selectedProject.pipelineStages.map((stage, idx) => (
                    <div key={stage} className="flex items-center gap-2">
                      <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-medium text-cyan-200">
                        {stage}
                      </span>
                      {idx < selectedProject.pipelineStages.length - 1 && (
                        <span className="font-mono text-xs text-emerald-400" aria-hidden="true">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-display text-sm font-semibold text-cyan-300">
                  Architecture &amp; Engineering Highlights
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedProject.architecture.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-800 pt-4">
                <div className="font-mono text-xs text-slate-400">
                  Stack: {selectedProject.stack.join(' · ')}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="min-h-[42px] rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-500"
                >
                  Close
                </button>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                  >
                    <span>{selectedProject.liveLabel ?? 'Open Live Deployment'}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
