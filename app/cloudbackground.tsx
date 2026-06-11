'use client';

import { useMemo, useRef, type ComponentType } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Sky } from '@react-three/drei';

const CloudAny = Cloud as unknown as ComponentType<any>;

function FloatingClouds() {
  const group = useRef<any>(null);

  const clouds = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        position: [index * 4 - 24, 4 + ((index % 3) - 1) * 1.6, -index * 3] as [number, number, number],
        speed: 0.01 + Math.random() * 0.02,
        scale: 5 + (index % 4) * 1.4,
      })),
    []
  );

  useFrame((_, delta) => {
    const t = _.clock.getElapsedTime();
    if (!group.current) return;
    group.current.children.forEach((cloud: any, index: number) => {
      const cfg = clouds[index];
      // horizontal movement
      cloud.position.x += cfg.speed * delta * 6;
      if (cloud.position.x > 40) cloud.position.x = -40 - Math.random() * 10;
      // gentle vertical bobbing
      const baseY = cfg.position[1];
      cloud.position.y = baseY + Math.sin(t * cfg.speed * 2 + index) * (0.6 + (index % 3) * 0.2);
      // slight rotation for a more organic feel
      cloud.rotation.y += 0.01 * (0.5 + cfg.speed);
      cloud.rotation.z = Math.sin(t * 0.2 + index) * 0.12;
    });
  });

  return (
    <group ref={group}>
      {clouds.map((item, index) => (
        <CloudAny
          key={index}
          position={item.position}
          scale={item.scale}
          width={14}
          depth={4}
          segments={30}
          opacity={0.65}
          color="#ffffff"
        />
      ))}
    </group>
  );
}

export default function CloudBackground(): React.JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <Canvas
        gl={{ antialias: true }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        camera={{ position: [0, 8, 30], fov: 45 }}
      >
        <fog attach="fog" args={["#bfe7ff", 8, 90]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <Sky sunPosition={[100, 20, 100]} turbidity={8} rayleigh={0.5} />
        <FloatingClouds />
      </Canvas>
    </div>
  );
}