import React, { useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import toast from "react-hot-toast";
import SquareImageUploader from "../../Component/SquareImageUploader";
import { FiPackage, FiMapPin, FiClock, FiDollarSign, FiStar, FiCheck, FiType, FiFileText, FiImage, FiToggleRight } from "react-icons/fi";

const AddPackageForm = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one image for the package.");
      return;
    }

    setLoading(true);
    const form = e.target;

    const newPackage = {
      images: uploadedImages,
      image: uploadedImages[0], 
      type: form.type.value,
      title: form.title.value,
      price: parseFloat(form.price.value),
      location: form.location.value,
      duration: form.duration.value,
      rating: parseFloat(form.rating.value),
      available: form.available.checked,
      description: form.description.value,
    };

    try {
      const res = await axiosSecure.post("/packages", newPackage);
      if (res.data.insertedId) {
        toast.success("Package created successfully!");
        form.reset();
        setUploadedImages([]);
      }
    } catch (err) {
      toast.error("Failed to add package.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white py-12 px-4 md:px-8 flex justify-center">
      
      <div className="w-full max-w-6xl">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 border border-green-300 text-green-300 rounded-xl">
              <FiPackage size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">New Package</h2>
              <p className="text-white/60 text-xs font-mono uppercase tracking-widest mt-1">/ ADMIN / CATALOG / CREATE</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
             <button type="button" onClick={() => window.history.back()} className="text-xs font-bold text-white/50 hover:text-white uppercase tracking-widest transition-colors">
               Cancel & Go Back
             </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* --- LEFT COLUMN: DETAILS --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Section 1: Identification */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-green-300 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2">
                <FiFileText /> Identification
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Package Title</label>
                  <input name="title" required placeholder="ENTER PACKAGE TITLE..." className="w-full bg-transparent text-white text-lg font-bold border-b-2 border-white/20 px-0 py-2 focus:border-green-300 focus:outline-none transition-colors placeholder-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Type</label>
                      <div className="relative">
                        <input name="type" required placeholder="ADVENTURE" className="w-full bg-transparent text-white border border-white/20 rounded-lg px-4 py-3 focus:border-green-300 focus:outline-none transition-colors placeholder-white/20 font-mono text-sm" />
                        <FiType className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Location</label>
                      <div className="relative">
                        <input name="location" required placeholder="CITY, COUNTRY" className="w-full bg-transparent text-white border border-white/20 rounded-lg px-4 py-3 focus:border-green-300 focus:outline-none transition-colors placeholder-white/20 font-mono text-sm" />
                        <FiMapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Section 2: Logistics */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-green-300 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2">
                <FiClock /> Logistics & Cost
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Price (BDT)</label>
                  <div className="relative">
                    <input name="price" required type="number" placeholder="0000" className="w-full bg-transparent text-green-300 font-mono text-xl border border-white/20 rounded-lg px-4 py-3 focus:border-green-300 focus:outline-none transition-colors placeholder-white/10" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-mono">৳</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Duration</label>
                  <input name="duration" required placeholder="3 DAYS" className="w-full bg-transparent text-white border border-white/20 rounded-lg px-4 py-3 focus:border-green-300 focus:outline-none transition-colors placeholder-white/20 font-mono text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Rating</label>
                  <input name="rating" required type="number" step="0.1" max="5" placeholder="5.0" className="w-full bg-transparent text-white border border-white/20 rounded-lg px-4 py-3 focus:border-green-300 focus:outline-none transition-colors placeholder-white/20 font-mono text-sm" />
                </div>
              </div>
            </div>

            {/* Section 3: Details */}
            <div className="space-y-2">
               <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Description</label>
               <textarea name="description" required placeholder="TYPE DESCRIPTION HERE..." className="w-full h-40 bg-transparent text-white border border-white/20 rounded-lg px-4 py-3 focus:border-green-300 focus:outline-none transition-colors placeholder-white/10 resize-none font-mono text-sm leading-relaxed"></textarea>
            </div>

          </div>

          {/* --- RIGHT COLUMN: MEDIA & ACTIONS --- */}
          <div className="lg:col-span-1 space-y-8 sticky top-8">
            
            {/* Media Upload */}
            <div className="space-y-4">
               <h3 className="text-sm font-bold text-green-300 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2">
                <FiImage /> Media Assets
              </h3>
               <div className="bg-[#2c3a31] border border-dashed border-white/20 rounded-lg p-6 hover:border-white/50 transition-colors">
                  <SquareImageUploader onUpload={(urls) => setUploadedImages(urls)} />
                  <div className="mt-4 text-center">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Format: JPG, PNG</p>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Max Size: 5MB</p>
                  </div>
               </div>
            </div>

            {/* Status & Publish */}
            <div className="border border-white/20 rounded-xl p-6 bg-[#2c3a31] space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-widest">Status: Active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="available" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-black/40 border border-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-300 peer-checked:border-green-300"></div>
                </label>
              </div>

              <div className="h-px bg-white/10 w-full"></div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-300 text-[#3B4E42] font-extrabold text-sm uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "SAVING..." : (
                  <>
                    PUBLISH PACKAGE <FiCheck size={18} />
                  </>
                )}
              </button>

            </div>

          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddPackageForm;