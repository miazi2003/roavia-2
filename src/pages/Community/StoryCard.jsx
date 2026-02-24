import React from "react";
import { Link } from "react-router";
import { format } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FiCalendar, FiUser, FiArrowRight, FiShare2, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const StoryCard = ({ story }) => {
  const imageList = Array.isArray(story.imageList) && story.imageList.length > 0
    ? story.imageList
    : [story.image];

  const hasMultipleImages = imageList.length > 1;

  return (
    <div className="group relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      
      <div className="relative h-64 w-full bg-[#2c3a31] overflow-hidden">
        {hasMultipleImages ? (
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{
              nextEl: `.swiper-button-next-${story._id}`,
              prevEl: `.swiper-button-prev-${story._id}`,
            }}
            className="h-full w-full group/slider"
          >
            {imageList.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Story visual ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B4E42]/80 via-transparent to-transparent opacity-60"></div>
              </SwiperSlide>
            ))}
            
            <button className={`swiper-button-prev-${story._id} absolute top-1/2 left-2 z-20 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-green-300 hover:text-[#3B4E42] transition-all opacity-0 group-hover/slider:opacity-100`}>
              <FiChevronLeft size={18} />
            </button>
            <button className={`swiper-button-next-${story._id} absolute top-1/2 right-2 z-20 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-green-300 hover:text-[#3B4E42] transition-all opacity-0 group-hover/slider:opacity-100`}>
              <FiChevronRight size={18} />
            </button>
          </Swiper>
        ) : (
          <>
            <img
              src={imageList[0]}
              alt={story.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B4E42]/80 via-transparent to-transparent opacity-60"></div>
          </>
        )}

        <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Adventure
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        
        <div className="flex items-center justify-between text-white/50 text-xs mb-4">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-green-300" />
            <span>{story.createdAt ? format(new Date(story.createdAt), "MMM dd, yyyy") : "Date N/A"}</span>
          </div>
          <button className="hover:text-white transition-colors">
            <FiShare2 size={14} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-green-300 transition-colors duration-300">
          {story.title}
        </h3>

        <div className="flex items-center gap-2 mb-6 mt-auto">
          <div className="w-8 h-8 rounded-full bg-green-300/20 flex items-center justify-center text-green-300 border border-green-300/30">
            <FiUser size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-white/40 uppercase tracking-widest">Posted by</span>
            <span className="text-sm text-white/90 font-medium truncate max-w-[150px]">
              {story.email || "Anonymous Explorer"}
            </span>
          </div>
        </div>

        <Link to={`/viewStory/${story._id}`} className="block mt-auto">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-green-300 hover:text-[#3B4E42] hover:border-green-300 transition-all duration-300">
            Read Full Story
            <FiArrowRight />
          </button>
        </Link>

      </div>
    </div>
  );
};

export default StoryCard;