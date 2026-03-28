'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { asset } from '@/lib/basePath';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const arrowHeadRef = useRef<SVGPathElement>(null);
  const arrowSvgRef = useRef<SVGSVGElement>(null);
  const link1Ref = useRef<HTMLAnchorElement>(null);
  const link2Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let tl: gsap.core.Timeline;
    let st: ScrollTrigger | undefined;
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      tl = gsap.timeline();

      // 1. "Mooin!" — chars grow up gently from baseline
      if (greetingRef.current) {
        greetingRef.current.style.visibility = 'visible';
        const split = SplitText.create(greetingRef.current, { type: 'chars' });
        tl.from(split.chars, {
          scaleY: 0,
          transformOrigin: '50% 100%',
          duration: 0.8,
          stagger: 0.06,
          ease: 'elastic.out(1, 0.5)',
        });
      }

      // 2. Intro — clip-path line reveal (smooth wipe)
      if (introRef.current) {
        introRef.current.style.visibility = 'visible';
        const split = SplitText.create(introRef.current, {
          type: 'lines',
          linesClass: 'hero-line',
        });
        tl.from(split.lines, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.0,
          stagger: 0.2,
          ease: 'power3.inOut',
        }, '-=0.3');
      }

      // 3. Illustration — gentle scale in
      if (illustrationRef.current) {
        illustrationRef.current.style.visibility = 'visible';
        tl.fromTo(illustrationRef.current,
          { scale: 0.3, opacity: 0, transformOrigin: '50% 100%' },
          { scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.2)', clearProps: 'transform,opacity' },
          '-=0.8'
        );
      }

      // 4. Subtitle — clip reveal
      if (ctaRef.current) {
        ctaRef.current.style.visibility = 'visible';
        tl.fromTo(ctaRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', clearProps: 'clipPath' },
          '-=0.5'
        );
      }

      // Scramble link texts — slower, gentler reveal
      const link1Text = link1Ref.current?.textContent || 'see some of my work';
      const link2Text = link2Ref.current?.textContent || 'work on something meaningful';

      if (link1Ref.current) {
        tl.to(link1Ref.current, {
          duration: 1.5,
          scrambleText: { text: link1Text, chars: 'lowerCase', speed: 0.3, revealDelay: 0.5 },
        }, '-=0.2');
      }

      if (link2Ref.current) {
        tl.to(link2Ref.current, {
          duration: 1.5,
          scrambleText: { text: link2Text, chars: 'lowerCase', speed: 0.3, revealDelay: 0.5 },
        }, '-=1.0');
      }

      // 5. Arrow draw-on — smooth and slow
      if (arrowPathRef.current) {
        const path = arrowPathRef.current;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, '-=0.6');
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
            Mooin!
          </h1>
          <p ref={introRef} className="hero-intro" style={{ visibility: 'hidden' }}>
            I&apos;m Lilli and passionate about visual storytelling and vibrant illustrations.
          </p>
          <div ref={ctaRef} className="hero-cta-wrap" style={{ visibility: 'hidden' }}>
            <p className="hero-subtitle">
              Let&apos;s{' '}
              <a
                ref={link1Ref}
                href="#work"
                className="hero-inline-link"
                onClick={(e) => scrollTo(e, '#work')}
                onMouseEnter={wiggleArrow}
              >
                see some of my work
              </a>{' '}
              and{' '}
              <a
                ref={link2Ref}
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
