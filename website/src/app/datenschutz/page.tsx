'use client';

import { asset } from '@/lib/basePath';

export default function Datenschutz() {
  return (
    <div className="legal-page">
      <nav className="legal-nav">
        <a href={asset('/')} className="nav-logo">Lilli Schr&ouml;der</a>
      </nav>
      <main className="legal-content">
        <h1>Datenschutzerkl&auml;rung</h1>

        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber, was mit Ihren personenbezogenen
          Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
          pers&ouml;nlich identifiziert werden k&ouml;nnen.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser Website?</strong><br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber: Lilli Schr&ouml;der,
          Hamburg, Deutschland. E-Mail: hello@lilli-schroeder.de
        </p>

        <h2>2. Hosting</h2>
        <p>
          Diese Website wird bei GitHub Pages gehostet. Der Anbieter ist die GitHub Inc.,
          88 Colin P Kelly Jr St, San Francisco, CA 94107, USA. Wenn Sie diese Website besuchen,
          werden vom Webserver automatisch verschiedene Server-Logdateien gespeichert.
        </p>

        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr ernst. Wir behandeln Ihre
          personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
          dieser Datenschutzerkl&auml;rung.
        </p>

        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Lilli Schr&ouml;der<br />
          Hamburg, Deutschland<br />
          E-Mail: hello@lilli-schroeder.de
        </p>

        <h2>4. Datenerfassung auf dieser Website</h2>
        <h3>Server-Log-Dateien</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
          Server-Log-Dateien, die Ihr Browser automatisch an uns &uuml;bermittelt. Dies sind: Browsertyp und
          Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners,
          Uhrzeit der Serveranfrage, IP-Adresse.
        </p>
        <p>
          Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Diese Website
          verwendet keine Cookies und keine Tracking-Tools.
        </p>

        <h2>5. Externe Links</h2>
        <p>
          Diese Website enth&auml;lt Links zu externen Websites (z.B. Behance, Instagram, LinkedIn).
          Nach dem Anklicken dieser Links haben wir keinen Einfluss mehr auf die Verarbeitung etwaiger
          personenbezogener Daten. Verantwortlich ist der jeweilige Betreiber der verlinkten Website.
        </p>
      </main>
    </div>
  );
}
