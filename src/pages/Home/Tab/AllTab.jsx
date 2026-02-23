import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FiMap, FiUsers } from 'react-icons/fi';

import OverViewTab from './OverViewTab';
import TourGuideTab from './TourGuideTab';

const AllTab = () => {
  return (
    <div className=" mx-auto px-4 py-8 md:py-16 px-8 md:px-16">
      
      {/* Header Section for context */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Explore the Possibilities
        </h2>
        <p className="text-white max-w-2xl mx-auto">
          Browse our expertly crafted tour packages or meet the local guides who will make your journey unforgettable.
        </p>
      </div>

      <Tabs>
        {/* Custom Pill-Shaped TabList */}
        <TabList className="flex flex-wrap justify-center items-center bg-gray-100 p-1.5 rounded-full max-w-fit mx-auto mb-12 gap-2 border border-gray-200 shadow-inner !border-b-0">
          
          <Tab 
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold cursor-pointer transition-all duration-300 outline-none text-gray-500 hover:text-[#3B4E42] hover:bg-white/50"
            selectedClassName="!bg-[#3B4E42] !text-white shadow-[0_4px_15px_rgba(59,78,66,0.4)] transform scale-105"
          >
            <FiMap size={18} />
            <span>Tour Packages</span>
          </Tab>

          <Tab 
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold cursor-pointer transition-all duration-300 outline-none text-gray-500 hover:text-[#3B4E42] hover:bg-white/50"
            selectedClassName="!bg-[#3B4E42] !text-white shadow-[0_4px_15px_rgba(59,78,66,0.4)] transform scale-105"
          >
            <FiUsers size={18} />
            <span>Tour Guides</span>
          </Tab>

        </TabList>

        {/* Tab Panels with fade-in effect */}
        <TabPanel className="animate-fadeIn">
          <OverViewTab />
        </TabPanel>
        
        <TabPanel className="animate-fadeIn">
          <TourGuideTab />
        </TabPanel>
      </Tabs>

      {/* Tailwind Custom Animation (Add this to your globals.css if you want the fade effect) */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Removes the ugly default react-tabs bottom border */
        .react-tabs__tab-list {
          border-bottom: none !important;
        }
      `}</style>

    </div>
  );
};

export default AllTab;