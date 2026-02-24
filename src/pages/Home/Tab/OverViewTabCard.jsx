import React from 'react';
import { Link } from 'react-router';
import { FiMap, FiDollarSign, FiArrowRight } from 'react-icons/fi';

const OverViewTabCard = ({ data }) => {
  return (

    <div className="group h-full flex flex-col bg-[#3B4E42] border border-white/20 rounded-2xl overflow-hidden hover:border-white/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-[#2c3a31]">
        <img
          src={data.photo}
          alt={data.title || "Tour Package"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#3B4E42] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating Badge for Tour Type */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
          <FiMap size={12} />
          {data.type}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-2xl font-extrabold text-white mb-4 tracking-tight line-clamp-2">
          {data.title}
        </h2>
        
        {/* Tour Details */}
        <div className="space-y-4 flex-1 text-white/70 font-medium mt-auto">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-400/20 text-green-300">
              <FiDollarSign size={16} />
            </div>
            <span>Price: <span className="text-green-300 font-bold text-xl">${data.price}</span></span>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-6 pt-5 border-t border-white/10">

          <Link 
            to={`/package/${data._id}`} 
            className="w-full flex justify-center items-center gap-2 bg-transparent border-2 border-white text-white font-bold py-2.5 px-4 rounded-full hover:bg-white hover:text-[#3B4E42] transition-all duration-300"
          >
            View Package 

            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OverViewTabCard;