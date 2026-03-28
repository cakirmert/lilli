import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.NODE_ENV === 'production'
  ? `/${process.env.REPO_NAME || 'lilli'}`
  : '';

export const metadata: Metadata = {
  title: 'Lilli Schröder — Graphic Designer & Illustrator',
  description:
    'Lilli Schröder is a graphic designer and illustrator based in Hamburg. Passionate about visual storytelling and vibrant illustrations.',
  keywords: ['graphic designer', 'illustrator', 'Hamburg', 'illustration', 'design', 'visual storytelling'],
  icons: {
    icon: `${basePath}/hero-illustration.svg`,
  },
  openGraph: {
    title: 'Lilli Schröder — Graphic Designer & Illustrator',
    description: 'Graphic designer and illustrator based in Hamburg.',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
