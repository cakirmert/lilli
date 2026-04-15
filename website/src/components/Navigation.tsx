'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { asset } from '@/lib/basePath';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100 && currentY > lastScrollY.current) {
        setHidden(true);
        setMenuOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
    }
  }, [menuOpen]);

  // Magnetic hover effect for desktop nav links
  const handleLinkMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(link, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleLinkMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`main-nav${hidden ? ' nav-hidden' : ''}`}
      style={{ opacity: 0 }}
    >
      <a href="#" onClick={(e) => handleClick(e, '#')} className="nav-logo" aria-label="Lilli Schröder">
        <img src={asset('/logo-text.png')} alt="Lilli Schröder" className="nav-logo-default" />
        <img src={asset('/logo-smiley.png')} alt="" aria-hidden="true" className="nav-logo-hover" />
      </a>

      {/* Desktop links */}
      <div className="nav-links-desktop">
        {[
          { href: '#work', label: 'Work' },
          { href: '#about', label: 'Contact' },
        ].map((item, i) => (
          <a
            key={item.label}
            ref={(el) => { linkRefs.current[i] = el; }}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="nav-link"
            onMouseMove={handleLinkMouseMove}
            onMouseLeave={handleLinkMouseLeave}
          >
            <span className="nav-link-label">{item.label}</span>
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className={`nav-hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
      </button>

      {/* Mobile menu */}
      <div ref={menuRef} className="nav-mobile-menu" style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
        <a href="#work" onClick={(e) => handleClick(e, '#work')} className="nav-mobile-link">Work</a>
        <a href="#about" onClick={(e) => handleClick(e, '#about')} className="nav-mobile-link">Contact</a>
      </div>
    </nav>
  );
}
