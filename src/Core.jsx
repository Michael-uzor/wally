import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot, extend, useFrame} from '@react-three/fiber';
import {
  AmbientLight, Group, IcosahedronGeometry, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PointLight, Points, PointsMaterial, SphereGeometry,
  TorusGeometry,
} from 'three';

// Canvas registers the entire Three.js namespace. A selective catalogue lets
// Rollup remove geometries, materials, loaders, and helpers this scene never uses.
extend({AmbientLight, Group, Mesh, PointLight, Points});

function Orb({reduced}) {
  const group = useRef();
  const resources = useMemo(() => ({
    core: new IcosahedronGeometry(1.38, 2),
    shell: new MeshStandardMaterial({color: '#063842', metalness: .86, roughness: .24}),
    wire: new MeshBasicMaterial({color: '#46d8ef', wireframe: true, transparent: true, opacity: .32}),
    rings: [0, 1, 2, 3].map(x => new TorusGeometry(1.7 + x * .095, .009, 8, 150)),
    ringMaterials: ['#266574', '#6cddec'].map(color => new MeshBasicMaterial({color, transparent: true, opacity: .65})),
    orbit: new TorusGeometry(2.15, .015, 8, 150, Math.PI * 1.5),
    orbitMaterial: new MeshBasicMaterial({color: '#8eeeff'}),
    particles: new SphereGeometry(2.45, 28, 16),
    particleMaterial: new PointsMaterial({size: .013, color: '#8edce8', transparent: true, opacity: .4}),
  }), []);

  useEffect(() => () => {
    // Resources are owned here rather than individually by the meshes, since
    // the solid/wire geometry and alternating ring materials are shared.
    Object.values(resources).flat().forEach(resource => resource.dispose());
  }, [resources]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * .055;
    group.current.rotation.z = -.25 + state.pointer.x * .06;
    group.current.rotation.x = state.pointer.y * .08;
  });

  return <group ref={group} rotation={[.2, 0, -.25]} dispose={null}>
    <mesh geometry={resources.core} material={resources.shell}/>
    <mesh scale={1.008} geometry={resources.core} material={resources.wire}/>
    {[0, 1, 2, 3].map(x => <group key={x} rotation={[Math.PI * .37 + x * .32, x * .62, .2]}>
      <mesh geometry={resources.rings[x]} material={resources.ringMaterials[x % 2]}/>
    </group>)}
    <mesh rotation={[1.3, .2, .4]} geometry={resources.orbit} material={resources.orbitMaterial}/>
    <points geometry={resources.particles} material={resources.particleMaterial}/>
  </group>;
}

class RenderBoundary extends React.Component {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Core() {
  const host = useRef(null);
  const canvas = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) return;
    const element = host.current;
    const surface = canvas.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let root;
    let store;
    let stopped = false;
    let visible = element.getBoundingClientRect().bottom > 0 && element.getBoundingClientRect().top < innerHeight;
    let reduced = motion.matches;
    const fail = () => { if (!stopped) setFailed(true); };
    const active = () => visible && !document.hidden && !reduced;
    const update = () => {
      if (!store || stopped) return;
      // Resetting the clock prevents time spent paused from advancing rotation.
      store.getState().setFrameloop(active() ? 'always' : 'demand');
      root.render(scene());
    };
    const scene = () => <RenderBoundary onError={fail}>
      <ambientLight intensity={.7}/>
      <pointLight position={[2, 3, 4]} intensity={28} color="#68eaff"/>
      <pointLight position={[-3, -1, 2]} intensity={12} color="#167791"/>
      <Orb reduced={reduced}/>
    </RenderBoundary>;
    const measure = () => {
      if (!store || stopped) return;
      const {width, height, top, left} = element.getBoundingClientRect();
      store.getState().setSize(width, height, top, left);
    };
    const pointer = event => {
      if (!store || reduced) return;
      const {left, top, width, height} = element.getBoundingClientRect();
      store.getState().pointer.set((event.clientX - left) / width * 2 - 1, -(event.clientY - top) / height * 2 + 1);
    };
    const onMotion = () => { reduced = motion.matches; update(); };
    const onContextLost = event => { event.preventDefault(); fail(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (visible === entry.isIntersecting) return;
      visible = entry.isIntersecting;
      update();
    });
    const resize = new ResizeObserver(measure);

    async function start() {
      try {
        // Pass the real canvas directly: no throwaway WebGL capability context.
        // Renderer creation failures leave the existing CSS fallback visible.
        root = createRoot(surface);
        await root.configure({
          camera: {position: [0, 0, 6.3], fov: 45},
          dpr: [1, 1.5],
          frameloop: active() ? 'always' : 'demand',
          gl: {alpha: true, antialias: true},
          size: (() => { const {width, height, top, left} = element.getBoundingClientRect(); return {width, height, top, left}; })(),
        });
        if (stopped) return;
        store = root.render(scene());
        observer.observe(element);
        resize.observe(element);
        surface.addEventListener('pointermove', pointer, {passive: true});
        surface.addEventListener('webglcontextlost', onContextLost);
        motion.addEventListener('change', onMotion);
        document.addEventListener('visibilitychange', update);
      } catch { fail(); }
    }
    start();
    return () => {
      stopped = true;
      observer.disconnect();
      resize.disconnect();
      surface.removeEventListener('pointermove', pointer);
      surface.removeEventListener('webglcontextlost', onContextLost);
      motion.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', update);
      root?.unmount();
    };
  }, [failed]);

  return <div ref={host} style={{position: 'absolute', inset: 0}} aria-hidden="true">
    {!failed && <canvas ref={canvas} style={{display: 'block', width: '100%', height: '100%'}}/>}
  </div>;
}
