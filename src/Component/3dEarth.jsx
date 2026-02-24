import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Stars, Html } from '@react-three/drei';


const EARTH_TEXTURE_URL = "https://upload.wikimedia.org/wikipedia/commons/c/c3/Aurora_as_seen_by_IMAGE_satellite_in_UV_%28without_Aurora%29.jpg";

function EarthSphere() {
 
  const colorMap = useLoader(TextureLoader, EARTH_TEXTURE_URL);

  return (

    <mesh rotation={[0, 0, 0.2]}> 

      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial
        map={colorMap} 
        metalness={0.2}
        roughness={0.7}
      />
    </mesh>
  );
}

function Loader() {
  return <Html center className="text-white">Loading Globe...</Html>;
}

export default function SimpleGlobe() {
  return (

    <div className="w-full h-[600px] bg-[#0a0a0a] relative overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
   
        <pointLight position={[-10, -10, -10]} color="#4ade80" intensity={1} />

        <Stars radius={300} depth={60} count={10000} factor={7} saturation={0} fade />

        <Suspense fallback={<Loader />}>
          <EarthSphere />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={true} 
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}