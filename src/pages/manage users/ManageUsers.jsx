import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import toast from "react-hot-toast";
import { FiUsers, FiShield, FiUser, FiSearch } from "react-icons/fi";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    onError: (err) => {
      toast.error("Failed to load users");
      console.error(err);
    },
  });

  // Handle role change
  const handleRoleChange = async (userEmail, currentRole) => {
    const newRole = currentRole === "admin" ? "tourist" : "admin";

    try {
      const res = await axiosSecure.put(`/users/role/${userEmail}`, { role: newRole });

      if (res.data.modifiedCount > 0) {
        toast.success(`User role updated to ${newRole}`);
        refetch();
      } else {
        toast.error("Failed to update role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating role");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 animate-spin"></div>
      </div>
    );
  }

  if (isError) return <div className="text-red-400 p-8 text-center border border-red-400/30 bg-red-400/10 m-8">Error: {error.message}</div>;

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white p-8 md:p-12">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/20 pb-6 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-tight flex items-center gap-3">
            <FiUsers className="text-green-300"/> Manage Users
          </h1>
          <p className="text-white/60 text-sm font-mono mt-2">
            / ADMIN / USERS / PERMISSIONS
          </p>
        </div>
        
        {/* Search Bar (Squared) */}
        <div className="relative w-full md:w-96">
           <input 
             type="text" 
             placeholder="SEARCH BY NAME OR EMAIL..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-transparent border border-white/20 px-4 py-3 pl-10 text-sm focus:border-green-300 focus:outline-none transition-colors placeholder-white/30 font-mono"
           />
           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        </div>
      </div>

      {/* --- Users Table --- */}
      {users.length === 0 ? (
        <div className="border border-dashed border-white/20 p-20 text-center text-white/40 font-mono">
          NO USERS FOUND IN THE DATABASE.
        </div>
      ) : (
        <div className="w-full border border-white/20 bg-[#2c3a31] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1f2d25] border-b border-white/20 text-xs uppercase tracking-widest text-white/50">
                  <th className="p-5 font-bold border-r border-white/10 w-16 text-center">#</th>
                  <th className="p-5 font-bold border-r border-white/10">User Identity</th>
                  <th className="p-5 font-bold border-r border-white/10">Current Role</th>
                  <th className="p-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredUsers.map((user, idx) => (
                  <tr 
                    key={user._id} 
                    className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-5 text-center text-white/40 font-mono border-r border-white/10">
                      {idx + 1}
                    </td>
                    
                    <td className="p-5 border-r border-white/10">
                      <div className="flex items-center gap-4">
                        {/* Avatar Container (Squared) */}
                        <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-white/50 border border-white/10">
                           {user.image ? (
                             <img src={user.image} alt="User" className="w-full h-full object-cover" />
                           ) : (
                             <FiUser size={20} />
                           )}
                        </div>
                        <div>
                          <div className="font-bold text-white uppercase tracking-wide">{user.name || "UNKNOWN NAME"}</div>
                          <div className="text-xs text-white/50 font-mono">{user.userEmail}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-5 border-r border-white/10">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-widest border ${
                        user.role === 'admin' 
                          ? 'border-green-300 text-green-300 bg-green-300/10' 
                          : 'border-white/20 text-white/60'
                      }`}>
                         {user.role === 'admin' ? <FiShield size={12} /> : <FiUser size={12} />}
                         {user.role || "TOURIST"}
                      </div>
                    </td>

                    <td className="p-5 text-center">
                       <button
                          disabled={user.role === "admin" && users.filter((u) => u.role === "admin").length === 1}
                          onClick={() => handleRoleChange(user.userEmail, user.role)}
                          className={`
                            px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300
                            ${user.role === 'admin' 
                              ? 'border-red-400 text-red-400 hover:bg-red-400 hover:text-[#2c3a31]' 
                              : 'border-green-300 text-green-300 hover:bg-green-300 hover:text-[#2c3a31]'
                            }
                            disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed
                          `}
                        >
                          {user.role === "admin" ? "REVOKE ADMIN" : "MAKE ADMIN"}
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-[#1f2d25] border-t border-white/20 text-xs text-white/40 flex justify-between items-center font-mono uppercase">
             <span>Total Users: {users.length}</span>
             <div className="flex gap-4">
                <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-300"></div> Admins</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 bg-white/50"></div> Tourists</span>
             </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ManageUsers;