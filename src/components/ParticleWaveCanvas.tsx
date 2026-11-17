import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export function ParticleWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isCanvasVisible = true;
    let lastFrameTime = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const initParticles = () => {
      const count = width < 768 ? 26 : 44;
      particles = Array.from({ length: count }, (_, idx) => {
        const seedX = ((idx * 137.5) % 100) / 100;
        const seedY = ((idx * 73.1) % 100) / 100;
        return {
          x: seedX * width,
          y: seedY * height,
          vx: Math.cos(idx * 1.7) * 0.55,
          vy: Math.sin(idx * 2.3) * 0.55,
          radius: 1.7 + (idx % 3) * 0.6,
          alpha: 0.52 + (idx % 4) * 0.14,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 360);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const drawWaves = (timeSec: number) => {
      const waveConfigs = [
        { amp: 28, freq: 0.0042, speed: 0.9, yRatio: 0.62, color: 'rgba(34, 211, 238, 0.24)' },
        { amp: 20, freq: 0.0058, speed: -0.65, yRatio: 0.71, color: 'rgba(16, 185, 129, 0.19)' },
        { amp: 15, freq: 0.0031, speed: 0.45, yRatio: 0.79, color: 'rgba(148, 163, 184, 0.13)' },
      ];

      for (const wave of waveConfigs) {
        ctx.beginPath();
        const baseY = height * wave.yRatio;
        for (let x = 0; x <= width; x += 24) {
          const y =
            baseY +
            Math.sin(x * wave.freq + timeSec * wave.speed) * wave.amp +
            Math.cos(x * wave.freq * 0.5 - timeSec * wave.speed * 0.7) * (wave.amp * 0.45);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    };

    const renderFrame = (timestampMs: number) => {
      if (!isCanvasVisible) {
        animationId = 0;
        return;
      }

      if (timestampMs !== 0 && timestampMs - lastFrameTime < 32) {
        animationId = window.requestAnimationFrame(renderFrame);
        return;
      }
      lastFrameTime = timestampMs;

      const timeSec = timestampMs * 0.001;
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(
        width * 0.72,
        height * 0.25,
        20,
        width * 0.72,
        height * 0.25,
        width * 0.65
      );
      grad.addColorStop(0, 'rgba(34, 211, 238, 0.13)');
      grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)');
      grad.addColorStop(1, 'rgba(6, 9, 17, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      drawWaves(timeSec);

      const maxLinkDist = width < 768 ? 115 : 155;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 15000 && distSq > 1) {
              const force = 0.28 / Math.sqrt(distSq);
              p.x += dx * force;
              p.y += dy * force;
            }
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxLinkDist) {
            const lineAlpha = (1 - dist / maxLinkDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(103, 232, 249, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const pdx = p.x - pointer.x;
          const pdy = p.y - pointer.y;
          const pdist = Math.hypot(pdx, pdy);
          if (pdist < 175) {
            const alpha = (1 - pdist / 175) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 243, 252, ${p.alpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion && isCanvasVisible) {
        animationId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((entry) => entry.isIntersecting);
          isCanvasVisible = visible;
          if (visible && !prefersReducedMotion && animationId === 0) {
            animationId = window.requestAnimationFrame(renderFrame);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);
    }

    resize();
    renderFrame(0);

    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="hero-particle-canvas"
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 h-full w-full"
    />
  );
}
