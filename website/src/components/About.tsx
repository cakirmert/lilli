'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/basePath';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' }
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div ref={contentRef} className="about-content" style={{ opacity: 0 }}>
        <div className="about-photo-wrap">
          <div className="about-photo">
            <img
              src={asset('/lilli-portrait.png')}
              alt="Lilli Schröder"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>
        <div className="about-text">
          <h2 className="about-heading">
            Graphic designer and illustrator based in Hamburg with a passion for analogue techniques and visual storytelling.
          </h2>
          <div className="about-contact">
            <h3 className="about-say-hi">Let&apos;s work together</h3>
            <a href="mailto:hello@lilli-schroeder.de" className="about-email">
              hello@lilli-schroeder.de
            </a>
            <div className="about-socials">
              <a href="https://www.linkedin.com/in/lilli-sophie-schr%C3%B6der-54a0ba223" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/simpli_lilli/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://www.behance.net/lillischrder" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 2.99 0 4.97 1.882 4.97 5.564 0 .467-.044.94-.044.94h-7.37c.15 2.04 1.775 2.698 3.376 2.698 1.627 0 2.467-.726 2.864-1.608h1.403zm-2.76-4.42c-.07-1.63-1.06-2.42-2.48-2.42-1.52 0-2.45.87-2.66 2.42h5.14zM8.85 19.5H1V4.5h7.2c2.61 0 4.1 1.38 4.1 3.54 0 1.47-.78 2.48-1.92 2.98 1.48.4 2.42 1.62 2.42 3.29 0 2.5-1.77 5.19-3.95 5.19zM7.55 8.1H4.4v3.3h2.9c1.18 0 2.05-.53 2.05-1.73 0-1.1-.72-1.57-1.8-1.57zm.25 5.5H4.4v3.6h3.5c1.22 0 2.01-.67 2.01-1.85 0-1.22-.9-1.75-2.11-1.75z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
