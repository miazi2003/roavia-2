import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiPhone, FiMapPin, FiMail, FiEdit2, FiShield, FiCamera, FiX, FiCheck } from "react-icons/fi";

import useAuth from "../../hook/useAuth";
import SquareImageUploader from "../../Component/SquareImageUploader";
import useAxiosSecure from "../../hook/useAxiosSecure";
import StatCards from "../admin state/Statcards";

const ManageProfile = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || "",
        image: userData.image || user?.photoURL || "",
      });
    }
  }, [userData, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axiosSecure.put(`/users/${userData._id}`, formData);
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* --- Profile Header Card --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#2c3a31] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden"
        >
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-300/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 border-2 border-green-300 shadow-lg bg-[#3B4E42]">
                <img
                  src={userData?.image || user?.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-2 right-2 p-2 bg-green-300 text-[#3B4E42] rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <FiEdit2 size={16} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                    {userData?.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    userData?.role === 'admin' ? 'border-red-400 text-red-400' : 'border-green-300 text-green-300'
                  }`}>
                    {userData?.role}
                  </span>
                </div>
                <p className="text-white/60 flex items-center justify-center md:justify-start gap-2">
                  <FiMail className="text-green-300" /> {user.email}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 bg-green-300/10 text-green-300 rounded-lg">
                    <FiPhone />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">Phone</p>
                    <p className="text-sm font-medium">{userData?.phone || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 bg-green-300/10 text-green-300 rounded-lg">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">Address</p>
                    <p className="text-sm font-medium">{userData?.address || "Not set"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Edit Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-green-300 hover:text-green-300 transition-all"
            >
              <FiEdit2 />
              <span>Edit Profile</span>
            </button>
          </div>
        </motion.div>

        {/* --- Role Specific Content --- */}
        
        {/* Admin Stats */}
        {userData?.role === "admin" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
               <FiShield className="text-green-300"/> Dashboard Overview
             </h3>
             <StatCards />
          </motion.div>
        )}

        {/* Tourist CTA */}
        {userData?.role === "tourist" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-300/20 to-transparent border border-green-300/30 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Become a Tour Guide</h3>
              <p className="text-white/70 max-w-lg">
                Share your local knowledge, lead adventures, and earn money by becoming a verified guide on our platform.
              </p>
            </div>
            <button
              onClick={() => window.location.href = "/join-guide"}
              className="px-8 py-3 bg-green-300 text-[#3B4E42] font-bold rounded-xl hover:bg-white transition-colors shadow-lg whitespace-nowrap"
            >
              Apply Now
            </button>
          </motion.div>
        )}

      </div>

      {/* --- Edit Profile Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#2c3a31] border border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-5">
                {/* Image Uploader */}
                <div className="flex justify-center mb-6">
                  <div className="w-full">
                     <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 text-center">Profile Photo</p>
                     <div className="bg-[#3B4E42] rounded-xl border border-dashed border-white/20 p-4">
                        <SquareImageUploader
                          onUpload={(urls) => setFormData({ ...formData, image: urls[0] })}
                        />
                     </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#3B4E42] text-white border border-white/10 rounded-xl px-4 py-3 pl-10 focus:border-green-300 focus:outline-none transition-colors"
                        placeholder="Your Name"
                      />
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#3B4E42] text-white border border-white/10 rounded-xl px-4 py-3 pl-10 focus:border-green-300 focus:outline-none transition-colors"
                        placeholder="+880..."
                      />
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Address</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-[#3B4E42] text-white border border-white/10 rounded-xl px-4 py-3 pl-10 focus:border-green-300 focus:outline-none transition-colors"
                        placeholder="City, Country"
                      />
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="flex-1 px-4 py-3 rounded-xl bg-green-300 text-[#3B4E42] font-bold hover:bg-white transition-colors flex justify-center items-center gap-2"
                  >
                    <FiCheck /> Save Changes
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageProfile;