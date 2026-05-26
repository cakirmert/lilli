'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { asset } from '@/lib/basePath';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

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
      [greetingRef, introRef, illustrationRef].forEach(ref => {
        if (ref.current) {
          ref.current.style.visibility = 'hidden';
          ref.current.style.transform = '';
          ref.current.style.clipPath = '';
        }
      });
    };
  }, []);

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
