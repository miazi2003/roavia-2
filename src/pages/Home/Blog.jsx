import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';

// Mock data for your 4 blog posts
const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Bali You Need to Visit",
    excerpt: "Escape the crowded tourist traps and discover the serene, untouched beauty of Bali's secret waterfalls and hidden temples.",
    category: "Destinations",
    date: "Oct 12, 2026",
    author: "Elena R.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "The Ultimate Safari Packing List",
    excerpt: "Don't overpack. Here is exactly what you need to bring for a comfortable and unforgettable African safari experience.",
    category: "Travel Tips",
    date: "Oct 08, 2026",
    author: "David C.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "A Foodie's Guide to the Streets of Tokyo",
    excerpt: "From midnight ramen to the freshest sushi, navigate the bustling food scene of Tokyo like a true local.",
    category: "Food & Culture",
    date: "Sep 29, 2026",
    author: "Sarah J.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "How to Travel Sustainably in 2026",
    excerpt: "Learn how to reduce your carbon footprint while exploring the world, supporting local communities along the way.",
    category: "Eco-Travel",
    date: "Sep 15, 2026",
    author: "Mark T.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  }
];

// Framer Motion entrance animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const BlogSection = () => {
  return (
    <section className="bg-[#3B4E42] py-20  w-full">
      <div className="mx-auto px-4 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-green-300 tracking-[0.2em] text-sm font-bold uppercase block mb-3">
              Travel Journal
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Latest from the Blog
            </h2>
            <p className="text-white/70 text-lg font-light">
              Get inspired with expert travel tips, destination guides, and stories from our global community of adventurers.
            </p>
          </div>
          
          {/* View All Button */}
          <Link to="/blog" className="shrink-0">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white border border-white/20 text-white hover:text-[#3B4E42] font-semibold py-2.5 px-6 rounded-full transition-all duration-300">
              View All Posts
            </button>
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {blogPosts.map((post) => (
            <motion.div 
              key={post.id}
              variants={cardVariants}
              className="group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1.5 shadow-lg"
            >
              {/* Image Header with Category Badge */}
              <div className="relative h-52 w-full overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {post.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                
                {/* Meta Data */}
                <div className="flex items-center gap-4 text-white/50 text-xs font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <FiCalendar />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiUser />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <h3 className="text-xl font-bold text-white mb-3 leading-snug line-clamp-2 group-hover:text-green-300 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-white/70 font-light text-sm line-clamp-3 mb-6">
                  {post.excerpt}
                </p>

                {/* Read More Link pushes to the bottom */}
                <div className="mt-auto border-t border-white/10 pt-4">
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="inline-flex items-center gap-2 text-green-300 font-semibold text-sm hover:text-white transition-colors duration-300"
                  >
                    Read More 
                    <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default BlogSection;