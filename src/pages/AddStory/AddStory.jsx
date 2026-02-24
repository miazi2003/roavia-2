// pages/AddStory.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { FiEdit3, FiImage, FiSend } from "react-icons/fi";
import SquareImageUploader from "../../Component/SquareImageUploader";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageList.length === 0) {
      toast.error("Please add at least one photo to your story.");
      return;
    }

    setIsSubmitting(true);

    const storyData = {
      title,
      story: storyText,
      imageList,
      email: user?.email,
      name: user?.displayName,
      authorImage: user?.photoURL,
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/stories", storyData);
      toast.success("Story published successfully!");
      navigate("/dashBoard/manageStories");
    } catch (err) {
      console.error("Failed to save story", err);
      toast.error("Failed to submit story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white py-12 px-4 md:px-8 flex justify-center items-center">
      
      <div className="w-full max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full border border-green-300/30 bg-white/5 text-green-300">
             <FiEdit3 size={24} />
           </div>
           <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
             Create New <span className="text-green-300">Story</span>
           </h1>
           <p className="text-white/60">
             Share your adventures with the community. Inspire others to explore.
           </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#2c3a31] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-300/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. A Weekend in Sylhet"
                className="w-full bg-[#3B4E42] text-white border border-white/10 rounded-xl px-5 py-4 text-lg font-medium focus:border-green-300 focus:outline-none transition-colors placeholder-white/20"
                required
              />
            </div>

            {/* Image Uploader Section */}
            <div className="space-y-2">
               <label className="flex items-center gap-2 text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2">
                 <FiImage /> Gallery
               </label>
               <div className="bg-[#3B4E42] rounded-xl border border-dashed border-white/20 p-6 hover:border-green-300/50 transition-colors">
                  <SquareImageUploader onUpload={(urls) => setImageList(urls)} />
                  <p className="text-center text-xs text-white/30 mt-3">
                    Upload high-quality images of your trip. First image will be the cover.
                  </p>
               </div>
            </div>

            {/* Story Text Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Your Experience</label>
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                rows={8}
                placeholder="Tell us about the hidden gems, the food, and the people..."
                className="w-full bg-[#3B4E42] text-white border border-white/10 rounded-xl px-5 py-4 text-base leading-relaxed focus:border-green-300 focus:outline-none transition-colors placeholder-white/20 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-300 text-[#3B4E42] font-extrabold text-lg py-4 rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <FiSend /> Publish Story
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddStory;