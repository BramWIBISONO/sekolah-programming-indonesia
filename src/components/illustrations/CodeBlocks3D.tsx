import React, { useEffect, useRef, useState } from 'react';

interface CodeBlocks3DProps {
  className?: string;
  /** Shown until three.js has loaded, and kept if WebGL is not available. */
  fallback?: React.ReactNode;
  /** Draws one still frame and stops animating. */
  reduceMotion?: boolean;
}

/** Scratch-style blocks, each with a label and SPI colours. Colour and text are drawn on a canvas texture. */
const BLOCKS = [
  { label: 'when ▶ clicked', fill: '#FFC928', text: '#041A5A' },
  { label: 'repeat 5', fill: '#1870FF', text: '#FFFFFF' },
  { label: 'think()', fill: '#60A5FA', text: '#041A5A' },
  { label: 'build()', fill: '#1870FF', text: '#FFFFFF' },
  { label: 'innovate()', fill: '#041A5A', text: '#FFFFFF' },
] as const;

/** Draws one block face: a rounded rectangle with its label, transparent outside the shape. */
const drawFace = (label: string, fill: string, text: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  const r = 44;
  ctx.beginPath();
  ctx.roundRect(8, 16, canvas.width - 16, canvas.height - 32, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = text;
  ctx.font = '700 72px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 4);
  return canvas;
};

/**
 * A stack of coding blocks floating on a transparent background, in SPI colours, as if a script is being built.
 * Each block bobs and sways out of step with the others, and the stack follows the pointer on desktop.
 * three.js is loaded only when this component is shown, and the animation pauses when scrolled out of view.
 */
export const CodeBlocks3D: React.FC<CodeBlocks3DProps> = ({ className = '', fallback, reduceMotion = false }) => {
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
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 13);

      scene.add(new THREE.AmbientLight(0xffffff, 1.4));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(4, 6, 8);
      scene.add(key);

      const stack = new THREE.Group();
      scene.add(stack);

      const bodyGeo = new RoundedBoxGeometry(3.4, 0.98, 0.7, 4, 0.16);
      const faceGeo = new THREE.PlaneGeometry(3.4, 0.98);
      const textures: InstanceType<typeof THREE.CanvasTexture>[] = [];
      const materials: InstanceType<typeof THREE.Material>[] = [];

      const blocks = BLOCKS.map((b, i) => {
        const group = new THREE.Group();
        const bodyMat = new THREE.MeshStandardMaterial({ color: b.fill, roughness: 0.35, metalness: 0.05 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        materials.push(bodyMat);
        const tex = new THREE.CanvasTexture(drawFace(b.label, b.fill, b.text));
        tex.colorSpace = THREE.SRGBColorSpace;
        textures.push(tex);
        const faceMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
        materials.push(faceMat);
        const face = new THREE.Mesh(faceGeo, faceMat);
        face.position.z = 0.36;
        group.add(body, face);
        // Stack top to bottom, with a little sideways step so it reads as a script, not a list.
        const slotY = (BLOCKS.length / 2 - i - 0.5) * 1.22;
        group.position.set(((i % 2) - 0.5) * 0.35, slotY, 0);
        stack.add(group);
        return { group, slotY, phase: i * 0.9 };
      });

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

      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      };
      if (!reduceMotion) host.addEventListener('pointermove', onPointer);

      const draw = (t: number) => {
        const motion = reduceMotion ? 0 : 1;
        stack.rotation.y = motion * (Math.sin(t * 0.3) * 0.12 + pointer.x * 0.25);
        stack.rotation.x = motion * pointer.y * 0.08;
        // Each block bobs and tilts a little on its own rhythm, around its slot in the stack.
        blocks.forEach(({ group, slotY, phase }) => {
          group.position.y = slotY + Math.sin(t * 1.4 + phase) * 0.07 * motion;
          group.rotation.z = motion * Math.sin(t * 0.9 + phase) * 0.04;
        });
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
        bodyGeo.dispose();
        faceGeo.dispose();
        textures.forEach((tx) => tx.dispose());
        materials.forEach((m) => m.dispose());
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
