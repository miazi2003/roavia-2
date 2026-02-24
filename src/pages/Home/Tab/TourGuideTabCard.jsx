import React from 'react';
import { Link } from 'react-router';
import { FiUser, FiBriefcase, FiDollarSign, FiArrowRight, FiMapPin } from 'react-icons/fi';

const TourGuideTabCard = ({ guide }) => {
  return (
    <div className="group relative flex flex-col h-full bg-[#2c3a31] border border-white/10 rounded-2xl overflow-hidden hover:border-green-300 hover:shadow-2xl transition-all duration-300">
      
      {/* --- Image Section --- */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={guide.photo}
          alt={guide.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c3a31] via-transparent to-transparent opacity-80"></div>
        
        {/* Floating Badge */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">
            Expert
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 flex flex-col flex-1 relative">
        {/* Overlapping Name (Visual Flair) */}
        <div className="-mt-12 mb-4 relative z-10">
           <h2 className="text-2xl font-extrabold text-white leading-tight drop-shadow-lg group-hover:text-green-300 transition-colors">
             {guide.name}
           </h2>
           <div className="flex items-center gap-1 text-white/60 text-xs font-medium mt-1">
             <FiMapPin size={12} className="text-green-300" />
             <span>Bangladesh</span>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          
          <div className="space-y-1">
             <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
               <FiBriefcase /> Experience
             </div>
             <p className="text-white font-semibold">{guide.experience_years} Years</p>
          </div>

          <div className="space-y-1">
             <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
               <FiUser /> Age
             </div>
             <p className="text-white font-semibold">{guide.age} Years</p>
          </div>

          <div className="col-span-2 pt-4 border-t border-white/10 mt-2">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-300">
                  <FiDollarSign size={18} />
                  <span className="text-xl font-bold">{guide.cost}</span>
                  <span className="text-xs text-white/50 font-normal self-end mb-1">/ day</span>
                </div>
             </div>
          </div>

        </div>

        {/* Action Button */}
        <Link to={`/guide/${guide._id}`} className="mt-auto">
          <button className="w-full group/btn flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent border border-white/20 text-white font-semibold hover:bg-green-300 hover:border-green-300 hover:text-[#2c3a31] transition-all duration-300">
            View Profile
            <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

    </div>
  );
};

export default TourGuideTabCard;