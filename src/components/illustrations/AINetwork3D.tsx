import React, { useEffect, useRef, useState } from 'react';
import type { Group, Mesh, Vector3 } from 'three';

interface AINetworkProps {
  className?: string;
  /** Shown until three.js has loaded, and kept if WebGL is not available. */
  fallback?: React.ReactNode;
  /** Draws one still frame and stops animating. */
  reduceMotion?: boolean;
}

/** Nodes per layer. Fewer nodes read more clearly than many. */
const LAYERS = [3, 4, 3];
const SPI_BLUE = 0x1870ff;
const SKY = 0x60a5fa;

/**
 * A small, calm neural network in SPI blue, turning very slowly. Thin connections, with soft pulses of light
 * travelling along some of them. three.js is loaded only when this component is shown, and it pauses when
 * scrolled out of view.
 */
export const AINetwork3D: React.FC<AINetworkProps> = ({ className = '', fallback, reduceMotion = false }) => {
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
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 10);

      scene.add(new THREE.AmbientLight(0xffffff, 1.3));
      const key = new THREE.DirectionalLight(0xffffff, 1.2);
      key.position.set(3, 5, 8);
      scene.add(key);

      const group: Group = new THREE.Group();
      scene.add(group);

      const nodeGeo = new THREE.SphereGeometry(0.14, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: SPI_BLUE, emissiveIntensity: 0.4, roughness: 0.3 });
      const lineMat = new THREE.LineBasicMaterial({ color: SPI_BLUE, transparent: true, opacity: 0.2 });
      const pulseGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const pulseMat = new THREE.MeshBasicMaterial({ color: SKY });

      // Layers from left to right, each centred vertically.
      const layerPositions: Vector3[][] = LAYERS.map((count, li) => {
        const x = (li - (LAYERS.length - 1) / 2) * 2.4;
        return Array.from({ length: count }, (_, i) => new THREE.Vector3(x, (i - (count - 1) / 2) * 1.25, 0));
      });

      layerPositions.forEach((layer) =>
        layer.forEach((p) => {
          const node = new THREE.Mesh(nodeGeo, nodeMat) as Mesh;
          node.position.copy(p);
          group.add(node);
        }),
      );

      // Connections between neighbouring layers, and a few pulses that travel along some of them.
      const edges: [Vector3, Vector3][] = [];
      for (let li = 0; li < layerPositions.length - 1; li++) {
        for (const a of layerPositions[li]) {
          for (const b of layerPositions[li + 1]) {
            edges.push([a, b]);
            group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), lineMat));
          }
        }
      }
      const pulses = Array.from({ length: 6 }, (_, k) => {
        const [a, b] = edges[(k * 3) % edges.length];
        const mesh = new THREE.Mesh(pulseGeo, pulseMat);
        group.add(mesh);
        return { mesh, a, b, offset: k / 6 };
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
        // A slow sway, plus a small lean towards the pointer.
        group.rotation.y = motion * (Math.sin(t * 0.25) * 0.14 + pointer.x * 0.2);
        group.rotation.x = motion * pointer.y * 0.08;
        pulses.forEach((p) => {
          const u = (t * 0.22 + p.offset) % 1;
          p.mesh.position.lerpVectors(p.a, p.b, u);
          p.mesh.scale.setScalar(0.8 + Math.sin(u * Math.PI) * 0.5);
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
        nodeGeo.dispose();
        nodeMat.dispose();
        lineMat.dispose();
        pulseGeo.dispose();
        pulseMat.dispose();
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
