import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { LAND_DOTS } from '../data/geo';
import { HOME_MARKER } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMousePosition } from '../animations/interactions';

const R = 100;
const TILT = (18 * Math.PI) / 180; // north pole tipped toward the viewer
const DEG = Math.PI / 180;
const START_LON = 84; // opens with the Indian subcontinent in view
const SPEED = 3.5; // degrees per second: unhurried

// Illustrative connection lines from the host city to world hubs. Decorative only.
const ARC_ENDS: [number, number][] = [
  [-0.13, 51.5],
  [-74, 40.7],
  [36.8, -1.3],
  [103.8, 1.35],
  [55.3, 25.2],
  [151.2, -33.9],
  [139.7, 35.7],
];

type V3 = [number, number, number];
const toVec = (lon: number, lat: number): V3 => {
  const la = lat * DEG;
  const lo = lon * DEG;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};

function slerp(a: V3, b: V3, t: number): V3 {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  const s = Math.sin(om) || 1;
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

interface Props {
  className?: string;
  /** Static line-art variant for dark backgrounds. */
  tone?: 'paper' | 'navy';
  /** Disable rotation (still draws one frame). */
  still?: boolean;
  startLon?: number;
}

export function Globe({ className = '', tone = 'paper', still = false, startLon = START_LON }: Props) {
  const uid = useId().replace(/:/g, '');
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const gratRef = useRef<SVGPathElement>(null);
  const nearRef = useRef<SVGPathElement>(null);
  const farRef = useRef<SVGPathElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const markRef = useRef<SVGGElement>(null);

  // Cursor responsiveness
  const mouse = useMousePosition();
  const [hovered, setHovered] = useState(false);
  // Smooth cursor influence ref to avoid re-creating the rAF loop
  const mouseNormXRef = useRef(0);

  const land = useMemo(() => {
    const out = new Float32Array((LAND_DOTS.length / 2) * 3);
    for (let i = 0; i < LAND_DOTS.length; i += 2) {
      const v = toVec(LAND_DOTS[i] / 10, LAND_DOTS[i + 1] / 10);
      out.set(v, (i / 2) * 3);
    }
    return out;
  }, []);

  const home = useMemo(() => toVec(HOME_MARKER[0], HOME_MARKER[1]), []);
  const arcs = useMemo(
    () =>
      ARC_ENDS.map(([lo, la]) => {
        const end = toVec(lo, la);
        return Array.from({ length: 36 }, (_, i) => {
          const t = i / 35;
          return { p: slerp(home, end, t), lift: 1 + 0.16 * Math.sin(Math.PI * t) };
        });
      }),
    [home],
  );

  const animate = !reduced && !still;

  // Keep a ref in sync with the latest normalised mouse X so the rAF loop can read it
  useEffect(() => {
    mouseNormXRef.current = mouse.normalized.x;
  }, [mouse.normalized.x]);

  useEffect(() => {
    const grat = gratRef.current!;
    const near = nearRef.current!;
    const far = farRef.current!;
    const arcEl = arcRef.current!;
    const mark = markRef.current!;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    const render = (lon0deg: number) => {
      const l0 = lon0deg * DEG;
      const c = Math.cos(l0);
      const s = Math.sin(l0);
      const project = (x: number, y: number, z: number, scale = 1): V3 => {
        const x1 = x * c - z * s;
        const z1 = x * s + z * c;
        const y1 = y * cosT - z1 * sinT;
        const z2 = y * sinT + z1 * cosT;
        return [x1 * R * scale, -y1 * R * scale, z2];
      };

      // graticule
      let g = '';
      for (let lo = -180; lo < 180; lo += 20) {
        let pen = false;
        for (let la = -90; la <= 90; la += 6) {
          const v = toVec(lo, la);
          const [x, y, z] = project(v[0], v[1], v[2]);
          if (z > 0) {
            g += `${pen ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
            pen = true;
          } else pen = false;
        }
      }
      for (let la = -60; la <= 60; la += 20) {
        let pen = false;
        for (let lo = -180; lo <= 180; lo += 6) {
          const v = toVec(lo, la);
          const [x, y, z] = project(v[0], v[1], v[2]);
          if (z > 0) {
            g += `${pen ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
            pen = true;
          } else pen = false;
        }
      }
      grat.setAttribute('d', g);

      // land dots, split by depth so the limb fades gently
      let dn = '';
      let df = '';
      for (let i = 0; i < land.length; i += 3) {
        const [x, y, z] = project(land[i], land[i + 1], land[i + 2]);
        if (z <= 0.02) continue;
        const seg = `M${x.toFixed(1)} ${y.toFixed(1)}h.01`;
        if (z > 0.38) dn += seg;
        else df += seg;
      }
      near.setAttribute('d', dn);
      far.setAttribute('d', df);

      // connection arcs
      let a = '';
      for (const arc of arcs) {
        let pen = false;
        for (const { p, lift } of arc) {
          const [, , zs] = project(p[0], p[1], p[2]);
          if (zs <= 0.02) {
            pen = false;
            continue;
          }
          const [x, y] = project(p[0], p[1], p[2], lift);
          a += `${pen ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
          pen = true;
        }
      }
      arcEl.setAttribute('d', a);

      // host-city marker
      const [hx, hy, hz] = project(home[0], home[1], home[2]);
      mark.setAttribute('transform', `translate(${hx.toFixed(1)} ${hy.toFixed(1)})`);
      mark.setAttribute('opacity', hz > 0.1 ? '1' : '0');
    };

    if (!animate) {
      render(startLon);
      return;
    }

    let raf = 0;
    let last = 0;
    let lon = startLon;
    let visible = true;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = t;
        return;
      }
      if (t - last < 32) return; // ~30fps is plenty at this rotation speed
      const dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
      last = t;
      // Base rotation + subtle cursor influence: left → faster, right → slower (max ±2°/s)
      const cursorOffset = mouseNormXRef.current * 2;
      lon -= (SPEED + cursorOffset) * dt;
      render(lon);
    };

    render(lon);
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (svgRef.current) io.observe(svgRef.current);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [animate, arcs, home, land, startLon]);

  const navy = tone === 'navy';
  const landColor = navy ? '#9db8e6' : '#1e4fa3';
  const gratColor = navy ? '#9db8e6' : '#1e4fa3';
  const gold = navy ? '#cdb078' : '#a98a4e';

  return (
    <svg
      ref={svgRef}
      viewBox="-112 -112 224 224"
      className={className}
      aria-hidden="true"
      focusable="false"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered && !reduced ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.4s ease-out',
      }}
    >
      <defs>
        <radialGradient id={`${uid}-sphere`} cx="36%" cy="30%" r="82%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#e9f0fa" />
          <stop offset="100%" stopColor="#c4d5ee" />
        </radialGradient>
        <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="86%" stopColor="#1e4fa3" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#1e4fa3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-shade`} cx="40%" cy="34%" r="70%">
          <stop offset="62%" stopColor="#0a1a3a" stopOpacity="0" />
          <stop offset="100%" stopColor="#0a1a3a" stopOpacity="0.16" />
        </radialGradient>
      </defs>

      {navy ? (
        <circle r={R} fill="#0d2150" fillOpacity="0.55" stroke={gratColor} strokeOpacity="0.35" strokeWidth="0.5" />
      ) : (
        <>
          <circle r="111" fill={`url(#${uid}-halo)`} />
          <circle r={R} fill={`url(#${uid}-sphere)`} />
        </>
      )}

      <path
        ref={gratRef}
        fill="none"
        stroke={gratColor}
        strokeOpacity={navy ? 0.28 : 0.2}
        strokeWidth="0.45"
        strokeLinecap="round"
      />
      <path
        ref={farRef}
        fill="none"
        stroke={landColor}
        strokeOpacity={navy ? 0.4 : 0.38}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        ref={nearRef}
        fill="none"
        stroke={landColor}
        strokeOpacity={navy ? 0.85 : 0.9}
        strokeWidth="1.95"
        strokeLinecap="round"
      />
      <path
        ref={arcRef}
        fill="none"
        stroke={gold}
        strokeWidth="0.75"
        strokeDasharray="1.6 2.2"
        strokeLinecap="round"
        strokeOpacity="0.95"
      />

      {!navy && <circle r={R} fill={`url(#${uid}-shade)`} />}
      <circle r={R} fill="none" stroke={gratColor} strokeOpacity={navy ? 0.5 : 0.28} strokeWidth="0.6" />

      <g ref={markRef} style={{ transition: 'opacity 300ms' }}>
        <circle
          className="pulse-ring"
          r="4"
          fill="none"
          stroke={gold}
          strokeWidth="0.8"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <circle r="2.6" fill={gold} stroke={navy ? '#0a1a3a' : '#ffffff'} strokeWidth="0.9" />
      </g>
    </svg>
  );
}
