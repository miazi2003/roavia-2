import React from 'react';
import one from "../../../assets/one.jpg";
import two from "../../../assets/two.jpg";
import three from "../../../assets/three.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// Storing slide data in an array keeps the component clean and easy to maintain
const sliderData = [
  {
    id: 1,
    image: one,
    title: "Chase the Sunrise, Conquer the Unknown",
    subtitle: "Discover uncharted lands with ROAVIA — adventure lives beyond the familiar.",
    btnText: "Explore Packages"
  },
  {
    id: 2,
    image: two,
    title: (
      <>
        Enjoy Your Tour <br /> Travel Smarter with ROAVIA
      </>
    ),
    subtitle: "Efficient, seamless, and reliable corporate travel solutions for global achievers.",
    btnText: "Book Your Trip"
  },
  {
    id: 3,
    image: three,
    title: "Sail into Serenity, Find Your Escape",
    subtitle: "Let ROAVIA guide you through nature’s hidden gems — peace awaits beyond the shores.",
    btnText: "Discover More"
  }
];

const Banner = () => {
  return (
    // Changed to w-full for a true full-bleed cinematic hero section
    <div className="w-full mx-auto overflow-hidden">
      <Carousel 
        showThumbs={false} 
        showStatus={false} 
        infiniteLoop 
        autoPlay 
        interval={6000} // Slightly longer interval for a more relaxed, premium feel
        stopOnHover={false}
        swipeable={true}
        emulateTouch={true}
      >
        {sliderData.map((slide) => (
          <div key={slide.id} className="h-[80vh] md:h-[85vh] relative w-full flex items-center">
            {/* Background Image */}
            <img 
              src={slide.image} 
              alt={`Slide ${slide.id}`} 
              className="w-full h-full object-cover object-center absolute inset-0 z-0" 
            />
            
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>

            {/* Content Wrapper */}
            <div className="relative z-20 flex flex-col items-start justify-center h-full pl-6 md:pl-20 pr-6 max-w-3xl text-left">
              
              {/* Animated Accent Line */}
              <div className="w-16 h-1 bg-white mb-6 rounded-full opacity-80"></div>
              
              <h1 className="font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              
              <p className="text-gray-200 mt-6 text-lg md:text-xl font-light tracking-wide drop-shadow-md max-w-xl">
                {slide.subtitle}
              </p>
              
              <div className="mt-8 flex gap-4">
                <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {slide.btnText}
                </button>
              </div>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;