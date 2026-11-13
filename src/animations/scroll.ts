import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Register the GSAP ScrollTrigger plugin.
 * Call once at app startup.
 */
export function initScrollTrigger(): void {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade-and-rise reveal animation triggered when an element scrolls into view.
 */
export function createScrollReveal(
  el: HTMLElement,
  opts?: { y?: number; duration?: number; delay?: number },
): gsap.core.Tween | null {
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1, y: 0 });
    return null;
  }

  const { y = 40, duration = 0.8, delay = 0 } = opts ?? {};

  gsap.set(el, { opacity: 0, y });

  return gsap.to(el, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}

/**
 * Scroll-linked translateY parallax effect.
 * @param speed - Multiplier for the parallax distance (default 0.3).
 */
export function createParallax(
  el: HTMLElement,
  speed: number = 0.3,
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  return gsap.to(el, {
    y: () => ScrollTrigger.maxScroll(window) * speed * -0.1,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Animate an SVG path's stroke-dashoffset on scroll to create a
 * line-drawing effect.
 */
export function createLineDrawing(
  svgPath: SVGPathElement,
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  const length = svgPath.getTotalLength();

  gsap.set(svgPath, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(svgPath, {
    strokeDashoffset: 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: svgPath,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
    },
  });
}

/**
 * Kill every active ScrollTrigger instance.
 * Call on unmount / cleanup.
 */
export function cleanupScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}
