import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, googleLogin, updateUserProfile, user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!loading && user?.role) {
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    }
  }, [user, loading, location, navigate]);

  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosSecure.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`,
        formData
      );
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setAuthError("");
    setIsSubmitting(true);
    try {
      await createUser(data.email, data.password);
      await axiosSecure.post("/users", {
        userEmail: data.email,
        role: "tourist",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      });

      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });
    } catch (err) {
      console.error("Signup error:", err.message);
      setAuthError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setIsSubmitting(true);
    try {
      const res = await googleLogin();
      await axiosSecure.post("/users", {
        userEmail: res.user?.email,
        role: "tourist",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Google Sign-In Error:", err.message);
      setAuthError(err.message || "Google registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hero w-full min-h-screen bg-[#4d6b57] flex justify-center items-center px-4 py-8">
      <div className="card-body bg-white/10 backdrop-blur-md rounded-xl shadow-md flex flex-col gap-3 w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-white">Join ROAVIA</h1>
        <p className="text-gray-200">Create an account with us</p>

        {authError && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
            {authError}
          </div>
        )}

        {/* Profile image preview */}
        <div className="h-24 w-24 rounded-full border-4 border-[#caeb66] mx-auto overflow-hidden mb-2 shadow">
          {uploading ? (
            <div className="flex items-center justify-center h-full text-sm text-gray-300">Uploading...</div>
          ) : profilePic ? (
            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-200">Your Profile</div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full bg-white text-black"
              placeholder="Full Name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">Name is required</p>}
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-white text-black"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full bg-white text-black"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">Minimum 6 characters</p>
            )}
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Upload Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full bg-white text-black"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading || uploading}
            className="btn w-full bg-[#caeb66] border-[#caeb66] hover:bg-[#caeb6640] text-black font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-white text-sm text-center mt-2">
          Already have an account?{" "}
          <a href="/signIn" className="text-[#caeb90] underline font-semibold">
            Login
          </a>
        </p>

        <div className="divider text-white">OR</div>

        <button
          type="button"
          disabled={isSubmitting || loading}
          onClick={handleGoogleSignIn}
          className="btn w-full bg-white text-black border-[#e5e5e5] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle size={20} />
          {isSubmitting || loading ? "Loading..." : "Register with Google"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
