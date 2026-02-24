import React from "react";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaRegCompass,
  FaGlobeAsia,
  FaStar,
  FaUtensils,
  FaLightbulb,
} from "react-icons/fa";

const features = [
  {
    icon: <FaMapMarkedAlt size={24} className="text-green-300" />,
    title: "Destination Insights",
    desc: "Explore information about famous destinations and hidden gems across Bangladesh."
  },
  {
    icon: <FaRegCompass size={24} className="text-green-300" />,
    title: "Authentic Experiences",
    desc: "Immerse in rich culture, local festivals, and traditional lifestyles."
  },
  {
    icon: <FaUtensils size={24} className="text-green-300" />,
    title: "Food & Cuisine",
    desc: "Discover regional flavors and where to find the best local eats."
  },
  {
    icon: <FaStar size={24} className="text-green-300" />,
    title: "Hidden Gems",
    desc: "Uncover off-the-beaten-path natural wonders and quiet retreats."
  },
  {
    icon: <FaGlobeAsia size={24} className="text-green-300" />,
    title: "Smart Travel Planning",
    desc: "Use our insights to plan personalized and efficient trips."
  },
  {
    icon: <FaLightbulb size={24} className="text-green-300" />,
    title: "Traveler Tips",
    desc: "Practical advice on safety, budgeting, and local etiquette."
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TouristOverview = () => {
  return (
    <section className="bg-[#3B4E42] w-full min-h-screen py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* --- Section 1: Intro --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center max-w-4xl mx-auto pt-10"
        >
          <span className="text-white/60 tracking-[0.2em] text-sm font-bold uppercase block mb-4">
            Bangladesh Unveiled
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Welcome to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
              The Tourist Guide
            </span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
            Discover the beauty, culture, and history of Bangladesh with confidence — from iconic landmarks to rural charms.
          </p>
        </motion.div>

        {/* --- Section 2: Features Grid (Outlined Cards) --- */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group p-8 rounded-[2rem] bg-transparent border border-white/20 hover:border-white transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Outlined Icon Circle */}
              <div className="w-14 h-14 rounded-full border border-white/20 group-hover:border-green-300 flex items-center justify-center mb-6 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 font-light leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Section 3: Who It's For --- */}
        <motion.div
          className="flex flex-col lg:flex-row gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="w-full lg:w-1/2 relative p-4">
            {/* Architectural Outline Offset Behind Image */}
            <div className="absolute inset-0 border-2 border-green-300/40 rounded-[2rem] transform translate-x-4 translate-y-4 pointer-events-none hidden md:block"></div>
            <img
              src="https://images.unsplash.com/photo-1620051525641-f1d65a8d032f?auto=format&fit=crop&w=800&q=80"
              alt="Bangladesh Travel"
              className="relative z-10 rounded-[2rem] border border-white/20 w-full object-cover aspect-[4/3]"
            />
          </motion.div>
          
          <motion.div variants={fadeUp} className="w-full lg:w-1/2">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
              Built for Every Kind <br/> of Explorer
            </h3>
            <ul className="space-y-4 text-white/80 font-light text-lg mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold mt-1">✓</span>
                <span><strong className="text-white font-semibold">Local travelers</strong> seeking new adventures in their own backyard.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold mt-1">✓</span>
                <span><strong className="text-white font-semibold">International tourists</strong> visiting Bangladesh for the first time.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold mt-1">✓</span>
                <span><strong className="text-white font-semibold">Backpackers</strong> wanting reliable, off-grid insights.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-300 font-bold mt-1">✓</span>
                <span><strong className="text-white font-semibold">Agencies & Bloggers</strong> needing curated, high-quality data.</span>
              </li>
            </ul>
            <p className="text-white/60 italic border-l-2 border-green-300 pl-4">
              Whether chasing waterfalls or savoring biryani — we help you do it better.
            </p>
          </motion.div>
        </motion.div>

        {/* --- Section 4: Culture Highlight (Outlined Banner) --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative bg-transparent border-2 border-white/10 p-10 md:p-16 rounded-[2.5rem] text-center overflow-hidden group hover:border-white/30 transition-colors duration-500"
        >
          {/* Faint background decoration */}
          <FaGlobeAsia className="absolute -right-10 -top-10 text-[15rem] text-white/5 pointer-events-none transform group-hover:rotate-12 transition-transform duration-[3s]" />
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white relative z-10">
            Experience Culture, Not Just Places
          </h3>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-3xl mx-auto relative z-10">
            From the warmth of rural homes to the buzz of Dhaka — Bangladesh offers unforgettable stories and genuine human connection.
          </p>
        </motion.div>

        {/* --- Section 5: What's Coming Next & CTA (Outlined Grid) --- */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          
          {/* Coming Next Box */}
          <motion.div
            className="bg-transparent border border-white/20 p-8 md:p-12 rounded-[2.5rem]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <FaLightbulb className="text-yellow-400" /> What’s Coming Next?
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-white/70 font-light">
              <li className="flex items-center gap-2">🗺️ Interactive Maps</li>
              <li className="flex items-center gap-2">📋 Itinerary Builder</li>
              <li className="flex items-center gap-2">🌐 Multilingual Access</li>
              <li className="flex items-center gap-2">⭐ Verified Reviews</li>
              <li className="flex items-center gap-2">📹 Drone Virtual Tours</li>
              <li className="flex items-center gap-2">🤖 AI Suggestions</li>
            </ul>
          </motion.div>

          {/* Call To Action Box (Green Outline) */}
          <motion.div
            className="flex flex-col justify-center items-center text-center bg-transparent border-2 border-green-300 p-8 md:p-12 rounded-[2.5rem] hover:bg-green-300/5 transition-colors duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Explore?
            </h3>
            <p className="text-white/80 font-light mb-8 max-w-sm">
              Join thousands using The Tourist Guide to plan their unforgettable trip.
            </p>
            <Link to="/allPackages">
              {/* Outlined button that fills on hover */}
              <button className="bg-transparent border-2 border-green-300 text-green-300 font-bold px-10 py-4 rounded-full hover:bg-green-300 hover:text-[#3B4E42] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                Start Exploring Now
              </button>
            </Link>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
};

export default TouristOverview;