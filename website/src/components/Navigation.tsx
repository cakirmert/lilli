'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      // Hide nav when scrolling down past 100px, show when scrolling up
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

  // Animate mobile menu
  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
    }
  }, [menuOpen]);

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
      className={`main-nav${hidden ? ' nav-hidden' : ''}${scrolled ? ' nav-scrolled' : ''}`}
      style={{ opacity: 0 }}
    >
      <a href="#" onClick={(e) => handleClick(e, '#')} className="nav-logo">
        Lilli Schr&ouml;der
      </a>

      {/* Desktop links */}
      <div className="nav-links-desktop">
        <a href="#about" onClick={(e) => handleClick(e, '#about')} className="nav-link">About</a>
        <a href="#about" onClick={(e) => handleClick(e, '#about')} className="nav-link">Contact</a>
      </div>

      {/* Mobile hamburger */}
      <button
        className={`nav-hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile menu */}
      <div ref={menuRef} className="nav-mobile-menu" style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
        <a href="#work" onClick={(e) => handleClick(e, '#work')} className="nav-mobile-link">Work</a>
        <a href="#about" onClick={(e) => handleClick(e, '#about')} className="nav-mobile-link">About</a>
        <a href="#about" onClick={(e) => handleClick(e, '#about')} className="nav-mobile-link">Contact</a>
      </div>
    </nav>
  );
}
