import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas className="w-full h-[400px]">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model />
        <OrbitControls enableZoom={false} autoRotate />
      </Suspense>
    </Canvas>
  );
}

export default Scene;