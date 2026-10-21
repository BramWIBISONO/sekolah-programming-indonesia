import React, { useEffect, useRef, useState } from 'react';

export interface RingImage {
  /** Public URL of a web-ready thumbnail under /assets/gallery. */
  src: string;
}

interface GalleryFrames3DProps {
  className?: string;
  /** Published photos for the ring. Missing slots are filled with branded placeholder frames. */
  images?: RingImage[];
  /** Shown until three.js has loaded, and kept if WebGL is not available. */
  fallback?: React.ReactNode;
  reduceMotion?: boolean;
  /** Called when a frame is tapped or clicked (not dragged). */
  onActivate?: () => void;
  placeholderLabel: string;
  brandLabel?: string;
}

const SLOTS = 5;
const RING_RADIUS = 3.2;
const CARD_WIDTH = 2.2;
const STEP_MS = 3600;

/** Placeholder frames use SPI colours: electric blue, navy, and the yellow accent. */
const PALETTE = [
  { from: '#1870FF', to: '#041A5A', ink: '#FFFFFF' },
  { from: '#60A5FA', to: '#1870FF', ink: '#FFFFFF' },
  { from: '#FFC928', to: '#F59E0B', ink: '#041A5A' },
  { from: '#041A5A', to: '#1870FF', ink: '#FFFFFF' },
  { from: '#1870FF', to: '#60A5FA', ink: '#FFFFFF' },
];

/** Angle folded into (-PI, PI]. */
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

const drawPlaceholder = (index: number, label: string, brand: string): HTMLCanvasElement => {
  const W = 512;
  const H = 384;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext('2d');
  if (!g) return canvas;
  const p = PALETTE[index % PALETTE.length];

  const grad = g.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, p.from);
  grad.addColorStop(1, p.to);
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);

  g.strokeStyle = 'rgba(255,255,255,0.12)';
  g.lineWidth = 2;
  for (let x = 0; x <= W; x += 48) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, H);
    g.stroke();
  }
  for (let y = 0; y <= H; y += 48) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(W, y);
    g.stroke();
  }

  // camera glyph: body, lens, and centre
  g.globalAlpha = 0.92;
  g.fillStyle = p.ink;
  g.beginPath();
  g.roundRect(170, 118, 172, 118, 24);
  g.fill();
  g.fillStyle = p.to;
  g.beginPath();
  g.arc(256, 177, 38, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = p.ink;
  g.beginPath();
  g.arc(256, 177, 15, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 1;

  g.fillStyle = p.ink;
  g.font = '800 40px system-ui, -apple-system, "Segoe UI", sans-serif';
  g.textAlign = 'left';
  g.textBaseline = 'top';
  g.fillText(brand, 32, 28);

  g.globalAlpha = 0.9;
  g.font = '700 26px system-ui, -apple-system, "Segoe UI", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'bottom';
  g.fillText(label, W / 2, H - 26);
  g.globalAlpha = 1;
  return canvas;
};

/** Soft contact shadow under the ring. */
const drawShadow = (): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const g = canvas.getContext('2d');
  if (!g) return canvas;
  const grad = g.createRadialGradient(128, 64, 0, 128, 64, 128);
  grad.addColorStop(0, 'rgba(4,26,90,0.38)');
  grad.addColorStop(1, 'rgba(4,26,90,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 128);
  return canvas;
};

const loadImage = (src: string): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

/**
 * A ring of photo frames that turns in steps and settles on one frame at a time, like a carousel.
 * Drag (mouse or finger) to turn it, tap a frame to open the gallery, and it pauses while the pointer is over it.
 * Each frame keeps its photo's own proportions, so nothing is cropped. three.js loads only when the component is shown,
 * and the scene stops rendering when it is scrolled out of view.
 */
export const GalleryFrames3D: React.FC<GalleryFrames3DProps> = ({
  className = '',
  images = [],
  fallback,
  reduceMotion = false,
  onActivate,
  placeholderLabel,
  brandLabel = 'SPI',
}) => {
  // Three.js draws into its own container, so React never shares child nodes with the canvas.
  const glRef = useRef<HTMLDivElement>(null);
  const activateRef = useRef(onActivate);
  const [ready, setReady] = useState(false);
  const imageKey = images.map((i) => i.src).join('|');

  useEffect(() => {
    activateRef.current = onActivate;
  }, [onActivate]);

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

      const loaded = (await Promise.all(images.slice(0, SLOTS).map((i) => loadImage(i.src)))).filter(
        (img): img is HTMLImageElement => img !== null,
      );
      if (disposed) return;

      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const canvas = document.createElement('canvas');
      canvas.className = 'absolute inset-0 h-full w-full';
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: !isCoarse, alpha: true });
      } catch {
        return;
      }
      host.appendChild(canvas);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarse ? 1.5 : 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      const anisotropy = renderer.capabilities.getMaxAnisotropy();

      scene.add(new THREE.AmbientLight(0xffffff, 1.5));
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(3, 5, 6);
      scene.add(key);

      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
      const materials: InstanceType<typeof THREE.Material>[] = [];
      const textures: InstanceType<typeof THREE.Texture>[] = [];
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0 });
      materials.push(bodyMat);

      // real photos first, then branded placeholders so the ring is always full
      const faces: { tex: InstanceType<typeof THREE.Texture>; aspect: number }[] = [];
      loaded.forEach((img) => {
        const tex = new THREE.Texture(img);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = anisotropy;
        tex.needsUpdate = true;
        textures.push(tex);
        faces.push({ tex, aspect: Math.min(1.6, Math.max(0.7, img.naturalWidth / img.naturalHeight)) });
      });
      for (let i = faces.length; i < SLOTS; i++) {
        const tex = new THREE.CanvasTexture(drawPlaceholder(i, placeholderLabel, brandLabel));
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = anisotropy;
        textures.push(tex);
        faces.push({ tex, aspect: 4 / 3 });
      }

      const ring = new THREE.Group();
      scene.add(ring);
      const step = (Math.PI * 2) / SLOTS;

      const frames = faces.map(({ tex, aspect }, index) => {
        const group = new THREE.Group();
        const faceH = CARD_WIDTH / aspect;
        const bodyGeo = new RoundedBoxGeometry(CARD_WIDTH + 0.24, faceH + 0.24, 0.14, 2, 0.06);
        const faceGeo = new THREE.PlaneGeometry(CARD_WIDTH, faceH);
        geometries.push(bodyGeo, faceGeo);
        const faceMat = new THREE.MeshBasicMaterial({ map: tex });
        materials.push(faceMat);
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        const face = new THREE.Mesh(faceGeo, faceMat);
        face.position.z = 0.075;
        group.add(body, face);
        ring.add(group);
        return { group, face, index };
      });

      const shadowTex = new THREE.CanvasTexture(drawShadow());
      textures.push(shadowTex);
      const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
      const shadowGeo = new THREE.PlaneGeometry(RING_RADIUS * 3.2, RING_RADIUS * 1.6);
      materials.push(shadowMat);
      geometries.push(shadowGeo);
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = -1.6;
      scene.add(shadow);

      // Camera distance keeps the whole ring in frame at any container shape (phone, tablet, desktop).
      const fit = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const halfTan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const distW = ((RING_RADIUS + CARD_WIDTH / 2) * 0.9 + 0.5) / (camera.aspect * halfTan);
        const distH = 1.9 / halfTan;
        camera.position.set(0, 0.5, Math.max(distW, distH));
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      };
      fit();

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const pickFrame = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        raycaster.setFromCamera(pointer, camera);
        return raycaster.intersectObjects(frames.map((f) => f.face), false).length > 0;
      };

      // turning state: `angle` eases toward `target`, one frame step at a time
      let angle = 0;
      let target = 0;
      let dragging = false;
      let pointerDown = false;
      let hovered = false;
      let visible = true;
      let downX = 0;
      let downY = 0;
      let lastX = 0;
      let lastStep = performance.now();
      let last = performance.now();
      let running = false;

      const draw = (now: number, dt: number) => {
        const t = now / 1000;
        const motion = reduceMotion ? 0 : 1;
        if (!dragging && !hovered && !reduceMotion && now - lastStep > STEP_MS) {
          target += step;
          lastStep = now;
        }
        angle += (target - angle) * (1 - Math.exp(-dt * 7));

        frames.forEach(({ group, index }) => {
          const th = wrap(index * step + angle);
          const front = Math.max(0, Math.cos(th));
          const pop = Math.pow(front, 8);
          group.position.set(
            Math.sin(th) * RING_RADIUS,
            (Math.sin(t * 1.1 + index * 1.3) * 0.07 + pop * 0.08) * motion,
            Math.cos(th) * RING_RADIUS + pop * 0.6,
          );
          group.rotation.set(0, th, Math.sin(t * 0.9 + index) * 0.035 * motion);
          group.scale.setScalar(1 + pop * 0.08);
        });

        renderer.render(scene, camera);
      };

      const loop = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        draw(now, dt);
        const settled = Math.abs(target - angle) < 0.0008;
        if (visible && (!reduceMotion || !settled || dragging)) {
          frame = requestAnimationFrame(loop);
        } else {
          running = false;
        }
      };
      const kick = () => {
        if (running || !visible) return;
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(loop);
      };

      const onDown = (e: PointerEvent) => {
        pointerDown = true;
        dragging = true;
        downX = e.clientX;
        downY = e.clientY;
        lastX = e.clientX;
        host.setPointerCapture?.(e.pointerId);
        kick();
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) {
          host.style.cursor = pickFrame(e) ? 'pointer' : 'grab';
          return;
        }
        angle += (e.clientX - lastX) * 0.011;
        target = angle;
        lastX = e.clientX;
      };
      const onUp = (e: PointerEvent) => {
        if (!pointerDown) return;
        pointerDown = false;
        const tap = Math.hypot(e.clientX - downX, e.clientY - downY) < 8;
        dragging = false;
        if (tap && pickFrame(e)) activateRef.current?.();
        target = Math.round(angle / step) * step;
        lastStep = performance.now();
        kick();
      };
      const onEnter = (e: PointerEvent) => {
        hovered = e.pointerType === 'mouse';
      };
      const onLeave = () => {
        hovered = false;
        host.style.cursor = '';
      };

      host.addEventListener('pointerdown', onDown);
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerup', onUp);
      host.addEventListener('pointercancel', onUp);
      host.addEventListener('pointerenter', onEnter);
      host.addEventListener('pointerleave', onLeave);

      const resizeObserver = new ResizeObserver(() => {
        fit();
        kick();
      });
      resizeObserver.observe(host);

      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      });
      visibility.observe(host);

      kick();
      setReady(true);

      stop = () => {
        cancelAnimationFrame(frame);
        visibility.disconnect();
        resizeObserver.disconnect();
        host.removeEventListener('pointerdown', onDown);
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerup', onUp);
        host.removeEventListener('pointercancel', onUp);
        host.removeEventListener('pointerenter', onEnter);
        host.removeEventListener('pointerleave', onLeave);
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        textures.forEach((tx) => tx.dispose());
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
    // the scene is rebuilt only when the set of photos or the motion preference changes
  }, [reduceMotion, imageKey, placeholderLabel, brandLabel]);

  return (
    <div
      className={`relative ${className}`}
      aria-hidden="true"
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: 'none', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'pan-y' }}
    >
      {!ready && fallback}
      <div ref={glRef} className="absolute inset-0" />
    </div>
  );
};
