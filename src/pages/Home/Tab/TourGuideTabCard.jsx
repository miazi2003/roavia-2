import React from 'react';

const TourGuideTabCard = ({ guide }) => {
  return (
<div className="max-w-sm w-full h-full bg-[#4d6b57] border border-green-400 shadow-[0_0_10px_rgba(100,255,100,0.2)] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(100,255,100,0.4)] transition-shadow duration-300 flex flex-col">
  <img
    src={guide.photo}
    alt={guide.name}
    className="w-full h-48 object-cover"
  />
  
  <div className="p-5 text-green-100 space-y-2 flex-1 flex flex-col justify-between">
    <div className="space-y-2">
      <h2 className="text-xl font-bold">{guide.name}</h2>
      <p className="text-sm">
        Age: <span className="font-medium text-white">{guide.age}</span>
      </p>
      <p className="text-sm">
        Experience: <span className="font-medium text-white">{guide.experience_years} years</span>
      </p>
      <p className="text-sm">
        Cost: <span className="font-semibold text-lime-300">৳{guide.cost}</span>
      </p>
    </div>

    <div className="pt-4 mt-4">
      <button className="w-full bg-lime-400 text-[#3B4E42] font-semibold py-2 px-4 rounded-md hover:bg-lime-300 transition-colors duration-300">
      Guide Profile
      </button>
    </div>
  </div>
</div>

  );
};

export default TourGuideTabCard;
