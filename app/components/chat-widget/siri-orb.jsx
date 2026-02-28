import { useEffect, useRef } from 'react';

/**
 * Siri-style glowing orb — canvas-based, lightweight.
 * Renders organic multi-colored blobs that breathe when idle
 * and pulse intensely when isActive is true.
 */
export function SiriOrb({ isActive, onClick, className, size = 64 }) {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const activeRef = useRef(isActive);

  useEffect(() => { activeRef.current = isActive; }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const baseRadius = size * 0.32;

    const colors = [
      { h: 200, s: 95, l: 55 },
      { h: 265, s: 80, l: 60 },
      { h: 160, s: 70, l: 50 },
      { h: 330, s: 85, l: 60 },
      { h: 35,  s: 95, l: 55 },
    ];

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      timeRef.current += 0.02;
      const t = timeRef.current;
      const listening = activeRef.current;
      const amplitude = listening ? size * 0.07 : size * 0.025;
      const speed = listening ? 1.5 : 0.7;

      ctx.clearRect(0, 0, size, size);

      // Layered blobs
      for (let i = colors.length - 1; i >= 0; i--) {
        const c = colors[i];
        const phase = (i / colors.length) * Math.PI * 2;
        const r = baseRadius
          + Math.sin(t * speed + phase) * amplitude
          + Math.sin(t * speed * 1.7 + phase * 2) * (amplitude * 0.5);

        ctx.beginPath();
        const pts = 80;
        for (let j = 0; j <= pts; j++) {
          const angle = (j / pts) * Math.PI * 2;
          const wobble =
            Math.sin(angle * 3 + t * speed * 2 + phase) * (amplitude * 0.4) +
            Math.sin(angle * 5 + t * speed * 1.3 + phase * 1.5) * (amplitude * 0.2);
          const pr = r + wobble;
          const x = cx + Math.cos(angle) * pr;
          const y = cy + Math.sin(angle) * pr;
          if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + amplitude);
        const alpha = listening ? 0.5 : 0.3;
        grad.addColorStop(0, `hsla(${c.h}, ${c.s}%, ${c.l + 15}%, ${alpha + 0.2})`);
        grad.addColorStop(0.6, `hsla(${c.h}, ${c.s}%, ${c.l}%, ${alpha})`);
        grad.addColorStop(1, `hsla(${c.h}, ${c.s}%, ${c.l}%, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Core glow
      const coreAlpha = listening ? 0.9 : 0.6;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 0.5);
      coreGrad.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
      coreGrad.addColorStop(0.5, `rgba(200, 220, 255, ${coreAlpha * 0.4})`);
      coreGrad.addColorStop(1, 'rgba(200, 220, 255, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Outer halo when active
      if (listening) {
        const haloR = baseRadius + size * 0.12 + Math.sin(t * 3) * (size * 0.03);
        const haloGrad = ctx.createRadialGradient(cx, cy, baseRadius, cx, cy, haloR);
        haloGrad.addColorStop(0, 'rgba(100, 180, 255, 0.12)');
        haloGrad.addColorStop(1, 'rgba(100, 180, 255, 0)');
        ctx.beginPath();
        ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();
      }
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onClick={onClick}
      style={{ display: 'block', cursor: 'pointer' }}
    />
  );
}
