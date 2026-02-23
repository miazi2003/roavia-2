import React, { useEffect } from "react";
import { Link } from "react-router"; // Fixed import
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLongArrowAltRight } from "react-icons/fa";

import pic1 from "../../../assets/tour1.jpg";
import pic2 from "../../../assets/tour2.jpg";
import pic3 from "../../../assets/tour3.jpg";
import pic4 from "../../../assets/tour4.jpg";

const HomeOverview = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true,
      easing: 'ease-out-cubic' // Smoother animation curve
    });
  }, []);

  return (
    <section className="bg-[#3B4E42] py-12 lg:py-16 overflow-hidden mt-1">
      <div className=" mx-auto px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Staggered Image Grid */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl">
            
            {/* Column 1 (Pushed down slightly for the masonry effect) */}
            <div className="flex flex-col gap-4 md:gap-6 pt-8 md:pt-12">
              <div 
                className="overflow-hidden rounded-2xl shadow-xl group" 
                data-aos="fade-up" 
                data-aos-delay="100"
              >
                <img src={pic1} alt="Tour 1" className="h-48 md:h-64 w-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div 
                className="overflow-hidden rounded-2xl shadow-xl group" 
                data-aos="fade-up" 
                data-aos-delay="200"
              >
                <img src={pic3} alt="Tour 3" className="h-40 md:h-56 w-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 md:gap-6">
              <div 
                className="overflow-hidden rounded-2xl shadow-xl group" 
                data-aos="fade-up" 
                data-aos-delay="300"
              >
                <img src={pic2} alt="Tour 2" className="h-40 md:h-56 w-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div 
                className="overflow-hidden rounded-2xl shadow-xl group" 
                data-aos="fade-up" 
                data-aos-delay="400"
              >
                <img src={pic4} alt="Tour 4" className="h-48 md:h-64 w-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Text & CTA */}
        <div className="w-full lg:w-1/2 text-center lg:text-left" data-aos="fade-left" data-aos-delay="200">
          
          {/* Subheading Kicker */}
          <span className="text-white/70 tracking-[0.2em] text-sm font-bold uppercase block mb-4">
            Discover The World
          </span>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Why Explore with  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              ROAVIA?
            </span>
          </h2>
          
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-5xl mx-auto lg:mx-0 font-light">
            Unlock the true beauty of your travel destinations with ROAVIA’s expertly curated guides and exclusive experiences. Discover more, explore deeper, and travel smarter.
          </p>
          
          <div className="flex justify-center lg:justify-start">
            <Link to="/overview">
              <button className="group flex items-center gap-4 px-8 py-4 font-bold text-[#3B4E42] bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300">
                See Overview 
                {/* Arrow translates to the right on group hover */}
                <FaLongArrowAltRight className="text-xl transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HomeOverview;