import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
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

  

  // ✅ Fetch tour data by ID
  const { data: tour = null, isLoading: loadingTour } = useQuery({
    queryKey: ["tourData", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tours-package/${id}`);
      return res.data;
    },
  });

  // ✅ Fetch tour guides
  const { data: guides = [], isLoading: loadingGuides } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tour-guides");
      return res.data;
    },
  });

  // ✅ Booking handler
  const handleBooking = async () => {
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
      tourId : tour._id ,
      packageName: tour.title,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: tour.price,
      tourDate: startDate,
      guideName: selectedGuide,
      status: "pending",
      paymentStatus : "pending"
    };

    console.log("bookingPage" , tour._id)

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      setModalIsOpen(true);
      console.log(res.data)
    } catch (err) {
      toast.error("Booking failed. Please try again.");
      console.error(err);
    }
  };

  if (loadingTour || loadingGuides) return <p className="min-h-screen">Loading...</p>;
  if (!tour) return <p className="min-h-screen">Tour not found.</p>;

  return (
    <div className="space-y-10 px-6 py-8">
      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tour.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Tour image ${i + 1}`}
            className="w-full h-48 object-cover rounded-md shadow"
          />
        ))}
      </div>

      {/* About the Tour */}
      <div className="text-white bg-[#3b4e42] p-6 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-2">About the Tour</h2>
        <p>{tour.description}</p>
        <br />
        <img src={tour.photo} alt="" className="lg:h-122 lg:w-screen" />
      </div>

      {/* Tour Plan */}
      <div className="text-white bg-[#3b4e42] p-6 rounded-md shadow space-y-4">
        <h2 className="text-2xl font-bold">Tour Plan</h2>
        {tour.plan?.map((day, i) => (
          <div key={i}>
            <h4 className="font-semibold">Day {i + 1}:</h4>
            <p>{day}</p>
          </div>
        ))}
      </div>

            {/* Booking Form */}
    {/* Booking Form */}
<div className="bg-[#3b4e42] p-6 rounded-md shadow-md max-w-3xl mx-auto">
  <h2 className="text-2xl font-bold mb-6 text-lime-300 text-center">
    Book This Tour
  </h2>
  <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Package Title */}
    <div className="flex flex-col">
      <label className="mb-1 text-lime-200 font-semibold">Package Name</label>
      <input
        type="text"
        value={tour.title}
        readOnly
        className="input input-bordered bg-[#2f4237] border-lime-500 text-lime-100"
      />
    </div>

    {/* Tourist Name */}
    <div className="flex flex-col">
      <label className="mb-1 text-lime-200 font-semibold">Your Name</label>
      <input
        type="text"
        value={user?.displayName || ""}
        readOnly
        className="input input-bordered bg-[#2f4237] border-lime-500 text-lime-100"
      />
    </div>

    {/* Tourist Email */}
    <div className="flex flex-col">
      <label className="mb-1 text-lime-200 font-semibold">Your Email</label>
      <input
        type="email"
        value={user?.email || ""}
        readOnly
        className="input input-bordered bg-[#2f4237] border-lime-500 text-lime-100"
      />
    </div>

    {/* Price */}
    <div className="flex flex-col">
      <label className="mb-1 text-lime-200 font-semibold">Price (৳)</label>
      <input
        type="number"
        value={tour.price}
        readOnly
        className="input input-bordered bg-[#2f4237] border-lime-500 text-lime-100"
      />
    </div>

    {/* Date Picker */}
    <div className="flex flex-col md:col-span-2">
      <label className="mb-1 text-lime-200 font-semibold">Select Tour Date</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="input input-bordered w-full bg-[#2f4237] border-lime-500 text-lime-100"
        calendarClassName="bg-[#3b4e42] text-lime-200"
      />
    </div>

    {/* Tour Guide Select */}
    <div className="flex flex-col md:col-span-2">
      <label className="mb-1 text-lime-200 font-semibold">Select a Tour Guide</label>
      <select
        value={selectedGuide}
        onChange={(e) => setSelectedGuide(e.target.value)}
        className="select select-bordered w-full bg-[#2f4237] border-lime-500 text-lime-100"
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
      >
        <option disabled value="">
          Select a tour guide
        </option>
        {guides.map((g) => (
          <option
            key={g._id}
            value={g.name}
            style={{ backgroundColor: "#2f4237", color: "#d9f99d" }}
          >
            {g.name}
          </option>
        ))}
      </select>
    </div>

    {/* Book Now Button */}
    <div className="md:col-span-2">
      <button
        onClick={handleBooking}
        className="w-full bg-lime-500 hover:bg-lime-400 text-[#3b4e42] font-bold py-3 rounded-md transition-colors duration-300"
      >
        Book Now
      </button>
    </div>
  </form>
</div>


      {/* Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        className="bg-white p-6 max-w-sm mx-auto rounded shadow mt-20"
      >
        <h2 className="text-xl font-bold text-green-700 mb-4">
          Confirm your Booking
        </h2>
        <p className="mb-4">
          Your booking request has been sent. You can manage it from My Bookings.
        </p>
        <button
          onClick={() => navigate("/dashBoard/manageBookings")}
          className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-400"
        >
          Go to My Bookings
        </button>
      </Modal>

      {/* Tour Guides */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-green-900">Tour Guides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {guides.map((guide) => (
            <div
              key={guide._id}
              onClick={() => navigate(`/guide/${guide._id}`)}
              className="cursor-pointer bg-[#4d6b57] text-white p-3 rounded-md hover:bg-[#3b4e42] transition"
            >
              <img
                src={guide.photo}
                alt={guide.name}
                className="h-32 w-full object-cover rounded"
              />
              <h4 className="mt-2 font-semibold">{guide.name}</h4>
              <p className="text-sm">Exp: {guide.experience_years} yrs</p>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default PackageDetails;
