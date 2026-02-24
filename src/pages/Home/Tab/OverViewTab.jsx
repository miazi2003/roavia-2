import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiMap } from 'react-icons/fi';

import OverViewTabCard from './OverViewTabCard';
import useAxiosSecure from '../../../hook/useAxiosSecure';

// Framer Motion variants for a staggered fade-in effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const OverViewTab = () => {
  const axiosSecure = useAxiosSecure();

  const { data: randomData = [], isLoading, isError } = useQuery({
    // Changed queryKey to prevent cache collisions with the Tour Guides component
    queryKey: ['overviewRandomTours'], 
    queryFn: async () => {
      const res = await axiosSecure.get('/random-tours');
      const data = res.data;
      console.log("Random tours:", data.length, data);
      return data;
    },
  });

  // 1. Premium Skeleton Loading State (Matches the Tour Guides)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full">
        {[...Array(6)].map((_, idx) => (
          <div 
            key={idx} 
            className="animate-pulse bg-[#3B4E42]/5 rounded-2xl h-96 w-full border border-[#3B4E42]/10 overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="h-56 bg-[#3B4E42]/15 w-full"></div>
            {/* Text Placeholders */}
            <div className="p-5 space-y-4">
              <div className="h-5 bg-[#3B4E42]/20 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-[#3B4E42]/15 rounded w-full"></div>
                <div className="h-3 bg-[#3B4E42]/15 rounded w-5/6"></div>
              </div>
              <div className="h-8 bg-[#3B4E42]/20 rounded-full w-1/2 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Elegant Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4 w-full">
        <div className="bg-red-50 p-4 rounded-full mb-4 text-red-400 shadow-sm">
          <FiAlertCircle className="text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-[#3B4E42] mb-2">Failed to load tours</h3>
        <p className="text-gray-500 max-w-md">We encountered an issue while fetching the latest tour packages. Please refresh the page.</p>
      </div>
    );
  }

  // 3. Empty State (If no tours are found)
  if (randomData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4 w-full">
        <div className="bg-[#3B4E42]/10 p-4 rounded-full mb-4 text-[#3B4E42]/60 shadow-sm">
          <FiMap className="text-4xl" />
        </div>
        <h3 className="text-xl font-bold text-[#3B4E42] mb-2">No Tours Found</h3>
        <p className="text-gray-500 max-w-md">There are currently no tour packages available in this section. Check back soon!</p>
      </div>
    );
  }

  // 4. Success State with Animations
  return (
    <motion.div 
      className="p-4 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        {randomData.map((tour, idx) => (
          // Using tour._id as the key is safer than the array index (idx)
          <motion.div key={tour._id || idx} variants={itemVariants} className="h-full">
            <OverViewTabCard data={tour} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OverViewTab;