import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGlobe, FiMapPin, FiNavigation } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);


const Earth = () => {
  const earthRef = useRef();
  
  const [colorMap] = useLoader(TextureLoader, [
    "https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
  ]);

  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#globe-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (earthRef.current) {
          earthRef.current.rotation.y = self.progress * Math.PI * 4; 
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (

    <mesh ref={earthRef} scale={2.5}> 
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={colorMap} 
        roughness={0.7} 
        metalness={0.1}
      />
    </mesh>
  );
};

const GlobeSection = () => {
  return (
    <section 
      id="globe-section" 
      className="w-full min-h-[80vh] bg-[#3B4E42] flex flex-col-reverse lg:flex-row items-center justify-center overflow-hidden relative py-20 gap-10"
    >

      <div className="absolute inset-0 bg-gradient-to-r from-[#3B4E42] via-[#3B4E42]/90 to-black/40 z-0 pointer-events-none"></div>


      <div className="w-full lg:w-1/2 px-6 md:pl-16 relative z-10 flex justify-center lg:justify-start">
        <div className="max-w-xl">
          <span className="text-green-300 tracking-[0.2em] text-sm font-bold uppercase block mb-4">
            Global Connectivity
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Explore a World <br />
            Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">Borders.</span>
          </h2>
          <p className="text-white/80 text-lg font-light leading-relaxed mb-10">
            From the bustling streets of Tokyo to the serene landscapes of Iceland. Our network covers over 150 countries, ensuring you are never far from your next great adventure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/20 hover:border-green-300 transition-colors duration-300">
              <div className="p-3 rounded-lg text-green-300 bg-white/5">
                <FiGlobe size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">150+ Countries</h4>
                <p className="text-white/60 text-sm">Visa support included</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/20 hover:border-green-300 transition-colors duration-300">
              <div className="p-3 rounded-lg text-green-300 bg-white/5">
                <FiMapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Local Guides</h4>
                <p className="text-white/60 text-sm">Native speakers worldwide</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-xl border border-white/20 hover:border-green-300 transition-colors duration-300">
              <div className="p-3 rounded-lg text-green-300 bg-white/5">
                <FiNavigation size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">24/7 Support</h4>
                <p className="text-white/60 text-sm">Always by your side</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
        

        <div className="w-full max-w-[700px] h-[400px] md:h-[700px] relative">

            <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }}>
            <ambientLight intensity={0.5} color="#ffffff" />
            <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
            <pointLight position={[-5, -2, -5]} intensity={0.5} color="#4ade80" />

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            <React.Suspense fallback={null}>
                <Earth />
            </React.Suspense>
            
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
            </Canvas>
        </div>

      </div>
    </section>
  );
};

export default GlobeSection;