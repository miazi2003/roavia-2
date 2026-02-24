import React from 'react';
import { Link } from 'react-router'; 
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const HomeAboutSection = () => {
  return (
    <section className="w-full bg-[#3B4E42] py-20 lg:py-16 px-6 lg:px-16 overflow-hidden relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 w-full  mx-auto">

        {/* --- LEFT SIDE: IMAGE --- */}
        <motion.div 
          className="w-full lg:w-1/2 relative mt-8 lg:mt-0 order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }} // Slide in from Left
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative Back Shape */}
          <div className="absolute -inset-4 md:-inset-6 bg-white/5 rounded-[2.5rem] transform -rotate-3 -z-10 backdrop-blur-sm border border-white/10 hidden md:block"></div>

          {/* Main Image Container */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] aspect-[4/3] w-full group">
            <img 
              src={"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"} 
              alt="Explore with ROAVIA" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3B4E42]/60 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Floating Stat Card (Positioned Right Side now) */}
          <motion.div 
            className="absolute -bottom-6 -right-4 md:bottom-8 md:-right-12 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-5 rounded-2xl shadow-2xl z-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl md:text-5xl font-black text-white drop-shadow-md">
                10<span className="text-green-300">+</span>
              </div>
              <div className="text-white/80 text-sm md:text-base font-medium leading-tight border-l border-white/20 pl-4">
                Years of <br /> Adventure
              </div>
            </div>
          </motion.div>

        </motion.div>


        {/* --- RIGHT SIDE: CONTENT --- */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col items-start text-left order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }} // Slide in from Right
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
        
          <span className="text-green-300 tracking-[0.2em] text-sm font-bold uppercase block mb-4">
            The ROAVIA Philosophy
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
            Journey Beyond <br className="hidden lg:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white/90 font-light italic">The Ordinary.</span>
          </h2>

          <div className="space-y-6 mb-10">
             <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light">
               We believe that travel is more than just visiting a destination; it's about immersing yourself in the culture, connecting with nature, and creating stories that last a lifetime.
             </p>
             <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
               Whether you seek the thrill of the mountains or the serenity of the coast, our expert guides are ready to lead you off the beaten path into the extraordinary.
             </p>
          </div>

          <Link to="/about">
            <button className="group flex items-center gap-3 bg-transparent border-2 border-green-300 text-green-300 font-bold py-3.5 px-8 rounded-full hover:bg-green-300 hover:text-[#3B4E42] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]">
              Discover Our Story
              <FiArrowRight className="text-xl transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </Link>

        </motion.div>

      </div>
    </section>
  );
};

export default HomeAboutSection;