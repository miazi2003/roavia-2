import React, { use } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import TourGuideTabCard from './TourGuideTabCard';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiUsers } from 'react-icons/fi';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const axiosSecure = useAxiosSecure();
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

const TourGuideTab = () => {
  const { data: randomData = [], isLoading, isError } = useQuery({
    queryKey: ['randomTours'],
    queryFn: async () => {
      const res = await axiosSecure.get('/random-guides');
      console.log('TourGuideTab: Fetched data:', res.data);
      return res.data;
    },
  });

  // 1. Premium Skeleton Loading State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-8 w-full">
        {[...Array(8)].map((_, idx) => (
          <div 
            key={idx} 
            className="animate-pulse bg-[#3B4E42]/10 rounded-2xl h-80 w-full border border-[#3B4E42]/5"
          >
            {/* Inner skeleton details to mimic a profile card */}
            <div className="h-48 bg-[#3B4E42]/20 rounded-t-2xl w-full"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-[#3B4E42]/20 rounded w-3/4"></div>
              <div className="h-4 bg-[#3B4E42]/20 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Elegant Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="bg-red-50 p-4 rounded-full mb-4 text-red-400">
          <FiAlertCircle className="text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-[#3B4E42] mb-2">Oops! Couldn't load guides.</h3>
        <p className="text-gray-500 max-w-md">We're having trouble fetching the tour guides right now. Please check your connection and try again.</p>
      </div>
    );
  }

  // 3. Empty State (If API returns empty array)
  if (randomData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="bg-[#3B4E42]/10 p-4 rounded-full mb-4 text-[#3B4E42]/60">
          <FiUsers className="text-4xl" />
        </div>
        <h3 className="text-xl font-bold text-[#3B4E42] mb-2">No Guides Available</h3>
        <p className="text-gray-500 max-w-md">We currently don't have any tour guides listed for this section.</p>
      </div>
    );
  }

  // 4. Success State with Animations
  return (
    <motion.div 
      className="py-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8'>
        {randomData.map((guide, idx) => (

          <motion.div key={guide._id || idx} variants={itemVariants}>
            <TourGuideTabCard guide={guide} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TourGuideTab;