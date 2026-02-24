import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { FiMapPin, FiCalendar, FiDollarSign, FiUser, FiCheckCircle } from "react-icons/fi";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const PackageDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch tour data
  const { data: tour = null, isLoading: loadingTour } = useQuery({
    queryKey: ["tourData", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tours-package/${id}`);
      return res.data;
    },
  });

  // Fetch tour guides
  const { data: guides = [], isLoading: loadingGuides } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tour-guides");
      return res.data;
    },
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book a package.");
      navigate("/login");
      return;
    }

    if (!selectedGuide) {
      toast.error("Please select a tour guide.");
      return;
    }

    const bookingData = {
      tourId: tour._id,
      packageName: tour.title,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: tour.price,
      tourDate: startDate,
      guideName: selectedGuide,
      status: "pending",
      paymentStatus: "pending"
    };

    try {
      await axiosSecure.post("/bookings", bookingData);
      setModalIsOpen(true);
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    }
  };

  if (loadingTour || loadingGuides) {
    return (
      <div className="min-h-screen bg-[#3B4E42] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-green-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tour) return <div className="min-h-screen bg-[#3B4E42] text-white flex justify-center items-center">Tour not found.</div>;


  const galleryImages = (Array.isArray(tour.images) && tour.images.length > 0)
    ? tour.images
    : [tour.image || tour.photo || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"];

  return (
    <div className="min-h-screen bg-[#3B4E42] text-white">

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[50vh] md:h-[60vh] gap-1 p-1">
        {galleryImages.slice(0, 5).map((img, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden group bg-black/20 ${

              i === 0 
                ? (galleryImages.length === 1 ? "md:col-span-4 md:row-span-2" : "md:col-span-2 md:row-span-2") 
                : "md:col-span-1 md:row-span-1"
            }`}
          >
            <img
              src={img}
              alt={`Tour visual ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-green-300 mb-2 uppercase tracking-wider text-xs font-bold">
                <FiMapPin />
                <span>{tour.type || "Adventure"}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                {tour.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/70 border-y border-white/10 py-6">
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-green-300" />
                  <span className="text-xl font-bold text-white">${tour.price}</span>
                  <span className="text-sm">/ person</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-green-300" />
                  <span>5 Days / 4 Nights</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">About the Experience</h2>
              <p className="text-white/80 leading-relaxed text-lg font-light">
                {tour.description}
              </p>
            </div>

            {/* Tour Plan (Timeline) */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Itinerary</h2>
              <div className="border-l-2 border-white/10 ml-3 space-y-8">
                {tour.plan?.map((day, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-300 border-4 border-[#3B4E42]"></div>
                    <h4 className="text-lg font-bold text-green-300 mb-1">Day {i + 1}</h4>
                    <p className="text-white/80">{day}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Meet the Guides */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Meet Our Guides</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {guides.map((guide) => (
                  <div 
                    key={guide._id} 
                    onClick={() => navigate(`/guide/${guide._id}`)}
                    className="group cursor-pointer bg-[#2c3a31] border border-white/10 rounded-xl overflow-hidden hover:border-green-300 transition-all"
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={guide.photo} alt={guide.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white group-hover:text-green-300 transition-colors">{guide.name}</h4>
                      <p className="text-xs text-white/50">{guide.experience_years} years exp.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

 {/* --- RIGHT COLUMN: BOOKING FORM (Sticky & Outlined) --- */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 bg-transparent border-2 border-white/10 rounded-[2rem] p-8 relative hover:border-white/30 transition-colors duration-500">
              
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-3xl font-extrabold text-white uppercase tracking-tighter">Book Trip</h3>
                 <div className="flex items-center gap-2 border border-green-300 rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-green-300 tracking-widest uppercase">Instant</span>
                 </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">

                {/* Date Picker Input Group (Outlined) */}
                <div className="group space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 group-hover:text-green-300 transition-colors">Travel Date</label>
                  <div className="relative">
                       <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full bg-transparent text-white font-bold text-lg rounded-xl px-4 py-4 border-2 border-white/20 focus:border-green-300 outline-none transition-all duration-300 cursor-pointer placeholder-white/20"
                        calendarClassName="bg-white text-black font-sans shadow-xl rounded-xl border-0 p-2"
                        dateFormat="MMM d, yyyy"
                      />
                      <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-green-300 transition-colors pointer-events-none text-xl" />
                  </div>
                </div>

                {/* Guide Select Group (Outlined) */}
                <div className="group space-y-2">
                   <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1 group-hover:text-green-300 transition-colors">Your Guide</label>
                   <div className="relative">
                      <select
                        value={selectedGuide}
                        onChange={(e) => setSelectedGuide(e.target.value)}
                        className="w-full bg-transparent text-white font-bold text-lg rounded-xl px-4 py-4 border-2 border-white/20 focus:border-green-300 outline-none appearance-none transition-all duration-300 cursor-pointer"
                      >
                        <option disabled value="" className="bg-[#3B4E42]">Choose Expert...</option>
                        {guides.map((g) => (
                          <option key={g._id} value={g.name} className="bg-[#3B4E42] text-white py-2">{g.name}</option>
                        ))}
                      </select>
                      <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-green-300 transition-colors pointer-events-none text-xl" />
                   </div>
                </div>

                {/* Price Breakdown (Outlined Box) */}
                <div className="border border-dashed border-white/20 rounded-xl p-6 space-y-4 mt-6">
                  <div className="flex justify-between text-white/60 text-sm font-medium">
                    <span>Base Price</span>
                    <span>${tour.price}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-sm font-medium">
                    <span>Taxes & Fees</span>
                    <span>$0</span>
                  </div>
                  <div className="w-full h-px bg-white/10"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-white font-bold uppercase tracking-wider text-sm mb-1">Total</span>
                    <span className="text-4xl font-extrabold text-white">${tour.price}</span>
                  </div>
                </div>

                {/* Action Button (Outlined -> Solid Hover) */}
                <button
                  type="submit"
                  className="w-full bg-transparent border-2 border-green-300 text-green-300 hover:bg-green-300 hover:text-[#3B4E42] font-extrabold text-lg py-4 rounded-xl transform active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 mt-4"
                >
                  CONFIRM BOOKING
                  <FiCheckCircle className="text-xl" />
                </button>

                <p className="text-center text-white/30 text-xs font-medium tracking-wide">
                   Free cancellation up to 48 hours before trip.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <Modal
        isOpen={modalIsOpen}
        className="outline-none"
        overlayClassName="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="bg-[#2c3a31] border border-green-300 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-300/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-300">
            <FiCheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Booking Requested!</h2>
          <p className="text-white/70 mb-8">
            Your adventure awaits. We have received your booking request for <strong>{tour.title}</strong>.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setModalIsOpen(false)}
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5"
            >
              Close
            </button>
            <button
              onClick={() => navigate("/dashBoard/manageBookings")}
              className="flex-1 px-4 py-3 rounded-lg bg-green-300 text-[#3B4E42] font-bold hover:bg-white"
            >
              My Bookings
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default PackageDetails;