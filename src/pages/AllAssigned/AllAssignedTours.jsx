import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useState } from "react";
import { FiUsers, FiCalendar, FiDollarSign, FiActivity, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { format } from "date-fns";

const AllAssignedTours = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: tours = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["assignedTours"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/assigned-tours");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) return <div className="text-red-400 p-8 text-center border border-red-400/30 bg-red-400/10 m-8">Error: {error.message}</div>;

  const totalPages = Math.ceil(tours.length / itemsPerPage);
  const paginatedTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white p-8 md:p-12">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/20 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-tight mb-2">
            Assigned Tours
          </h1>
          <p className="text-white/60 text-sm font-mono">
            / ADMIN / LOGS / ASSIGNMENTS
          </p>
        </div>
        
        {/* Quick Stats (Outlined) */}
        <div className="flex gap-6 mt-6 md:mt-0">
          <div className="text-right">
             <span className="block text-xs font-bold text-white/40 uppercase tracking-widest">Total Active</span>
             <span className="text-2xl font-bold text-green-300">{tours.length}</span>
          </div>
          <div className="w-px bg-white/20 h-10"></div>
          <div className="text-right">
             <span className="block text-xs font-bold text-white/40 uppercase tracking-widest">Pending</span>
             <span className="text-2xl font-bold text-white">{tours.filter(t => t.status === 'pending').length}</span>
          </div>
        </div>
      </div>

      {/* --- Data Table --- */}
      {tours.length === 0 ? (
        <div className="border border-dashed border-white/20 p-20 text-center text-white/40">
          No assigned tours found in the database.
        </div>
      ) : (
        <div className="w-full border border-white/20 bg-[#2c3a31]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1f2d25] border-b border-white/20 text-xs uppercase tracking-widest text-white/50">
                  <th className="p-5 font-bold border-r border-white/10 w-16 text-center">#</th>
                  <th className="p-5 font-bold border-r border-white/10">Tour Details</th>
                  <th className="p-5 font-bold border-r border-white/10">Client Info</th>
                  <th className="p-5 font-bold border-r border-white/10">Guide</th>
                  <th className="p-5 font-bold border-r border-white/10">Financials</th>
                  <th className="p-5 font-bold border-r border-white/10 text-center">Status</th>
                  <th className="p-5 font-bold">Schedule</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedTours.map((tour, index) => (
                  <tr 
                    key={tour._id || index} 
                    className="border-b border-white/10 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-5 text-center text-white/40 font-mono border-r border-white/10">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    
                    <td className="p-5 border-r border-white/10">
                      <div className="font-bold text-white">{tour.packageName || "N/A"}</div>
                    </td>

                    <td className="p-5 border-r border-white/10">
                      <div className="font-semibold text-white">{tour.touristName || "Unknown"}</div>
                      <div className="text-xs text-white/50 mt-1 font-mono">{tour.touristEmail}</div>
                    </td>

                    <td className="p-5 border-r border-white/10">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-300"></div>
                         <span className="font-medium text-white">{tour.guideName || "Unassigned"}</span>
                      </div>
                    </td>

                    <td className="p-5 border-r border-white/10">
                      <span className="font-mono text-green-300 font-bold">${tour.price}</span>
                    </td>

                    <td className="p-5 border-r border-white/10 text-center">
                      <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                        tour.status === 'confirmed' 
                          ? 'border-green-300 text-green-300' 
                          : tour.status === 'rejected' 
                            ? 'border-red-400 text-red-400'
                            : 'border-yellow-400 text-yellow-400'
                      }`}>
                        {tour.status}
                      </span>
                    </td>

                    <td className="p-5">
                       <div className="text-white/80 font-medium">
                         {tour.tourDate ? format(new Date(tour.tourDate), "MMM dd, yyyy") : "N/A"}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- Pagination (Structural) --- */}
          <div className="flex items-center justify-between p-4 border-t border-white/20 bg-[#1f2d25]">
             <div className="text-xs text-white/40 uppercase tracking-widest">
               Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, tours.length)} of {tours.length}
             </div>
             
             <div className="flex gap-1">
               <button 
                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                 disabled={currentPage === 1}
                 className="p-2 border border-white/10 text-white hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-colors"
               >
                 <FiChevronLeft />
               </button>
               
               {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold border transition-colors ${
                      currentPage === idx + 1
                        ? "bg-green-300 border-green-300 text-[#3B4E42]"
                        : "border-white/10 text-white hover:border-white hover:bg-white/5"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

               <button 
                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                 disabled={currentPage === totalPages}
                 className="p-2 border border-white/10 text-white hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-colors"
               >
                 <FiChevronRight />
               </button>
             </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default AllAssignedTours;