import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { Link } from "react-router";
import { FiCalendar, FiMapPin, FiUser, FiCreditCard, FiXCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { format } from "date-fns";

const MyBookings = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["bookings", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const cancelBooking = async (bookingId) => {
    const res = await axiosSecure.delete(`/cancel-booking/${bookingId}`);
    if (!res.data.success) throw new Error("Failed to cancel booking");
    return bookingId;
  };

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", email] });
    },
  });

  const handleCancel = (bookingId) => {
    if(window.confirm("Are you sure you want to cancel this booking?")) {
        cancelMutation.mutate(bookingId);
    }
  };

  if (isLoading)
    return (
      <div className="text-white text-center min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 animate-spin"></div>
      </div>
    );
  if (isError)
    return (
      <div className="text-red-400 text-center min-h-screen bg-[#3B4E42] flex justify-center items-center font-mono border border-red-400/30 m-8 bg-red-400/10">
        ERROR LOADING BOOKING DATA
      </div>
    );

  // Pagination logic
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-[#3B4E42] p-8 md:p-12 text-white">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/20 pb-6 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-tight flex items-center gap-3">
            <FiCalendar className="text-green-300"/> My Bookings
          </h1>
          <p className="text-white/60 text-sm font-mono mt-2">
            / USER / DASHBOARD / TRIPS
          </p>
        </div>
        
        {/* Quick Stat (Squared) */}
        <div className="border border-white/20 px-6 py-3 bg-[#2c3a31]">
           <span className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Total Trips</span>
           <span className="text-2xl font-bold text-green-300 font-mono">{bookings.length}</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-dashed border-white/20 p-20 text-center text-white/40 font-mono uppercase">
          NO BOOKINGS FOUND. START YOUR ADVENTURE!
        </div>
      ) : (
        <div className="w-full border border-white/20 bg-[#2c3a31] shadow-2xl">
           <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1f2d25] border-b border-white/20 text-xs uppercase tracking-widest text-white/50">
                  <th className="p-5 font-bold border-r border-white/10">Package Details</th>
                  <th className="p-5 font-bold border-r border-white/10">Guide</th>
                  <th className="p-5 font-bold border-r border-white/10">Schedule</th>
                  <th className="p-5 font-bold border-r border-white/10">Total Cost</th>
                  <th className="p-5 font-bold border-r border-white/10 text-center">Status</th>
                  <th className="p-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentBookings.map((booking) => (
                  <tr 
                    key={booking._id} 
                    className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-5 border-r border-white/10">
                      <div className="font-bold text-white uppercase tracking-wide text-lg">{booking.packageName}</div>
                    </td>

                    <td className="p-5 border-r border-white/10">
                       <div className="flex items-center gap-2 text-white/80">
                         <FiUser className="text-green-300" />
                         <span className="font-mono">{booking.guideName}</span>
                       </div>
                    </td>

                    <td className="p-5 border-r border-white/10">
                       <div className="flex items-center gap-2 text-white/80">
                         <FiClock className="text-white/40" />
                         <span className="font-mono">{booking.tourDate ? format(new Date(booking.tourDate), "MMM dd, yyyy") : "N/A"}</span>
                       </div>
                    </td>

                    <td className="p-5 border-r border-white/10">
                       <span className="font-mono text-xl font-bold text-green-300">${booking.price}</span>
                    </td>

                    <td className="p-5 border-r border-white/10 text-center">
                       <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-widest border ${
                          booking.status === 'pending' 
                            ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' 
                            : booking.status === 'accepted' || booking.status === 'confirmed'
                              ? 'border-green-300 text-green-300 bg-green-300/10'
                              : booking.status === 'rejected' || booking.status === 'cancelled'
                                ? 'border-red-400 text-red-400 bg-red-400/10'
                                : 'border-white/20 text-white/60'
                       }`}>
                          {booking.status === 'pending' && <FiClock size={12}/>}
                          {booking.status === 'accepted' && <FiCheckCircle size={12}/>}
                          {booking.status === 'cancelled' && <FiXCircle size={12}/>}
                          {booking.status}
                       </div>
                    </td>

                    <td className="p-5 text-center">
                       <div className="flex items-center justify-center gap-3">
                         {booking.status === "pending" && (
                            <>
                              <Link to={`/dashBoard/payment/${booking._id}`}>
                                <button 
                                  className="w-10 h-10 flex items-center justify-center border border-green-300 text-green-300 hover:bg-green-300 hover:text-[#2c3a31] transition-all duration-300"
                                  title="Proceed to Payment"
                                >
                                  <FiCreditCard size={18} />
                                </button>
                              </Link>
                              
                              <button
                                onClick={() => handleCancel(booking._id)}
                                className="w-10 h-10 flex items-center justify-center border border-red-400 text-red-400 hover:bg-red-400 hover:text-[#2c3a31] transition-all duration-300"
                                title="Cancel Booking"
                              >
                                <FiXCircle size={18} />
                              </button>
                            </>
                         )}
                         {booking.status !== "pending" && (
                           <span className="text-xs font-bold text-white/20 uppercase tracking-widest cursor-not-allowed">
                             No Actions
                           </span>
                         )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer (Squared) */}
          <div className="p-4 bg-[#1f2d25] border-t border-white/20 flex justify-center gap-2">
            {[...Array(totalPages).keys()].map((num) => (
                <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold border transition-colors ${
                    currentPage === num + 1
                    ? "bg-green-300 border-green-300 text-[#3B4E42]"
                    : "border-white/10 text-white hover:border-white hover:bg-white/5"
                }`}
                >
                {num + 1}
                </button>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default MyBookings;