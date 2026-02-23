import React from "react";
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

  const { googleLogin, signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    console.log("SignIn: Starting Google login");
    try {
      const res = await googleLogin();
      console.log("Google Login Success:", res.user);
      navigate(location.state?.pathname || "/");
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  };

  const onSubmit = async (data) => {
    console.log("SignIn: Starting email login for:", data.email);
    try {
      const res = await signInUser(data.email, data.password);
      console.log("Email Login Success:", res.user);
      navigate(location.state?.pathname || "/");
    } catch (err) {
      console.error("Email Login Error:", err.message);
    }
  };

  return (
    <div className="hero w-full min-h-screen bg-[#4d6b57] flex justify-center items-center px-4">
      <div className="card-body bg-white/10 backdrop-blur-md rounded-xl shadow-md flex flex-col gap-3 w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-white">Welcome Home</h1>
        <p className="text-gray-200">Login with ProFast</p>

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
            className="btn w-full bg-[#caeb66] border-[#caeb66] hover:bg-[#caeb6640] text-black font-semibold transition duration-300"
          >
            Login
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
          className="btn w-full bg-white text-black border-[#e5e5e5] hover:bg-gray-100"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={20} />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
