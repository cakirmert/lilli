'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gallerySize, illustrations, type IllustrationLayer, type IllustrationProject } from '@/data/illustrations';
import { asset } from '@/lib/basePath';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_HOLD_SECONDS = 1.25;

function artworkImageStyle(image: IllustrationLayer, frame: IllustrationLayer): CSSProperties {
  if (!image.crop) return { objectFit: image.fit };
  const [a, b, c, d, x, y] = image.crop;
  const determinant = a * d - b * c;
  // Invert Figma's sampling transform to position the original image in its frame.
  return {
    objectFit: 'fill',
    transformOrigin: '0 0',
    left: `${(c * y - d * x) / determinant * 100}%`,
    top: `${(b * x - a * y) / determinant * 100}%`,
    transform: `matrix(${d / determinant}, ${-b / determinant * frame.height / frame.width}, ${-c / determinant * frame.width / frame.height}, ${a / determinant}, 0, 0)`,
  };
}

function ArtworkCard({ project, reduceMotion, suspended, onOpen, onReveal }: {
  project: IllustrationProject;
  reduceMotion: boolean;
  suspended: boolean;
  onOpen: (project: IllustrationProject) => void;
  onReveal: (element: HTMLButtonElement) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverBlocked = useRef(false);
  const active = hovered && !suspended && !reduceMotion;
  const frontIndex = project.layers.length - 1;

  useEffect(() => {
    if (suspended) {
      hoverBlocked.current = true;
      setHovered(false);
    }
  }, [suspended]);

  useEffect(() => {
    if (!active || frontIndex === 0) return;
    const elements = Array.from(buttonRef.current?.querySelectorAll<HTMLElement>('.artwork-layer') ?? []);
    if (elements.length !== project.layers.length) return;

    const slotStyle = (slot: IllustrationLayer) => ({
      left: `${slot.x / project.width * 100}%`,
      top: `${slot.y / project.height * 100}%`,
      width: `${slot.width / project.width * 100}%`,
      height: `${slot.height / project.height * 100}%`,
    });
    let order = [...elements].reverse();
    let delay: gsap.core.Tween;
    let movement: gsap.core.Timeline | undefined;

    const cycle = () => {
      const outgoing = order[0];
      const nextOrder = [...order.slice(1), outgoing];
      movement = gsap.timeline({
        onComplete: () => {
          order = nextOrder;
          delay = gsap.delayedCall(SLIDE_HOLD_SECONDS, cycle);
        },
      });
      // Move the front sheet aside, then tuck it behind the advancing stack.
      // Each artwork keeps its own image element throughout the entire cycle.
      movement.to(outgoing, {
        xPercent: -12, yPercent: -6, rotation: -3, opacity: 0,
        duration: .32, ease: 'power2.inOut',
      });
      movement.add(() => {
        nextOrder.forEach((element, index) => gsap.set(element, { zIndex: frontIndex - index }));
      });
      nextOrder.forEach((element, index) => {
        movement!.to(element, {
          ...slotStyle(project.layers[frontIndex - index]),
          xPercent: 0, yPercent: 0, rotation: 0, opacity: 1,
          duration: .42, ease: 'power2.inOut',
        }, .32);
      });
    };

    delay = gsap.delayedCall(.55, cycle);
    return () => {
      delay.kill();
      movement?.kill();
      elements.forEach((element, index) => gsap.set(element, {
        ...slotStyle(project.layers[index]), zIndex: index, clearProps: 'transform,opacity',
      }));
    };
  }, [active, frontIndex, project]);

  const style = {
    '--art-x': `${project.x / gallerySize.width * 100}%`,
    '--art-y': `${project.y / gallerySize.height * 100}%`,
    '--art-width': `${project.width / gallerySize.width * 100}%`,
    '--art-height': `${project.height / gallerySize.height * 100}%`,
    '--art-aspect': `${project.width} / ${project.height}`,
  } as CSSProperties;

  return (
    <div className={`artwork-card artwork-card--${project.slug}`} style={style}
      onPointerEnter={event => {
        if (event.pointerType !== 'touch' && !suspended && !hoverBlocked.current) setHovered(true);
      }}
      onPointerMove={event => {
        if (event.pointerType !== 'touch' && !suspended && (event.movementX || event.movementY)) {
          hoverBlocked.current = false;
          setHovered(true);
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
        if (!suspended) hoverBlocked.current = false;
      }}>
      <button ref={buttonRef} type="button" className="artwork-open" aria-label={`Open project ${project.title}`}
        onClick={() => {
          hoverBlocked.current = true;
          setHovered(false);
          onOpen(project);
        }}
        onFocus={event => onReveal(event.currentTarget)}>
        {project.layers.map((layer, index) => {
          const isAnimated = Boolean(project.animatedSrc) && !paused && !reduceMotion;
          return (
            <span className="artwork-layer" key={layer.nodeId} data-figma-node={layer.nodeId}
              style={{ left: `${layer.x / project.width * 100}%`, top: `${layer.y / project.height * 100}%`, width: `${layer.width / project.width * 100}%`, height: `${layer.height / project.height * 100}%`, zIndex: index }}>
              <Image src={asset(isAnimated ? project.animatedSrc! : layer.src)} alt={index === frontIndex ? project.title : ''}
                fill sizes="(max-width: 799px) 85vw, 55vh" style={artworkImageStyle(layer, layer)}
                priority={project.slug === 'editorial-illustration' || project.slug === 'poster-design'} />
            </span>
          );
        })}
      </button>
      {project.animatedSrc && !reduceMotion ? (
        <button type="button" className="animation-toggle" aria-label={paused ? 'Play holiday card animation' : 'Pause holiday card animation'}
          aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          {paused ? 'Play' : 'Pause'}
        </button>
      ) : null}
    </div>
  );
}

function ProjectDetail({ project, onClose, reduceMotion }: { project: IllustrationProject; onClose: () => void; reduceMotion: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(!reduceMotion);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-title" onClose={onClose}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialogRef.current?.close();
      }}>
      <header className="project-dialog-header">
        <h2 id="project-title">{project.title}</h2>
        <button type="button" className="project-detail-close" onClick={() => dialogRef.current?.close()} aria-label="Close project">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div className="project-detail-images">
        {project.animatedSrc && !reduceMotion ? (
          <button type="button" className="detail-animation-toggle" onClick={() => setPlaying(value => !value)}>{playing ? 'Pause animation' : 'Play animation'}</button>
        ) : null}
        {[...project.layers].reverse().map((layer, index) => (
          <Image key={layer.nodeId} src={asset(project.animatedSrc && playing && !reduceMotion ? project.animatedSrc : layer.src)}
            alt={`${project.title} — artwork ${index + 1}`} width={layer.imageWidth} height={layer.imageHeight}
            sizes="(max-width: 799px) 90vw, 80vw" />
        ))}
      </div>
    </dialog>
  );
}

export default function Projects() {
  const [openProject, setOpenProject] = useState<IllustrationProject | null>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!section || !viewport || !canvas) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 800px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, canvas.offsetWidth - viewport.clientWidth);
      viewport.classList.add('is-pinned');
      viewport.scrollLeft = 0;
      gsap.to(canvas, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          id: 'work-gallery', trigger: section, start: 'top top', end: () => `+=${distance()}`,
          pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });
      const resize = new ResizeObserver(() => ScrollTrigger.refresh());
      resize.observe(viewport);
      return () => { resize.disconnect(); viewport.classList.remove('is-pinned'); };
    });

    const reset = () => {
      const trigger = ScrollTrigger.getById('work-gallery');
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      viewport.scrollTo({ left: 0, behavior });
      window.scrollTo({ top: trigger?.start ?? section.offsetTop, behavior });
    };
    window.addEventListener('portfolio:reset-work-gallery', reset);
    return () => { window.removeEventListener('portfolio:reset-work-gallery', reset); media.revert(); };
  }, []);

  const revealProject = useCallback((button: HTMLButtonElement) => {
    const trigger = ScrollTrigger.getById('work-gallery');
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    const card = button.closest<HTMLElement>('.artwork-card') ?? button;
    if (!trigger || !canvas || !viewport || !card) return;
    // Focusing an offscreen button can scroll its overflow container before this event.
    viewport.scrollLeft = 0;
    const rect = button.getBoundingClientRect();
    if (rect.left >= 0 && rect.right <= viewport.clientWidth) return;
    const distance = canvas.offsetWidth - viewport.clientWidth;
    const offset = Math.min(distance, Math.max(0, card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2));
    window.scrollTo({ top: trigger.start + offset, behavior: 'instant' });
    trigger.update();
    trigger.getTween()?.progress(1);
  }, []);

  const keepScrolling = () => {
    const trigger = ScrollTrigger.getById('work-gallery');
    if (trigger) {
      window.scrollTo({ top: Math.min(trigger.end, window.scrollY + window.innerWidth * 0.75), behavior: 'smooth' });
    } else if (window.innerWidth >= 800) {
      viewportRef.current?.scrollBy({ left: window.innerWidth * 0.75, behavior: reduceMotion ? 'auto' : 'smooth' });
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <>
      <section id="work" ref={sectionRef} className="projects-section" aria-label="Selected illustration projects">
        <h1 className="sr-only">Lilli Schröder — Graphic designer and illustrator</h1>
        <div ref={viewportRef} className="projects-viewport">
          <div ref={canvasRef} className="projects-canvas">
            {illustrations.map(project => <ArtworkCard key={project.id} project={project} reduceMotion={reduceMotion} suspended={Boolean(openProject)} onOpen={setOpenProject} onReveal={revealProject} />)}
            <button type="button" className="scroll-cue" onClick={keepScrolling}
              onFocus={event => revealProject(event.currentTarget)} aria-label="Keep scrolling through the illustrations">
              <span className="scroll-cue-arrow"><Image src={asset('/illustrations/scroll-arrow.svg')} alt="" width={185} height={105} /></span>
              <span>keep scrolling! :)</span>
            </button>
          </div>
        </div>
      </section>
      {openProject ? <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} reduceMotion={reduceMotion} /> : null}
    </>
  );
}
