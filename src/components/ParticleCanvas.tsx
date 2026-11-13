import { useEffect, useRef } from 'react';
import { ParticleField } from '../graphics/particles';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  className?: string;
  particleCount?: number;
  color?: string;
}

export function ParticleCanvas({
  className = '',
  particleCount,
  color = '#1e4fa3',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<ParticleField | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const field = new ParticleField({
      canvas,
      count: particleCount,
      color,
      connectionColor: 'rgba(30,79,163,0.07)',
      maxSpeed: 0.25,
      connectionDistance: 110,
      mouseInfluence: 80,
    });

    fieldRef.current = field;
    field.start();

    const onResize = () => field.resize();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      field.destroy();
      fieldRef.current = null;
    };
  }, [reduced, particleCount, color]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
