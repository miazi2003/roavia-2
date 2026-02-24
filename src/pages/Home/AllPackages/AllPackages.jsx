import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiMap, FiSearch } from "react-icons/fi";

import OverViewTabCard from "../Tab/OverViewTabCard";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const AllPackages = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tours = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allTours"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tours-package");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 rounded-full animate-spin"></div>
          <p className="text-white/70 tracking-widest text-sm uppercase">Loading Adventures...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center text-center px-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Oops! Something went wrong.</h2>
          <p className="text-white/60">We couldn't load the packages. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3B4E42] py-20 px-4 md:px-8">
      <div className=" mx-auto px-8 lg:px-16">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-300/30 bg-green-300/10 text-green-300 mb-6">
            <FiMap size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Our Collection</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Curated Tour <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">Packages</span>
          </h1>
          
          <p className="text-white/70 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover the beauty of Bangladesh through our handpicked itineraries. 
            From scenic landscapes to cultural heritage, find the perfect journey crafted just for you.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {tours.map((tour) => (
            <motion.div key={tour._id} variants={cardVariants} className="h-full">
              <OverViewTabCard data={tour} />
            </motion.div>
          ))}
        </motion.div>

        {tours.length === 0 && (
          <div className="text-center py-20 border border-white/10 rounded-3xl bg-white/5">
            <FiSearch className="mx-auto text-white/30 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No packages found</h3>
            <p className="text-white/60">Check back later for new adventures.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllPackages;