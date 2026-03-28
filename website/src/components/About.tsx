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
            Lilli is a graphic designer and illustrator based in Hamburg with a passion for analogue techniques and visual storytelling.
          </h2>
          <p className="about-bio">
            Through an intuitive and experimental approach, she embraces chance and imperfection to create unexpected visual narratives. As an illustrator, she approaches the world with curiosity and care, bringing personal and socially relevant themes to the page. Her process is rooted in observation, empathy, and a playful approach to visual form.
          </p>
          <div className="about-contact">
            <h3 className="about-say-hi">Say hi!</h3>
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
                  <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.609.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.62.16-1.26.25-1.92.25H0v-15.03h6.938zm-.36 6.17c.64 0 1.17-.15 1.58-.46.41-.31.615-.79.615-1.43 0-.37-.07-.67-.21-.9a1.49 1.49 0 00-.56-.56 2.21 2.21 0 00-.79-.27 4.3 4.3 0 00-.94-.09H3.19v3.71h3.39zm.19 6.46c.36 0 .7-.04 1.02-.11.32-.08.6-.21.84-.39s.43-.42.57-.72c.13-.29.2-.67.2-1.12 0-.88-.25-1.52-.74-1.92-.49-.39-1.14-.59-1.95-.59H3.19v4.85h3.58zM21.054 18.15c.535-.66.806-1.52.806-2.58h-6.79c0 .42.06.82.19 1.18.13.36.33.67.59.93.26.26.58.46.94.61.36.15.78.22 1.24.22.65 0 1.18-.15 1.6-.46.42-.31.72-.68.9-1.1h2.76c-.45 1.28-1.15 2.24-2.1 2.87-.95.63-2.1.95-3.45.95-.93 0-1.78-.16-2.54-.48a5.56 5.56 0 01-1.93-1.36 6.07 6.07 0 01-1.22-2.1c-.28-.82-.43-1.72-.43-2.7 0-.94.14-1.82.43-2.63a6.08 6.08 0 011.24-2.12 5.76 5.76 0 011.95-1.42 6.08 6.08 0 012.55-.52c1.01 0 1.91.19 2.69.58.78.39 1.44.92 1.96 1.58.52.67.9 1.44 1.15 2.33.24.88.33 1.82.27 2.81h-8.56c0 1.07.27 1.93.81 2.59zM20.3 11.27c-.41-.55-1.04-.83-1.88-.83-.55 0-1.01.09-1.37.29-.36.19-.65.43-.87.72-.22.28-.37.59-.47.92-.09.33-.15.63-.17.92h5.39c-.12-.87-.42-1.56-.83-2.02h.2zM15.607 4.2h5.88v1.46h-5.88V4.2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
