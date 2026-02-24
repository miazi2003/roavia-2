import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { format } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiShare2, FiHeart } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ViewStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axiosSecure.get(`/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [axiosSecure, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!story) return <div className="min-h-screen bg-[#3B4E42] text-white flex justify-center items-center">Story not found.</div>;

  const images = Array.isArray(story.imageList) && story.imageList.length > 0 
    ? story.imageList 
    : [story.image];

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white py-12 px-4 md:px-8">
      
      <div className="max-w-4xl mx-auto">
        <Link to="/community" className="inline-flex items-center gap-2 text-white/60 hover:text-green-300 transition-colors mb-8 group">
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-green-300 group-hover:text-[#3B4E42] transition-all">
            <FiArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Community</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          
          <div className="relative w-full h-[400px] md:h-[500px] bg-[#2c3a31]">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={images.length > 1}
              className="h-full w-full"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-full">
                    <img
                      src={img}
                      alt={`Story moment ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B4E42] via-transparent to-transparent opacity-80"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-300 text-[#3B4E42] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Travel Log
                </span>
                <span className="flex items-center gap-1 text-white/80 text-sm backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/10">
                  <FiCalendar size={14} className="text-green-300" />
                  {format(new Date(story.createdAt), "MMMM dd, yyyy")}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                {story.title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed whitespace-pre-wrap text-lg font-light">
                {story.story}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all">
                <FiHeart size={20} />
                <span>Like Story</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-green-300 hover:text-[#3B4E42] transition-all">
                <FiShare2 size={20} />
                <span>Share</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ViewStory;