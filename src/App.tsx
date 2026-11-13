import { useEffect } from 'react';
import { ToastProvider } from './components/Toast';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { WhatIsMun } from './components/WhatIsMun';
import { WhyRns } from './components/WhyRns';
import { Experience } from './components/Experience';
import { Committees } from './components/Committees';
import { Team } from './components/Team';
import { EventSection } from './components/EventSection';
import { Venue } from './components/Venue';
import { Registration } from './components/Registration';
import { ClosingCta } from './components/ClosingCta';
import { Footer } from './components/Footer';
import { initScrollTrigger } from './animations/scroll';

export default function App() {
  useEffect(() => {
    initScrollTrigger();
  }, []);

  return (
    <ToastProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <WhatIsMun />
        <WhyRns />
        <Experience />
        <Committees />
        <EventSection />
        <Registration />
        <Venue />
        <Team />
        <ClosingCta />
      </main>
      <Footer />
    </ToastProvider>
  );
}
