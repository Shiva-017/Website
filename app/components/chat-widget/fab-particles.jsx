import { useEffect, useRef } from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderer,
  BufferGeometry, Float32BufferAttribute,
  Points, ShaderMaterial, Color, AdditiveBlending,
} from 'three';

/**
 * Tiny orbital particle ring for the FAB button.
 * Particles orbit in a ring, pulse on "active".
 */
export function FabParticles({ className, isActive }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const pulseRef = useRef(0);
  const timeRef = useRef(0);

  const COUNT = 24;

  useEffect(() => {
    if (isActive) pulseRef.current = 1.0;
  }, [isActive]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const size = 64;
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, 1, 0.1, 50);
    camera.position.z = 3;

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles in a ring
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    const palette = [
      new Color('#0ea5e9'),
      new Color('#8b5cf6'),
      new Color('#10b981'),
      new Color('#f59e0b'),
      new Color('#ec4899'),
    ];

    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      const r = 0.9 + Math.random() * 0.3;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = Math.sin(angle) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 4 + 2;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geom.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geom.setAttribute('size', new Float32BufferAttribute(sizes, 1));
    geom.setAttribute('phase', new Float32BufferAttribute(phases, 1));

    const mat = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPulse: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute float phase;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPulse;
        void main() {
          vColor = color;
          float angle = uTime * 0.8 + phase;
          vec3 pos = position;
          float r = length(pos.xy);
          float a = atan(pos.y, pos.x) + uTime * 0.5;
          float expand = 1.0 + uPulse * 0.4;
          pos.x = cos(a) * r * expand;
          pos.y = sin(a) * r * expand;
          pos.z += sin(angle) * 0.15;
          vAlpha = 0.5 + 0.5 * sin(angle * 2.0) + uPulse * 0.5;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (1.0 + uPulse * 0.6) * (80.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const points = new Points(geom, mat);
    scene.add(points);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.016;
      pulseRef.current *= 0.96;

      mat.uniforms.uTime.value = timeRef.current;
      mat.uniforms.uPulse.value = pulseRef.current;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
