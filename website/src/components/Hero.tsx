'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { asset } from '@/lib/basePath';

export default function Hero() {
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(greetingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(illustrationRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
      .fromTo(arrowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3');
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 ref={greetingRef} className="hero-greeting" style={{ opacity: 0 }}>Mooin!</h1>
          <p ref={textRef} className="hero-intro" style={{ opacity: 0 }}>
            I&apos;m Lilli and passionate about visual storytelling and vibrant illustrations.
          </p>
          <p ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
            Let&apos;s see some of my projects and<br />
            work on something meaningful together!
          </p>
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
      <div ref={arrowRef} className="hero-arrow" style={{ opacity: 0 }}>
        <svg viewBox="0 0 50 60" fill="none" style={{ width: 36, height: 44 }}>
          <path
            d="M25 5 C22 18 20 30 25 48 M25 48 C22 42 17 39 12 37 M25 48 C28 42 33 39 38 37"
            stroke="var(--color-blue)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
