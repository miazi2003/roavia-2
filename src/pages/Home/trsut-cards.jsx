import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const statsData = [
  { id: 1, number: 17, suffix: "+", label: "Historical City" },
  { id: 2, number: 8, suffix: "+", label: "Historical Mosque" },
  { id: 3, number: 51, suffix: "+", label: "Spectacular Location" },
  { id: 4, number: 99, suffix: "+", label: "Tourist Places" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const StatsSection = () => {
  return (
    <section className="bg-[#3B4E42] w-full py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {statsData.map((stat) => (
            <motion.div 
              key={stat.id}
              variants={itemVariants}
              className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-white/20 hover:border-green-300 hover:bg-white/5 transition-all duration-300"
            >

              <div className="flex items-baseline mb-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white group-hover:text-green-300 transition-colors duration-300">
                  <CountUp 
                    end={stat.number} 
                    duration={2.5} 
                    enableScrollSpy={true} 
                    scrollSpyOnce={true} 
                  />
                </span>
                <span className="text-2xl md:text-3xl font-bold text-green-300 ml-1">
                  {stat.suffix}
                </span>
              </div>
              

              <span className="text-white/70 text-sm md:text-base font-medium uppercase tracking-widest text-center group-hover:text-white transition-colors duration-300">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default StatsSection;