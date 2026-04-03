'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '@/data/projects';
import { asset } from '@/lib/basePath';

gsap.registerPlugin(ScrollTrigger);

type Category = 'All' | 'Design' | 'Illustration';

function ProjectCard({
  project,
  index,
  setRef,
  onOpen,
}: {
  project: Project;
  index: number;
  setRef: (el: HTMLDivElement | null, i: number) => void;
  onOpen: (project: Project) => void;
}) {
  return (
    <div
      ref={(el) => setRef(el, index)}
      className="project-card"
      style={{ cursor: 'pointer', opacity: 0 }}
      onClick={() => onOpen(project)}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
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
          <p className="card-overlay-cat">{project.category}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
    );
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, { opacity: 0, y: 40, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.1,
      onComplete: onClose,
    });
  };

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
            <span className="project-detail-category">{project.category}</span>
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
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const setItemRef = useCallback((el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el;
  }, []);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );
    }
  }, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filteredProjects.length);
    const timer = setTimeout(() => {
      const items = itemRefs.current.filter(Boolean);
      gsap.fromTo(items,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.06 }
      );
    }, 50);
    return () => clearTimeout(timer);
  }, [activeFilter, filteredProjects.length]);

  const handleFilter = (category: Category) => {
    if (category === activeFilter) return;
    const items = itemRefs.current.filter(Boolean);
    gsap.to(items, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.25,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => setActiveFilter(category),
    });
  };

  return (
    <>
      <section id="work" ref={sectionRef} className="projects-section">
        <div ref={headingRef} style={{ opacity: 0, marginBottom: '32px' }}>
          <h2 className="projects-heading">Projects</h2>

          <div style={{ display: 'flex', gap: '32px' }}>
            {(['All', 'Design', 'Illustration'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'filter-btn--active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              setRef={setItemRef}
              onOpen={setOpenProject}
            />
          ))}
        </div>
      </section>

      {openProject && (
        <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </>
  );
}
