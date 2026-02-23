import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Adventure Enthusiast",
    image: "https://i.pravatar.cc/150?img=47",
    review: "ROAVIA completely changed how I travel. The guides were incredibly knowledgeable, and the entire booking process was seamless. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Solo Traveler",
    image: "https://i.pravatar.cc/150?img=11",
    review: "I've used many tour agencies, but the curated packages here are on another level. I found hidden gems I would have never discovered on my own.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Family Explorer",
    image: "https://i.pravatar.cc/150?img=32",
    review: "Perfect for our family vacation. The itinerary was perfectly balanced between exciting activities and relaxing downtime. We will be booking again!",
    rating: 5,
  }
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
};

const Testimonials = () => {
  return (
    <section className="bg-[#3B4E42] py-16 px-4 md:px-16 overflow-hidden">
      <div className=" mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-green-300 tracking-[0.2em] text-sm font-bold uppercase block mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Stories from our Explorers
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
            Don't just take our word for it. Read what our community of global travelers has to say about their experiences with ROAVIA.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Animates only when scrolled into view
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-white/80 font-light leading-relaxed mb-8 italic">
                "{testimonial.review}"
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full border-2 border-[#3B4E42] ring-2 ring-white/20 group-hover:ring-green-300 transition-all"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-green-300/80 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;