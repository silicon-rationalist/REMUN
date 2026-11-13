import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { EVENT } from '../data/content';
import { Globe } from './Globe';
import { SiteLink } from './SiteLink';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ParticleCanvas } from './ParticleCanvas';
import { initScrollTrigger, cleanupScrollTriggers } from '../animations/scroll';
import { gsap } from 'gsap';

const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

export function Hero() {
  const reduced = useReducedMotion();
  const globeWrap = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  // Globe → map handoff: as the hero scrolls away the globe drifts, settles and fades,
  // and the map below arrives on the same axis. Transform + opacity only.
  useEffect(() => {
    const el = globeWrap.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      // More dramatic fade + scale on scroll (was 0.1 scale, 0.85 opacity)
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)));
      el.style.transform = `translate3d(0, ${p * 64}px, 0) scale(${1 - p * 0.18})`;
      el.style.opacity = String(1 - p * 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // GSAP ScrollTrigger: hero text fades + translates up as user scrolls past 50vh
  useEffect(() => {
    if (reduced) return;
    initScrollTrigger();

    const textCol = textColRef.current;
    if (!textCol) return;

    const tween = gsap.to(textCol, {
      opacity: 0,
      y: -40,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: textCol,
        start: 'top top',
        end: '+=50vh',
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      cleanupScrollTriggers();
    };
  }, [reduced]);

  return (
    <section id="home" className="paper-grain relative overflow-x-clip bg-paper pt-28 sm:pt-32 lg:pt-0">
      {/* Ambient particle background — hidden when reduced motion is on */}
      <ParticleCanvas
        particleCount={40}
        color="#1e4fa3"
        className="opacity-60"
      />
      <div className="container-x grid min-h-[100svh] items-center gap-6 pb-16 lg:grid-cols-12 lg:gap-0 lg:pb-0 lg:pt-24">
        <div ref={textColRef} className="relative z-10 lg:col-span-7">
          <p className="eyebrow rise mb-6 flex items-center gap-3 text-gold-ink" style={delay(0)}>
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Model United Nations · {EVENT.institution}
          </p>

          <h1 className="display rise text-[clamp(3.6rem,10.5vw,8.75rem)] font-light" style={delay(80)}>
            RNS MUN
            <br />
            <span className="italic text-blue">{EVENT.year}</span>
          </h1>

          <p
            className="display rise mt-6 max-w-xl text-[clamp(1.5rem,3vw,2.35rem)] leading-[1.15] text-navy/90"
            style={delay(180)}
          >
            {EVENT.tagline}
            <span className="sr-only"> The world is in session.</span>
          </p>

          <dl className="rise mt-9 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 border-t border-rule pt-6 sm:grid-cols-3" style={delay(280)}>
            {[
              ['Dates', EVENT.dateLabel],
              ['Location', EVENT.location],
              ['Prize pool', EVENT.prizePoolLabel],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 sm:block">
                <dt className="eyebrow !text-[0.68rem] text-ink-soft">{k}</dt>
                <dd className="display text-lg font-medium sm:mt-1.5 sm:text-[1.15rem]">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={delay(380)}>
            <SiteLink to="registration" className="btn btn-primary">
              Register Now
              <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
            </SiteLink>
            <a href="#about" className="btn btn-secondary">
              Explore the Conference
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div
            className="rise relative mx-auto -mb-4 mt-4 w-[min(92vw,34rem)] sm:mt-8 lg:-mr-[9vw] lg:ml-0 lg:mt-0 lg:w-[min(50vw,50rem)] xl:-mr-[6vw]"
            style={delay(200)}
          >
            <div ref={globeWrap} className="will-change-transform">
              <Globe className="block h-auto w-full" />
              <p className="eyebrow absolute bottom-[3%] left-[6%] flex items-center gap-2 !text-[0.65rem] text-ink-soft">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
                Host city · {EVENT.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
