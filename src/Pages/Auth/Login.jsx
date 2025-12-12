import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // ===================== HANDLE LOGIN =====================
  const handleLogin = (data) => {
    const loading = toast.loading("Logging in...");

    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        toast.dismiss(loading);
        toast.success(`Welcome back, ${user.displayName || "User"}!`);

        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.dismiss(loading);
        toast.error(err.message);
      });
  };

  // ===================== GOOGLE LOGIN =====================
  const handleGoogleLogin = () => {
    const loading = toast.loading("Signing in with Google...");

    signInWithGoogle()
      .then((result) => {
        const user = result.user;

        toast.dismiss(loading);
        toast.success(`Welcome, ${user.displayName}!`);

        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.dismiss(loading);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center rounded-3xl my-8 justify-center px-4 relative overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute w-[650px] h-[650px] bg-[#d95022]/40 rounded-full blur-[160px] -top-40 -left-40"></div>
      <div className="absolute w-[550px] h-[550px] bg-[#5a1163]/40 rounded-full blur-[160px] -bottom-40 -right-40"></div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_-10px_rgba(255,255,255,0.25)] rounded-3xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 logo">
          Welcome Back
        </h1>

        <p>
          <p className="text-center text-white/70 mb-8">
            Log in{" "}
            <span
              className="font-bold text-2xl logo"
              style={{ color: "#d95022" }}
            >
              GrantGenius
            </span>{" "}
            to access your account!
          </p>
        </p>

        {/* ===================== LOGIN FORM ===================== */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Email
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30 mt-2"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </label>

          {/* Password */}
          <div className="relative">
            <label className="form-control w-full">
              <span className="label-text text-white/90 font-semibold">
                Password
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30 mt-2 pr-10"
              />

              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </label>

            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-white/70 hover:text-white cursor-pointer text-xl z-20"
            >
              {showPassword ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Login Button */}
          <button
            className="btn w-full text-white font-bold border-none shadow-lg mt-2"
            style={{ backgroundColor: "#d95022" }}
          >
            Login
          </button>

          <p className="text-sm text-center text-white/80 mt-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold hover:underline"
              style={{ color: "#d95022" }}
            >
              Register
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-white/70 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn border-0 w-full bg-white text-black font-semibold hover:bg-gray-200 shadow-lg"
        >
          <svg width="16" height="16" viewBox="0 0 512 512">
            <g>
              <path fill="#fff" d="M0 0h512v512H0"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
