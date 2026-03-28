'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { asset } from '@/lib/basePath';

export default function Hero() {
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const arrowHeadRef = useRef<SVGPathElement>(null);
  const arrowSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(greetingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo(illustrationRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
      .fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    // Draw the arrow path
    if (arrowPathRef.current) {
      const path = arrowPathRef.current;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      tl.to(path, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.3');
    }

    // Fade in arrowhead
    if (arrowHeadRef.current) {
      gsap.set(arrowHeadRef.current, { opacity: 0 });
      tl.to(arrowHeadRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '-=0.1');
    }
  }, []);

  const wiggleArrow = useCallback(() => {
    if (!arrowSvgRef.current) return;
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
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 ref={greetingRef} className="hero-greeting" style={{ opacity: 0 }}>Mooin!</h1>
          <p ref={textRef} className="hero-intro" style={{ opacity: 0 }}>
            I&apos;m Lilli and passionate about visual storytelling and vibrant illustrations.
          </p>
          <div ref={ctaRef} className="hero-cta-wrap" style={{ opacity: 0 }}>
            <p className="hero-subtitle">
              Let&apos;s{' '}
              <a
                href="#work"
                className="hero-inline-link"
                onClick={(e) => scrollTo(e, '#work')}
                onMouseEnter={wiggleArrow}
              >
                see some of my work
              </a>{' '}
              and{' '}
              <a
                href="#about"
                className="hero-inline-link"
                onClick={(e) => scrollTo(e, '#about')}
                onMouseEnter={wiggleArrow}
              >
                work on something meaningful
              </a>{' '}
              together!
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
        <div ref={illustrationRef} className="hero-illustration" style={{ opacity: 0 }}>
          <img
            src={asset('/hero-illustration.svg')}
            alt="Hand-drawn illustration of Lilli"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </section>
  );
}
