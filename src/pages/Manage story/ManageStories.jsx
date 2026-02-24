import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { FiEdit2, FiTrash2, FiBookOpen, FiImage, FiCalendar } from "react-icons/fi";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const ManageStories = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosSecure.get("/stories");
        setStories(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load stories");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this story?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/stories/${id}?email=${user?.email}`);
      if (res.data?.deletedCount > 0) {
        setStories((prev) => prev.filter((story) => story._id !== id));
        toast.success("Story deleted successfully");
      } else {
        toast.error("Failed to delete the story");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while deleting");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white p-8 md:p-12">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/20 pb-6 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-tight flex items-center gap-3">
            <FiBookOpen className="text-green-300"/> Manage Stories
          </h1>
          <p className="text-white/60 text-sm font-mono mt-2">
            / USER / CONTENT / STORIES
          </p>
        </div>
        
        {/* Quick Stat (Squared) */}
        <div className="border border-white/20 px-6 py-3 bg-[#2c3a31]">
           <span className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1">My Stories</span>
           <span className="text-2xl font-bold text-green-300 font-mono">
             {stories.filter(s => s.email === user?.email).length}
           </span>
        </div>
      </div>

      {/* --- Stories Grid --- */}
      {stories.length === 0 ? (
        <div className="border border-dashed border-white/20 p-20 text-center text-white/40 font-mono uppercase">
          No stories found. Start sharing your adventures!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-[#2c3a31] border border-white/10 hover:border-green-300 transition-all duration-300 group flex flex-col h-full"
            >
              {/* Image Grid */}
              <div className="h-48 bg-[#1f2d25] relative overflow-hidden border-b border-white/10">
                {Array.isArray(story.imageList) && story.imageList.length > 0 ? (
                   <div className="w-full h-full relative">
                      <img 
                        src={story.imageList[0]} 
                        alt="Cover" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      {story.imageList.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1">
                           <FiImage /> +{story.imageList.length - 1}
                        </div>
                      )}
                   </div>
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-white/20">
                      <FiImage size={48} />
                   </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                   <h2 className="text-xl font-bold text-white uppercase tracking-wide leading-tight mb-3 line-clamp-2">
                     {story.title || "UNTITLED STORY"}
                   </h2>
                   <p className="text-white/60 text-sm line-clamp-3 mb-4 leading-relaxed">
                     {story.story}
                   </p>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                   <div className="flex items-center justify-between text-xs text-white/40 font-mono mb-4">
                      <span>{story.email}</span>
                      <span className="flex items-center gap-1"><FiCalendar /> {new Date().toLocaleDateString()}</span>
                   </div>

                   {/* Action Buttons */}
                   {story.email === user?.email ? (
                      <div className="grid grid-cols-2 gap-3">
                        <Link to={`/update-story/${story._id}`}>
                          <button className="w-full py-3 border border-white/20 text-white hover:bg-white hover:text-[#2c3a31] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                             <FiEdit2 /> Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(story._id)}
                          className="w-full py-3 border border-red-400/50 text-red-400 hover:bg-red-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                   ) : (
                      <div className="text-center py-2 text-xs font-bold text-white/30 uppercase tracking-widest border border-white/5 bg-white/5 cursor-not-allowed">
                         Read Only
                      </div>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStories;