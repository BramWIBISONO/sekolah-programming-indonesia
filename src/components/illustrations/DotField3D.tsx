import React, { useEffect, useRef } from 'react';

interface DotField3DProps {
  className?: string;
  /** Draws one still frame and stops animating. */
  reduceMotion?: boolean;
}

const SPI_BLUE = 0x1870ff;
const COLS = 42;
const ROWS = 22;
const SPACING = 0.42;

/**
 * A soft field of blue dots that ripples gently, and pushes away from the pointer on desktop.
 * Written for the SPI site. Sits behind content: give it a parent with a size and a background colour.
 */
export const DotField3D: React.FC<DotField3DProps> = ({ className = '', reduceMotion = false }) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let frame = 0;
    let stop: (() => void) | undefined;

    const start = async () => {
      let THREE: typeof import('three');
      try {
        THREE = await import('three');
      } catch {
        return;
      }
      if (disposed) return;

      const canvas = document.createElement('canvas');
      canvas.className = 'absolute inset-0 h-full w-full';
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        return;
      }
      host.appendChild(canvas);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      const distance = 10;
      camera.position.set(0, 0, distance);

      // Grid of points, centred on the origin.
      const count = COLS * ROWS;
      const base = new Float32Array(count * 3);
      const positions = new Float32Array(count * 3);
      let k = 0;
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          base[k] = positions[k] = (c - (COLS - 1) / 2) * SPACING;
          base[k + 1] = positions[k + 1] = (r - (ROWS - 1) / 2) * SPACING;
          base[k + 2] = positions[k + 2] = 0;
          k += 3;
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: SPI_BLUE, size: 0.085, sizeAttenuation: true, transparent: true, opacity: 0.85 });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const pointer = { x: 0, y: 0, active: false };
      const onPointer = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        pointer.active = true;
      };
      const onLeave = () => {
        pointer.active = false;
      };
      if (!reduceMotion) {
        host.addEventListener('pointermove', onPointer);
        host.addEventListener('pointerleave', onLeave);
      }

      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      const draw = (t: number) => {
        const motion = reduceMotion ? 0 : 1;
        // Pointer position on the z=0 plane, using the camera's field of view.
        const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;
        const halfW = halfH * camera.aspect;
        const px = pointer.x * halfW;
        const py = pointer.y * halfH;
        for (let i = 0; i < count; i++) {
          const o = i * 3;
          const x = base[o];
          const y = base[o + 1];
          const wave = Math.sin(x * 0.9 + t * 1.2) * 0.25 + Math.cos(y * 0.8 + t * 0.9) * 0.2;
          let push = 0;
          if (pointer.active && motion) {
            const dx = x - px;
            const dy = y - py;
            const d = Math.sqrt(dx * dx + dy * dy);
            push = Math.max(0, 1 - d / 2.4) * 0.9;
          }
          positions[o] = x + (pointer.active && motion ? (x - px) * 0.04 * Math.max(0, 1 - Math.hypot(x - px, y - py) / 2.4) : 0);
          positions[o + 1] = y + (pointer.active && motion ? (y - py) * 0.04 * Math.max(0, 1 - Math.hypot(x - px, y - py) / 2.4) : 0);
          positions[o + 2] = motion * (wave + push);
        }
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };

      let running = false;
      const loop = () => {
        frame = requestAnimationFrame(loop);
        draw(performance.now() / 1000);
      };
      const startLoop = () => {
        if (running || reduceMotion) return;
        running = true;
        loop();
      };
      const stopLoop = () => {
        running = false;
        cancelAnimationFrame(frame);
      };

      if (reduceMotion) draw(0);
      else startLoop();

      const visibility = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      });
      visibility.observe(host);

      stop = () => {
        stopLoop();
        visibility.disconnect();
        resizeObserver.disconnect();
        host.removeEventListener('pointermove', onPointer);
        host.removeEventListener('pointerleave', onLeave);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        canvas.remove();
      };
    };

    start();

    return () => {
      disposed = true;
      stop?.();
    };
  }, [reduceMotion]);

  return <div ref={hostRef} className={`pointer-events-auto absolute inset-0 ${className}`} aria-hidden="true" />;
};
