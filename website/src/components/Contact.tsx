'use client';

import { asset } from '@/lib/basePath';

export default function Contact() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href={asset('/impressum')} className="footer-link">Impressum</a>
          <a href={asset('/datenschutz')} className="footer-link">Datenschutz</a>
        </div>
        <p className="copyright">
          &copy; Lilli Schr&ouml;der, all rights reserved.
        </p>
      </div>
    </footer>
  );
}
