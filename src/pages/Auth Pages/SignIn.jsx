import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { googleLogin, signInUser, user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect after successful authentication
  useEffect(() => {
    if (!loading && user?.role) {
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    }
  }, [user, loading, location, navigate]);

  const handleGoogleLogin = async () => {
    console.log("SignIn: Starting Google login");
    setAuthError("");
    setIsSubmitting(true);
    try {
      await googleLogin();
      // Navigation will happen in useEffect when user state is set
    } catch (err) {
      console.error("Google Login Error:", err);
      setAuthError(err.message || "Google login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data) => {
    console.log("SignIn: Starting email login for:", data.email);
    setAuthError("");
    setIsSubmitting(true);
    try {
      await signInUser(data.email, data.password);
      // Navigation will happen in useEffect when user state is set
    } catch (err) {
      console.error("Email Login Error:", err);
      setAuthError(err.message || "Login failed. Please check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hero w-full min-h-screen bg-[#4d6b57] flex justify-center items-center px-4">
      <div className="card-body bg-white/10 backdrop-blur-md rounded-xl shadow-md flex flex-col gap-3 w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-white">Welcome Home</h1>
        <p className="text-gray-200">Login with ProFast</p>

        {authError && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-white text-black"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">Email is required</p>
            )}
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
              <p className="text-red-400 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <div className="text-right">
            <a className="text-white text-sm underline hover:text-[#caeb66]">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="btn w-full bg-[#caeb66] border-[#caeb66] hover:bg-[#caeb6640] text-black font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-white text-sm text-center mt-2">
          Don't have an account?{" "}
          <a href="/signUp" className="text-[#caeb90] underline font-semibold">
            Register
          </a>
        </p>

        <div className="divider text-white">OR</div>

        <button
          type="button"
          disabled={isSubmitting || loading}
          className="btn w-full bg-white text-black border-[#e5e5e5] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={20} />
          {isSubmitting || loading ? "Loading..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
