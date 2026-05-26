'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '@/data/projects';
import { asset } from '@/lib/basePath';

gsap.registerPlugin(ScrollTrigger);

const homepageProjects = projects.filter((project) => project.slug !== 'poster-for-exhibition');

function ProjectCard({
  project,
  index,
  setRef,
  onOpen,
}: {
  project: Project;
  index: number;
  setRef: (el: HTMLButtonElement | null, i: number) => void;
  onOpen: (project: Project) => void;
}) {
  return (
    <button
      type="button"
      ref={(el) => setRef(el, index)}
      className={`project-card project-card--${project.slug}`}
      style={{ opacity: 0 }}
      aria-label={`Open project ${project.title}`}
      onClick={() => onOpen(project)}
      onMouseEnter={(e) => {
        const inner = e.currentTarget.querySelector('.project-card-inner');
        if (inner) {
          gsap.to(inner, { scale: 1.025, duration: 0.3, ease: 'power2.out' });
        }
      }}
      onMouseLeave={(e) => {
        const inner = e.currentTarget.querySelector('.project-card-inner');
        if (inner) {
          gsap.to(inner, { scale: 1, duration: 0.3, ease: 'power2.out' });
        }
      }}
    >
      <div className="project-card-inner">
        <img
          src={asset(project.images[0])}
          alt={project.title}
          className="project-card-img"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="card-overlay">
          <p className="card-overlay-title">{project.title}</p>
        </div>
      </div>
    </button>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    gsap.to(contentRef.current, { opacity: 0, y: 40, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.1,
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  return (
    <div
      ref={overlayRef}
      className="project-detail-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div ref={contentRef} className="project-detail-content">
        <button className="project-detail-close" onClick={handleClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="project-detail-body">
          <div className="project-detail-images">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={asset(img)}
                alt={`${project.title} ${i + 1}`}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
              />
            ))}
          </div>
          <div className="project-detail-info">
            <h2 className="project-detail-title">{project.title}</h2>
            {project.description && (
              <p className="project-detail-desc">{project.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setItemRef = useCallback((el: HTMLButtonElement | null, index: number) => {
    itemRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const grid = gridRef.current;
    if (!section || !viewport || !grid) return;

    const media = gsap.matchMedia();

    media.add('(min-width: 640px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => Math.max(0, grid.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(grid, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'work-gallery',
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(getDistance() * 0.55, window.innerHeight * 0.65)}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('resize', refresh);
      const timer = window.setTimeout(refresh, 150);

      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('resize', refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(grid, { clearProps: 'transform' });
      };
    });

    return () => {
      media.revert();
      gsap.set(grid, { clearProps: 'transform' });
    };
  }, []);

  useEffect(() => {
    const resetWorkGallery = () => {
      const section = sectionRef.current;
      if (!section) return;

      ScrollTrigger.refresh();

      const trigger = ScrollTrigger.getById('work-gallery');
      const targetTop = trigger?.start ?? section.getBoundingClientRect().top + window.scrollY;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    };

    window.addEventListener('portfolio:reset-work-gallery', resetWorkGallery);
    return () => window.removeEventListener('portfolio:reset-work-gallery', resetWorkGallery);
  }, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, homepageProjects.length);
    const timer = setTimeout(() => {
      const items = itemRefs.current.filter(Boolean);
      gsap.fromTo(items,
        { opacity: 0 },
        { opacity: 1, duration: 0.65, ease: 'power2.out', stagger: 0.055 }
      );
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section id="work" ref={sectionRef} className="projects-section">
        <div ref={viewportRef} className="projects-viewport">
          <div ref={gridRef} className="projects-grid" aria-label="Selected projects">
            {homepageProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                setRef={setItemRef}
                onOpen={setOpenProject}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="projects-after">
        <a
          href="https://www.behance.net/lillischrder"
          target="_blank"
          rel="noopener noreferrer"
          className="projects-behance-link"
        >
          More on Behance
        </a>
      </div>

      {openProject && (
        <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </>
  );
}
