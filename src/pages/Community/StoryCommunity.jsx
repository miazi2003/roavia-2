import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFeather } from "react-icons/fi";
import useAxiosSecure from "../../hook/useAxiosSecure";
import StoryCard from "./StoryCard";
import { toast } from "react-hot-toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const StoryCommunity = () => {
  const axiosSecure = useAxiosSecure();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosSecure.get("/stories");
        setStories(res.data.reverse());
      } catch (err) {
        toast.error("Could not fetch stories.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [axiosSecure]);

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full border border-green-300/30 bg-white/5 text-green-300">
            <FiFeather size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Traveler <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">Stories</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
            Real moments from real explorers. Dive into the adventures, hidden gems, and unforgettable memories shared by our community.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-white/20 border-t-green-300 rounded-full animate-spin"></div>
          </div>
        ) : stories.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-white/10 rounded-3xl bg-white/5"
          >
            <h3 className="text-2xl font-bold text-white mb-2">No stories yet</h3>
            <p className="text-white/60">Be the first to share your adventure!</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {stories.map((story) => (
              <motion.div key={story._id} variants={itemVariants}>
                <StoryCard story={story} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StoryCommunity;