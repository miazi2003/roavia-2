import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiUserCheck, FiUserX, FiBriefcase, FiPhone, FiMail, FiUsers, FiSearch } from "react-icons/fi";
import useAxiosSecure from "../../hook/useAxiosSecure";

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: candidates = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pendingGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-guides");
      return res.data;
    },
    onError: () => toast.error("Failed to fetch applications"),
  });

  const handleAccept = async (email) => {
    try {
      const res = await axiosSecure.put(`/users/role/${email}`, { role: "guide" });
      if (res.data.modifiedCount > 0) {
        toast.success("Guide approved and user role updated");
        refetch();
      } else {
        toast.error("Failed to update user role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleReject = async (email) => {
    try {
      const res = await axiosSecure.delete(`/pending-guides/${email}`);
      if (res.data.deletedCount > 0) {
        toast.success("Application rejected");
        refetch();
      } else {
        toast.error("Failed to delete application");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 animate-spin"></div>
      </div>
    );
  }

  if (isError) return <div className="text-red-400 p-8 text-center border border-red-400/30 bg-red-400/10 m-8 font-mono">ERROR LOADING DATA</div>;

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white p-8 md:p-12">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/20 pb-6 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-tight flex items-center gap-3">
            <FiUsers className="text-green-300"/> Manage Candidates
          </h1>
          <p className="text-white/60 text-sm font-mono mt-2">
            / ADMIN / RECRUITMENT / PENDING
          </p>
        </div>
        
        {/* Quick Stat (Squared) */}
        <div className="border border-white/20 px-6 py-3 bg-[#2c3a31]">
           <span className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Pending Requests</span>
           <span className="text-2xl font-bold text-green-300 font-mono">{candidates.length}</span>
        </div>
      </div>

      {/* --- Candidates Table --- */}
      {candidates.length === 0 ? (
        <div className="border border-dashed border-white/20 p-20 text-center text-white/40 font-mono">
          NO PENDING APPLICATIONS FOUND.
        </div>
      ) : (
        <div className="w-full border border-white/20 bg-[#2c3a31] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1f2d25] border-b border-white/20 text-xs uppercase tracking-widest text-white/50">
                  <th className="p-5 font-bold border-r border-white/10 w-16 text-center">#</th>
                  <th className="p-5 font-bold border-r border-white/10">Candidate Info</th>
                  <th className="p-5 font-bold border-r border-white/10">Contact</th>
                  <th className="p-5 font-bold border-r border-white/10">Experience</th>
                  <th className="p-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {candidates.map((candidate, idx) => (
                  <tr 
                    key={candidate._id} 
                    className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-5 text-center text-white/40 font-mono border-r border-white/10">
                      {idx + 1}
                    </td>
                    
                    <td className="p-5 border-r border-white/10">
                      <div className="font-bold text-white uppercase tracking-wide text-lg">{candidate.name || "N/A"}</div>
                      <div className="text-xs text-white/40 font-mono mt-1">APPLIED: {new Date().toLocaleDateString()}</div>
                    </td>

                    <td className="p-5 border-r border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-white/70">
                        <FiMail className="text-green-300 text-xs" />
                        <span className="font-mono text-xs">{candidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <FiPhone className="text-green-300 text-xs" />
                        <span className="font-mono text-xs">{candidate.phone || "N/A"}</span>
                      </div>
                    </td>

                    <td className="p-5 border-r border-white/10">
                      <div className="flex items-center gap-2">
                         <FiBriefcase className="text-white/30" />
                         <span className="font-bold text-white">{candidate.experience || "N/A"}</span>
                      </div>
                    </td>

                    <td className="p-5 text-center">
                       <div className="flex items-center justify-center gap-2">
                         <button
                            onClick={() => handleAccept(candidate.email)}
                            className="w-10 h-10 flex items-center justify-center border border-green-300 text-green-300 hover:bg-green-300 hover:text-[#2c3a31] transition-all duration-300"
                            title="Approve Guide"
                          >
                            <FiUserCheck size={18} />
                          </button>
                          
                          <button
                            onClick={() => handleReject(candidate.email)}
                            className="w-10 h-10 flex items-center justify-center border border-red-400 text-red-400 hover:bg-red-400 hover:text-[#2c3a31] transition-all duration-300"
                            title="Reject Application"
                          >
                            <FiUserX size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-[#1f2d25] border-t border-white/20 text-xs text-white/40 flex justify-between items-center font-mono uppercase">
             <span>Reviewing Candidates</span>
             <span className="text-green-300">Action Required</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default ManageCandidates;