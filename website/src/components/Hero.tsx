'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { asset } from '@/lib/basePath';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const arrowHeadRef = useRef<SVGPathElement>(null);
  const arrowSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let tl: gsap.core.Timeline;
    let st: ScrollTrigger | undefined;
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      tl = gsap.timeline();

      // 1. "Mooin!" — chars rise up softly
      if (greetingRef.current) {
        greetingRef.current.style.visibility = 'visible';
        const split = SplitText.create(greetingRef.current, { type: 'chars' });
        tl.from(split.chars, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        });
      }

      // 2. Intro — words appear one by one, gentle rise
      if (introRef.current) {
        introRef.current.style.visibility = 'visible';
        const split = SplitText.create(introRef.current, { type: 'words' });
        tl.from(split.words, {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
        }, '-=0.2');
      }

      // 3. Illustration — soft fade in
      if (illustrationRef.current) {
        illustrationRef.current.style.visibility = 'visible';
        tl.fromTo(illustrationRef.current,
          { opacity: 0, scale: 0.9, transformOrigin: '50% 50%' },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', clearProps: 'transform,opacity' },
          '-=1.0'
        );
      }

      // 4. Subtitle — fade up
      if (ctaRef.current) {
        ctaRef.current.style.visibility = 'visible';
        tl.from(ctaRef.current, {
          y: 12,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6');
      }

      // 5. Arrow draw-on
      if (arrowPathRef.current) {
        const path = arrowPathRef.current;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, '-=0.4');
      }

      if (arrowHeadRef.current) {
        gsap.set(arrowHeadRef.current, { opacity: 0 });
        tl.to(arrowHeadRef.current, { opacity: 1, duration: 0.3 }, '-=0.1');
      }

      // ScrollTrigger: parallax on illustration
      if (illustrationRef.current) {
        st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          animation: gsap.to(illustrationRef.current, { y: -60, ease: 'none' }),
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tl) tl.kill();
      if (st) st.kill();
      // Reset inline styles on cleanup so re-run works
      [greetingRef, introRef, ctaRef, illustrationRef].forEach(ref => {
        if (ref.current) {
          ref.current.style.visibility = 'hidden';
          ref.current.style.transform = '';
          ref.current.style.clipPath = '';
        }
      });
    };
  }, []);

  const wiggleArrow = useCallback(() => {
    if (!arrowSvgRef.current) return;
    gsap.killTweensOf(arrowSvgRef.current);
    gsap.to(arrowSvgRef.current, {
      rotation: 8,
      scale: 1.1,
      duration: 0.15,
      ease: 'power2.out',
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        gsap.to(arrowSvgRef.current, { rotation: 0, scale: 1, duration: 0.2, ease: 'power2.out' });
      },
    });
  }, []);

  const scrollTo = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 ref={greetingRef} className="hero-greeting" style={{ visibility: 'hidden' }}>
            Hi there!
          </h1>
          <p ref={introRef} className="hero-intro" style={{ visibility: 'hidden' }}>
            I&apos;m Lilli and passionate about visual storytelling and vibrant illustrations.
          </p>
          <div ref={ctaRef} className="hero-cta-wrap" style={{ visibility: 'hidden' }}>
            <p className="hero-subtitle">
              Let&apos;s{' '}
              <a
                href="#work"
                className="hero-inline-link"
                onClick={(e) => scrollTo(e, '#work')}
                onMouseEnter={wiggleArrow}
              >
                see some of my work
              </a>.
            </p>
            <svg
              ref={arrowSvgRef}
              className="hero-loop-arrow"
              viewBox="0 0 120 140"
              fill="none"
              aria-hidden="true"
            >
              <path
                ref={arrowPathRef}
                d="M10 5 C5 20, 2 45, 20 60 C38 75, 58 70, 60 52 C62 34, 45 22, 30 32 C15 42, 12 65, 30 90 C42 107, 58 120, 80 130"
                stroke="var(--color-blue)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                ref={arrowHeadRef}
                d="M74 124 L82 132 L72 130"
                stroke="var(--color-blue)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
        <div ref={illustrationRef} className="hero-illustration" style={{ visibility: 'hidden' }}>
          <img
            src={asset('/hero-illustration.svg')}
            alt="Hand-drawn illustration of Lilli"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  );
}
