import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Projects />
        <About />
      </main>
      <Contact />
    </>
  );
}
