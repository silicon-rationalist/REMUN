export interface ParticleConfig {
  canvas: HTMLCanvasElement;
  count?: number;
  color?: string;
  connectionColor?: string;
  maxSpeed?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

/**
 * Renders a subtle particle-connection field on a <canvas>.
 *
 * Features:
 * - Particles drift slowly and connect with thin, low-opacity lines
 * - Particles respond subtly to cursor position
 * - Adaptive count: reduced on mobile (< 768 px)
 * - Pauses rendering when the canvas is off-screen (IntersectionObserver)
 */
export class ParticleField {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private isVisible = true;
  private observer: IntersectionObserver | null = null;
  private mouseX = -9999;
  private mouseY = -9999;

  private readonly color: string;
  private readonly connectionColor: string;
  private readonly maxSpeed: number;
  private readonly connectionDistance: number;
  private readonly mouseInfluence: number;
  private count: number;

  constructor(config: ParticleConfig) {
    this.canvas = config.canvas;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('ParticleField: cannot get 2d context');
    this.ctx = ctx;

    const isMobile = window.innerWidth < 768;

    this.color = config.color ?? '#1e4fa3';
    this.connectionColor = config.connectionColor ?? 'rgba(30,79,163,0.08)';
    this.maxSpeed = config.maxSpeed ?? 0.3;
    this.connectionDistance = config.connectionDistance ?? 120;
    this.mouseInfluence = config.mouseInfluence ?? 80;
    this.count = config.count ?? (isMobile ? 25 : 60);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.tick = this.tick.bind(this);
  }

  /* ------------------------------------------------------------------ */
  /*  Public API                                                        */
  /* ------------------------------------------------------------------ */

  start(): void {
    this.resize();
    this.initParticles();
    this.setupObserver();
    this.canvas.addEventListener('mousemove', this.handleMouseMove, {
      passive: true,
    });
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    this.tick();
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  destroy(): void {
    this.stop();
    this.observer?.disconnect();
    this.observer = null;
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    this.particles = [];
  }

  resize(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);

    // Re-detect mobile on resize
    const isMobile = window.innerWidth < 768;
    const targetCount = isMobile ? 25 : 60;
    if (this.particles.length > 0 && this.particles.length !== targetCount) {
      this.count = targetCount;
      this.initParticles();
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Internals                                                         */
  /* ------------------------------------------------------------------ */

  private initParticles(): void {
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;
    this.particles = [];

    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * this.maxSpeed * 2,
        vy: (Math.random() - 0.5) * this.maxSpeed * 2,
        radius: Math.random() * 1.5 + 0.5,
      });
    }
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && this.animationId === null) {
          this.tick();
        }
      },
      { threshold: 0 },
    );
    this.observer.observe(this.canvas);
  }

  private handleMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  private handleMouseLeave(): void {
    this.mouseX = -9999;
    this.mouseY = -9999;
  }

  private tick(): void {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    // Update & draw particles
    for (const p of this.particles) {
      // Mouse influence
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouseInfluence && dist > 0) {
        const force = (this.mouseInfluence - dist) / this.mouseInfluence;
        p.vx -= (dx / dist) * force * 0.02;
        p.vy -= (dy / dist) * force * 0.02;
      }

      // Clamp speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > this.maxSpeed) {
        p.vx = (p.vx / speed) * this.maxSpeed;
        p.vy = (p.vy / speed) * this.maxSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Draw dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.globalAlpha = 0.4;
      this.ctx.fill();
    }

    // Draw connections
    this.ctx.globalAlpha = 1;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const opacity = 1 - dist / this.connectionDistance;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = this.connectionColor;
          this.ctx.globalAlpha = opacity * 0.5;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(this.tick);
  }
}
