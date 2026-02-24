import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import { FiMapPin } from 'react-icons/fi';


import nayagra from '../../assets/nayagra.png';
import eiffel from '../../assets/Eiffel-Tower-Tour-1.png';
import rome from '../../assets/rome.png';

function ImageProofBanner() {
  const sampleImages = [
    { image: nayagra, title: "Niagara Travel Adventure", location: "Canada" },
    { image: eiffel, title: "Eiffel Tower Memories", location: "France" },
    { image: rome, title: "Rome Exploration", location: "Italy" },
  ];

  return (
    <div className="w-full bg-[#3B4E42] py-16">
      {/* Section Heading */}
      <div className=" mx-auto px-6 md:px-8 flex flex-col items-center justify-center text-center mb-12">
        <span className="text-white/60 tracking-[0.2em] text-sm font-bold uppercase block mb-3">
          Wanderlust
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Travel Stories & Experiences
        </h2>
        <p className="text-white/80 text-lg max-w-2xl font-light">
          Discover breathtaking moments captured by our explorers. From majestic mountains to serene cityscapes, 
          explore the world through the lens of real travelers.
        </p>
      </div>

      {/* Slider Section */}
      <div className="px-4 md:px-16 h-[60vh] md:h-[75vh]  mx-auto">
        <Swiper
          direction={'vertical'}
          slidesPerView={1}
          spaceBetween={30} 
          mousewheel={{ releaseOnEdges: true }}
          pagination={{ 
            clickable: true,
        
          }}
          modules={[Mousewheel, Pagination]}
          className="mySwiper w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
        >
          {sampleImages.map((slide, idx) => (
            <SwiperSlide key={idx} className="relative group rounded-[2rem] overflow-hidden">
              
              {/* Background Image */}
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              
     
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B4E42]/90 via-[#3B4E42]/30 to-transparent pointer-events-none"></div>
              
 
              <div className="absolute bottom-8 left-6 md:bottom-16 md:left-16 z-10 flex flex-col items-start pr-6">
    
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-4 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                  <FiMapPin className="text-green-300" />
                  <span className="text-white text-xs md:text-sm font-bold tracking-widest uppercase">
                    {slide.location || "Featured"}
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-tight transform translate-y-4 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 transition-all duration-1000 delay-100">
                  {slide.title}
                </h3>

                <div className="w-16 h-1 bg-green-300 rounded-full mt-6 transform scale-x-0 group-[.swiper-slide-active]:scale-x-100 origin-left transition-transform duration-1000 delay-300"></div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      <style>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff !important;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}

export default ImageProofBanner;