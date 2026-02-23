import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

// IMPORT YOUR IMAGE HERE
// import aboutImage from '../../../assets/tour-about.jpg'; 

const HomeAboutSection = () => {
  return (
    // w-full with NO max-width, using lg:px-16 for the elegant edge spacing
    <section className="w-full bg-[#3B4E42] py-20 lg:py-16 px-6 lg:px-16 overflow-hidden">
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 w-full">

        {/* --- LEFT SIDE: TEXT CONTENT --- */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} // Animates when 30% of it is in view
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Kicker / Subheading */}
          <span className="text-white/60 tracking-[0.2em] text-sm font-bold uppercase block mb-4">
            The ROAVIA Philosophy
          </span>
          
          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Journey Beyond <br className="hidden lg:block"/> 
            <span className="text-white/80 font-light italic">The Ordinary.</span>
          </h2>
          
          {/* Description */}
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-light max-w-2xl">
            We believe that travel is more than just visiting a destination; it's about immersing yourself in the culture, connecting with nature, and creating stories that last a lifetime. Let our expert guides lead you off the beaten path.
          </p>

          {/* Call to Action Button */}
          <Link to="/about">
            <button className="group flex items-center gap-3 bg-transparent border-2 border-white text-white font-bold py-3.5 px-8 rounded-full hover:bg-white hover:text-[#3B4E42] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              About Us
              <FiArrowRight className="text-xl transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </Link>
        </motion.div>


        {/* --- RIGHT SIDE: IMAGE W/ GLASS BADGE --- */}
        <motion.div 
          className="w-full lg:w-1/2 relative mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Decorative rotated border behind the image */}
          <div className="absolute -inset-4 md:-inset-6 bg-white/5 rounded-[2.5rem] transform rotate-3 -z-10 backdrop-blur-sm border border-white/10 hidden md:block"></div>

          {/* The Main Image Container */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] aspect-[4/3] w-full">
            <img 
              // Replace placeholder with your {aboutImage} variable
              src={"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"} 
              alt="Explore with ROAVIA" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            {/* Dark green gradient overlay to make the image blend perfectly into the background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3B4E42]/80 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Floating Glassmorphism Experience Badge */}
          <motion.div 
            className="absolute -bottom-6 -left-4 md:bottom-8 md:-left-12 bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-5 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
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

      </div>
    </section>
  );
};

export default HomeAboutSection;