import React from "react";
import { FiMapPin, FiLink, FiMail, FiPhone, FiGithub, FiBriefcase, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

// IMPORT YOUR IMAGE HERE
// import profilePic from "../../../assets/profile.jpg"; 

const projects = [
  {
    name: "Phudu",
    url: "https://classy-praline-645446.netlify.app/",
    description: "A clean website for booking your doctor.",
  },
  {
    name: "Grape Task",
    url: "https://jolly-kitsune-272b49.netlify.app/",
    description: "A responsive web for Freelancers to get their task.",
  },
  {
    name: "Portfolio",
    url: "https://meek-kleicha-55e4bf.netlify.app/",
    description: "A responsive website of my profile.",
  },
  {
    name: "EduCamp",
    url: "https://teal-cendol-a8aa91.netlify.app/",
    description: "A responsive and clean website for students to prepare their ability to learn and get experience of assignment.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 50, damping: 15 } 
  },
};

const About = () => {
  return (
    <section className="min-h-screen bg-[#3B4E42] py-16 px-4 md:px-8 flex justify-center items-center font-sans">
      <motion.div
        className="max-w-5xl w-full bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 md:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* --- UPGRADED HEADER SECTION --- */}
        <motion.div 
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-12" 
          variants={itemVariants}
        >
          {/* Left Side: Name & Info */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Yeasin Miazi
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light flex items-center justify-center md:justify-start gap-2">
              <FiBriefcase className="text-white/60" /> Full-Stack Web Developer
            </p>
            <p className="text-sm md:text-base text-white/60 mt-2 flex items-center justify-center md:justify-start gap-2">
              <FiMapPin /> Based in Bangladesh — Available for remote work
            </p>
          </div>

          {/* Right Side: Profile Image */}
          <div className="relative group">
            {/* Glowing blur effect behind the image */}
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
            
            {/* The Image Container */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 p-1 bg-[#3B4E42] shadow-2xl overflow-hidden">
              <img 
                // Replace this placeholder URL with {profilePic} once you import your image
                src={"https://via.placeholder.com/200"} 
                alt="Yeasin Miazi" 
                className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>
        {/* ------------------------------- */}

        {/* Contact Badges Grid */}
        <motion.div className="flex flex-wrap justify-center gap-4 mb-16" variants={itemVariants}>
          <a href="tel:01608072719" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-all duration-300">
            <FiPhone /> <span>01608072719</span>
          </a>
          <a href="mailto:yeasinmiazi1997@gmail.com" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-all duration-300">
            <FiMail /> <span>yeasinmiazi1997@gmail.com</span>
          </a>
          <a href="https://github.com/miazi2003" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#3B4E42] font-semibold hover:bg-gray-200 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            <FiGithub /> <span>github.com/miazi2003</span>
          </a>
        </motion.div>

        {/* Projects Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-white/40 block"></span>
            Live Projects & Demos
            <span className="w-8 h-[2px] bg-white/40 block"></span>
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
          {projects.map((project, idx) => (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              key={idx}
              className="group block bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }} 
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FiLink className="text-white/50 group-hover:text-white transition-colors" /> 
                  {project.name}
                </h3>
                <FiExternalLink className="text-white/40 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0" />
              </div>
              <p className="text-white/70 font-light mb-4 line-clamp-2">
                {project.description}
              </p>
              <span className="text-sm text-white/50 group-hover:text-white/90 underline decoration-white/30 underline-offset-4 transition-colors">
                {project.url.replace("https://", "").replace(/\/$/, "")}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div className="mt-16 text-center text-white/60 text-sm font-light italic" variants={itemVariants}>
          <p>Feel free to explore the projects above — I'd love to discuss any feedback, collaboration, or development opportunities!</p>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;