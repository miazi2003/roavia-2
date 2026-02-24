import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thanks for subscribing to ROAVIA!");
  };

  return (
    <section className="bg-[#3B4E42] py-16 px-4 md:px-8 w-full relative overflow-hidden">
      

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
  
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-14 lg:p-20 text-center shadow-2xl relative overflow-hidden">
          
      
          <FiMail className="absolute -bottom-10 -right-10 text-[15rem] text-white/5 -rotate-12 pointer-events-none" />


          <span className="text-white/60 tracking-[0.2em] text-sm font-bold uppercase block mb-4">
            Join The Explorer's Club
          </span>

   
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Get exclusive <span className="font-light italic text-white/80">travel offers</span> <br className="hidden md:block" /> directly to your inbox.
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto text-lg font-light mb-10">
            Subscribe to the ROAVIA newsletter and be the first to know about new curated packages, secret destinations, and receive a 10% discount on your first booking.
          </p>

   
          <form 
            onSubmit={handleSubmit} 
            className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 sm:bg-white/10 sm:border sm:border-white/20 sm:p-1.5 sm:rounded-full sm:focus-within:border-white/50 sm:focus-within:bg-white/15 transition-all duration-300 shadow-lg"
          >
            <div className="flex-1 flex items-center bg-white/10 sm:bg-transparent border border-white/20 sm:border-none rounded-full sm:rounded-none px-6 py-4 sm:py-0">
              <FiMail className="text-white/50 text-xl mr-3" />
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                required
                className="w-full bg-transparent text-white placeholder-white/50 outline-none font-medium"
              />
            </div>
            
            <button 
              type="submit" 
              className="group flex items-center justify-center gap-2 bg-white text-[#3B4E42] font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 w-full sm:w-auto"
            >
              Subscribe
              <FiSend className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </form>


          <p className="text-white/40 text-xs mt-6 font-light tracking-wide">
            We respect your privacy. No spam, ever. Unsubscribe at any time.
          </p>

        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;