import { useState, useEffect } from 'react';

/**
 * Detect whether the current device is primarily touch-based.
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

interface MousePosition {
  x: number;
  y: number;
  normalized: { x: number; y: number };
}

/**
 * React hook that tracks the cursor position in pixels and as a
 * normalised –1 … 1 range relative to the viewport centre.
 * Returns {0, 0} on touch devices to avoid layout thrashing.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalized: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const { clientX, clientY } = e;
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = (clientY / window.innerHeight) * 2 - 1;

      setPosition({
        x: clientX,
        y: clientY,
        normalized: { x: nx, y: ny },
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

/**
 * Magnetic hover effect – the element nudges toward the cursor when
 * the pointer is nearby.
 *
 * @param el       – Target element
 * @param strength – Multiplier for the pull distance (default 0.3)
 * @returns Cleanup function that removes listeners and resets the transform.
 */
export function createMagneticEffect(
  el: HTMLElement,
  strength: number = 0.3,
): () => void {
  if (isTouchDevice()) return () => {};

  const handleMove = (e: MouseEvent): void => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;

    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = 'transform 0.2s ease-out';
  };

  const handleLeave = (): void => {
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s ease-out';
  };

  el.addEventListener('mousemove', handleMove, { passive: true });
  el.addEventListener('mouseleave', handleLeave);

  return () => {
    el.removeEventListener('mousemove', handleMove);
    el.removeEventListener('mouseleave', handleLeave);
    el.style.transform = '';
    el.style.transition = '';
  };
}
