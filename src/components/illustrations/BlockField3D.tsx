import React, { useEffect, useRef, useState } from 'react';

interface BlockField3DProps {
  className?: string;
  /** Shown until three.js has loaded, and kept if WebGL is not available. */
  fallback?: React.ReactNode;
  /** Draws one still frame and stops animating. */
  reduceMotion?: boolean;
}

/** SPI colours for the blocks: brand blue, navy, a yellow accent, and light blue. */
const PALETTE = [0x1870ff, 0x041a5a, 0xffc928, 0x60a5fa, 0x1870ff];
const COLS = 9;
const ROWS = 7;

/**
 * A field of rounded coding blocks rising and falling in a soft wave, the way Scratch-style blocks sit in a row.
 * three.js is loaded only when this component is shown. It pauses when scrolled out of view.
 */
export const BlockField3D: React.FC<BlockField3DProps> = ({ className = '', fallback, reduceMotion = false }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
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
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 7, 13);
      camera.lookAt(0, 0, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 1.3));
      const sun = new THREE.DirectionalLight(0xffffff, 1.6);
      sun.position.set(5, 10, 6);
      scene.add(sun);

      const geometry = new RoundedBoxGeometry(0.82, 0.82, 0.82, 4, 0.12);
      const material = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.05 });
      const count = COLS * ROWS;
      const blocks = new THREE.InstancedMesh(geometry, material, count);
      const color = new THREE.Color();
      const dummy = new THREE.Object3D();
      for (let i = 0; i < count; i++) {
        blocks.setColorAt(i, color.setHex(PALETTE[(i * 7) % PALETTE.length]));
      }
      if (blocks.instanceColor) blocks.instanceColor.needsUpdate = true;
      scene.add(blocks);

      const place = (t: number) => {
        let i = 0;
        for (let c = 0; c < COLS; c++) {
          for (let r = 0; r < ROWS; r++) {
            const x = (c - (COLS - 1) / 2) * 1.05;
            const z = (r - (ROWS - 1) / 2) * 1.05;
            const wave = Math.sin(c * 0.7 + t * 1.1) * 0.55 + Math.cos(r * 0.8 + t * 0.9) * 0.45;
            dummy.position.set(x, wave, z);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            blocks.setMatrixAt(i++, dummy.matrix);
          }
        }
        blocks.instanceMatrix.needsUpdate = true;
      };

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
        camera.position.x = motion * pointer.x * 1.5;
        camera.lookAt(0, 0, 0);
        place(t * motion);
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
    </div>
  );
};
