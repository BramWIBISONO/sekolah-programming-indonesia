import React, { useEffect, useRef, useState } from 'react';
import type { Group, Mesh, Vector3 } from 'three';

interface AINetwork3DProps {
  className?: string;
  /** Shown until three.js has loaded, and kept if WebGL is not available. */
  fallback?: React.ReactNode;
  /** Draws one still frame and stops animating. */
  reduceMotion?: boolean;
}

/** Nodes per layer of the small neural network drawn in 3D. */
const LAYERS = [4, 6, 3];
const SPI_BLUE = 0x1870ff;

/**
 * A slowly turning 3D neural network in SPI blue. three.js is loaded only when this component is shown, so
 * pages without it do not pay for it. It pauses when scrolled out of view and follows the pointer on desktop.
 */
export const AINetwork3D: React.FC<AINetwork3DProps> = ({ className = '', fallback, reduceMotion = false }) => {
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
        // No WebGL here: keep the fallback picture.
        return;
      }
      host.appendChild(canvas);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0, 11);

      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const key = new THREE.DirectionalLight(0xffffff, 1.5);
      key.position.set(4, 6, 8);
      scene.add(key);
      const rim = new THREE.PointLight(SPI_BLUE, 40, 30);
      rim.position.set(-6, -3, 4);
      scene.add(rim);

      const group: Group = new THREE.Group();
      scene.add(group);

      const nodeGeo = new THREE.SphereGeometry(0.22, 32, 32);
      const nodeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: SPI_BLUE, emissiveIntensity: 0.55, roughness: 0.25, metalness: 0.05 });
      const ringGeo = new THREE.TorusGeometry(0.42, 0.025, 12, 72);
      const ringMat = new THREE.MeshBasicMaterial({ color: SPI_BLUE, transparent: true, opacity: 0.5 });
      const lineMat = new THREE.LineBasicMaterial({ color: SPI_BLUE, transparent: true, opacity: 0.35 });
      const pulseGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffe38a });

      // Lay out the layers left to right, with each layer centred vertically.
      const layerPositions: Vector3[][] = LAYERS.map((count, li) => {
        const x = (li - (LAYERS.length - 1) / 2) * 3.2;
        return Array.from({ length: count }, (_, i) => new THREE.Vector3(x, (i - (count - 1) / 2) * 1.5, Math.sin(li * 1.3 + i) * 0.4));
      });

      const rings: Mesh[] = [];
      layerPositions.forEach((layer) =>
        layer.forEach((p) => {
          const node = new THREE.Mesh(nodeGeo, nodeMat);
          node.position.copy(p);
          group.add(node);
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.position.copy(p);
          ring.rotation.x = Math.PI / 2.4;
          group.add(ring);
          rings.push(ring);
        }),
      );

      // Connections between neighbouring layers, plus a few glowing pulses that travel along them.
      const edges: [Vector3, Vector3][] = [];
      for (let li = 0; li < layerPositions.length - 1; li++) {
        for (const a of layerPositions[li]) {
          for (const b of layerPositions[li + 1]) {
            edges.push([a, b]);
            const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), lineMat);
            group.add(line);
          }
        }
      }
      const pulses = Array.from({ length: 14 }, (_, k) => {
        const [a, b] = edges[(k * 5) % edges.length];
        const mesh = new THREE.Mesh(pulseGeo, pulseMat);
        group.add(mesh);
        return { mesh, a, b, offset: k / 14 };
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
        group.rotation.y = motion * (pointer.x * 0.35 + Math.sin(t * 0.3) * 0.25);
        group.rotation.x = motion * pointer.y * 0.15;
        rings.forEach((ring, i) => {
          ring.rotation.z = t * 0.6 + i;
        });
        pulses.forEach((p) => {
          const u = (t * 0.35 + p.offset) % 1;
          p.mesh.position.lerpVectors(p.a, p.b, u);
          p.mesh.scale.setScalar(0.7 + Math.sin(u * Math.PI) * 0.6);
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

      // Only animate while the network is on screen.
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
        ringGeo.dispose();
        ringMat.dispose();
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
