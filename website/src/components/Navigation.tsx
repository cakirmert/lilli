'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { asset } from '@/lib/basePath';

export default function Navigation() {
  const [onBlue, setOnBlue] = useState(false);

  useEffect(() => {
    const about = document.getElementById('contact');
    if (!about) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOnBlue(about.getBoundingClientRect().top <= 72));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <nav className={`main-nav${onBlue ? ' main-nav--on-blue' : ''}`} aria-label="Main navigation">
      <a href="#work" className="nav-logo" aria-label="Lilli Schröder — back to work"
        onClick={(event) => {
          event.preventDefault();
          window.history.replaceState(null, '', '#work');
          window.dispatchEvent(new CustomEvent('portfolio:reset-work-gallery'));
        }}>
        <Image src={asset('/illustrations/logo-name.webp')} alt="Lilli Schröder" width={951} height={120} className="nav-logo-default" priority />
        <Image src={asset('/illustrations/logo-smile.webp')} alt="" width={951} height={144} className="nav-logo-hover" aria-hidden="true" />
      </a>
      <a className="nav-link" href="#contact">About &amp; Contact</a>
    </nav>
  );
}
