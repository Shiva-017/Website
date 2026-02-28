import { useEffect, useRef, useCallback } from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderer,
  BufferGeometry, Float32BufferAttribute,
  Points, ShaderMaterial, Color, Vector3,
  AdditiveBlending, LineSegments, LineBasicMaterial,
} from 'three';

/**
 * Neural network particle system for the chat widget background.
 * Particles float and form connections when close, pulses on "activate".
 */
export function NeuralBackground({ isActive, className }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const linesRef = useRef(null);
  const frameRef = useRef(null);
  const pulseRef = useRef(0);
  const timeRef = useRef(0);
  const velocitiesRef = useRef([]);

  const PARTICLE_COUNT = 60;
  const CONNECTION_DISTANCE = 2.2;
  const BOUNDS = 4;

  const activate = useCallback(() => {
    pulseRef.current = 1.0;
  }, []);

  useEffect(() => {
    if (isActive) activate();
  }, [isActive, activate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientWidth: w, clientHeight: h } = container;
    if (w === 0 || h === 0) return;

    // Scene
    const scene = new Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 6;
    cameraRef.current = camera;

    // Renderer
    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const velocities = [];

    const palette = [
      new Color('#0ea5e9'), // cyan
      new Color('#8b5cf6'), // purple
      new Color('#10b981'), // green
      new Color('#f59e0b'), // amber
      new Color('#ec4899'), // pink
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 3 + 1.5;

      velocities.push(new Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.004,
      ));
    }
    velocitiesRef.current = velocities;

    const particleGeom = new BufferGeometry();
    particleGeom.setAttribute('position', new Float32BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new Float32BufferAttribute(colors, 3));
    particleGeom.setAttribute('size', new Float32BufferAttribute(sizes, 1));

    const particleMat = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPulse: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uPulse;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          float pulse = 1.0 + uPulse * 0.5 * sin(uTime * 8.0 + position.x * 2.0);
          gl_PointSize = size * pulse * (200.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float uPulse;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = smoothstep(0.5, 0.0, d);
          float alpha = glow * (0.6 + uPulse * 0.4);
          gl_FragColor = vec4(vColor * (1.0 + uPulse * 0.5), alpha);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const particles = new Points(particleGeom, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Connection lines
    const lineGeom = new BufferGeometry();
    const lineMat = new LineBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.08,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    const lines = new LineSegments(lineGeom, lineMat);
    scene.add(lines);
    linesRef.current = lines;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.016;

      // Decay pulse
      pulseRef.current *= 0.97;

      const posAttr = particles.geometry.attributes.position;
      const posArray = posAttr.array;

      // Move particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const vel = velocities[i];
        // Add pulse burst
        const burstFactor = 1 + pulseRef.current * 3;
        posArray[i * 3] += vel.x * burstFactor;
        posArray[i * 3 + 1] += vel.y * burstFactor;
        posArray[i * 3 + 2] += vel.z * burstFactor;

        // Wrap around bounds
        for (let a = 0; a < 3; a++) {
          const bound = a === 2 ? BOUNDS * 0.5 : BOUNDS;
          if (posArray[i * 3 + a] > bound) posArray[i * 3 + a] = -bound;
          if (posArray[i * 3 + a] < -bound) posArray[i * 3 + a] = bound;
        }
      }
      posAttr.needsUpdate = true;

      // Update connections
      const linePositions = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DISTANCE) {
            linePositions.push(
              posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
              posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2],
            );
          }
        }
      }

      lines.geometry.dispose();
      const newLineGeom = new BufferGeometry();
      if (linePositions.length > 0) {
        newLineGeom.setAttribute('position', new Float32BufferAttribute(linePositions, 3));
      }
      lines.geometry = newLineGeom;
      lineMat.opacity = 0.06 + pulseRef.current * 0.15;

      // Update uniforms
      particleMat.uniforms.uTime.value = timeRef.current;
      particleMat.uniforms.uPulse.value = pulseRef.current;

      // Gentle camera sway
      camera.position.x = Math.sin(timeRef.current * 0.15) * 0.3;
      camera.position.y = Math.cos(timeRef.current * 0.1) * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      lineMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
