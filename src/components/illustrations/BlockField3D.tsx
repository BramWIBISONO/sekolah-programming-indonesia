import React, { useEffect, useRef, useState } from 'react';

interface BlockField3DProps {
  className?: string;
  /** Shown until three.js has loaded, and kept if WebGL is not available. */
  fallback?: React.ReactNode;
  /** Draws one still frame and stops animating. */
  reduceMotion?: boolean;
}

const COLS = 12;
const ROWS = 8;
const SPACING = 0.95;

/**
 * A calm field of rounded coding blocks in SPI colours, rising and settling in a slow wave.
 * The colour follows the position (navy to brand blue to light blue), so it reads as one design, not noise.
 * three.js is loaded only when this component is shown, and the animation pauses when scrolled out of view.
 */
export const BlockField3D: React.FC<BlockField3DProps> = ({ className = '', fallback, reduceMotion = false }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  // Three.js draws into its own container, so React never shares child nodes with the canvas.
  const glRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = glRef.current;
    if (!host) return;

    let disposed = false;
    let frame = 0;
    let stop: (() => void) | undefined;

    const start = async () => {
      let THREE: typeof import('three');
      let RoundedBoxGeometry: typeof import('three/examples/jsm/geometries/RoundedBoxGeometry.js').RoundedBoxGeometry;
      try {
        [THREE, { RoundedBoxGeometry }] = await Promise.all([
          import('three'),
          import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
        ]);
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
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 11, 17);
      camera.lookAt(0, 0, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 1.25));
      const sun = new THREE.DirectionalLight(0xffffff, 1.4);
      sun.position.set(4, 10, 6);
      scene.add(sun);

      const geometry = new RoundedBoxGeometry(0.78, 0.78, 0.78, 3, 0.12);
      const material = new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.02 });
      const count = COLS * ROWS;
      const blocks = new THREE.InstancedMesh(geometry, material, count);

      // Colour by position: navy at one corner, brand blue in the middle, light blue at the other.
      const navy = new THREE.Color(0x041a5a);
      const brand = new THREE.Color(0x1870ff);
      const sky = new THREE.Color(0x9cc2ff);
      const yellow = new THREE.Color(0xffc928);
      const tint = new THREE.Color();
      const base: number[] = [];
      let i = 0;
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const t = (c / (COLS - 1) + r / (ROWS - 1)) / 2;
          if (t < 0.5) tint.copy(navy).lerp(brand, t * 2);
          else tint.copy(brand).lerp(sky, (t - 0.5) * 2);
          // A few yellow blocks as accents, spread evenly.
          if ((c * 5 + r * 3) % 23 === 0) tint.copy(yellow);
          blocks.setColorAt(i, tint);
          base.push((c - (COLS - 1) / 2) * SPACING, (r - (ROWS - 1) / 2) * SPACING);
          i++;
        }
      }
      if (blocks.instanceColor) blocks.instanceColor.needsUpdate = true;
      scene.add(blocks);

      const dummy = new THREE.Object3D();
      const place = (t: number) => {
        for (let k = 0; k < count; k++) {
          const x = base[k * 2];
          const z = base[k * 2 + 1];
          const c = Math.round(x / SPACING + (COLS - 1) / 2);
          const r = Math.round(z / SPACING + (ROWS - 1) / 2);
          // Gentle waves: two slow sines that travel across the field.
          const y = Math.sin(c * 0.55 + t) * 0.32 + Math.sin(r * 0.6 - t * 0.8) * 0.22;
          dummy.position.set(x, y, z);
          dummy.updateMatrix();
          blocks.setMatrixAt(k, dummy.matrix);
        }
        blocks.instanceMatrix.needsUpdate = true;
      };
      place(0);

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

      const pointer = { x: 0 };
      const onPointer = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      };
      if (!reduceMotion) host.addEventListener('pointermove', onPointer);

      const draw = (t: number) => {
        const motion = reduceMotion ? 0 : 1;
        camera.position.x = motion * pointer.x * 1.2;
        camera.lookAt(0, 0, 0);
        place(t * 0.6 * motion);
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

      setReady(true);

      stop = () => {
        stopLoop();
        visibility.disconnect();
        resizeObserver.disconnect();
        host.removeEventListener('pointermove', onPointer);
        geometry.dispose();
        material.dispose();
        blocks.dispose();
        renderer.dispose();
        canvas.remove();
        setReady(false);
      };
    };

    start();

    return () => {
      disposed = true;
      stop?.();
    };
  }, [reduceMotion]);

  return (
    <div ref={hostRef} className={`relative ${className}`} aria-hidden="true">
      {!ready && fallback}
      <div ref={glRef} className="absolute inset-0" />
    </div>
  );
};
