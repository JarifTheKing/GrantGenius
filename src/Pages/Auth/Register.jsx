import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, signInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [preview, setPreview] = useState("");

  const from = location.state?.from || "/";

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = (data) => {
    registerUser(data.email, data.password, data.name, preview || null)
      .then(() => navigate(from, { replace: true }))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="min-h-screen flex items-center rounded-3xl my-8 justify-center px-4 py-16 bg-black relative overflow-hidden">
      {/* === THEME COLOR GLOW BACKGROUND === */}
      <div className="absolute w-[650px] h-[650px] bg-[#d95022]/40 rounded-full blur-[160px] -top-40 -left-40"></div>
      <div className="absolute w-[550px] h-[550px] bg-[#5a1163]/40 rounded-full blur-[160px] -bottom-40 -right-40"></div>

      {/* Main Card */}
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20
                      shadow-[0_0_60px_-10px_rgba(255,255,255,0.25)]
                      rounded-3xl p-8"
      >
        <h2 className="text-4xl font-extrabold text-center text-white tracking-wide mb-4 logo">
          Create Account
        </h2>

        <p className="text-center text-white/70 mb-8">
          Join{" "}
          <span className="font-bold text-xl" style={{ color: "#d95022" }}>
            GrantGenius
          </span>{" "}
          Today!
        </p>

        {/* ===== FORM START ===== */}
        <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">Name</span>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full bg-white/20 
                         text-white placeholder-white/50 border-white/30 mt-2"
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
            )}
          </label>

          {/* Image Upload */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Profile Image
            </span>

            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full 
                         border-white/30 bg-[#d95022]/80 text-white mt-2"
            />

            {preview && (
              <img
                src={preview}
                className="w-20 h-20 rounded-full mt-3 border-2 
                           border-white shadow-md object-cover"
              />
            )}
          </label>

          {/* Email */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Email
            </span>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-white/20 
                         text-white placeholder-white/50 border-white/30 mt-2"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </label>

          {/* Password */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Password
            </span>
            <input
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full bg-white/20 
                         text-white placeholder-white/50 border-white/30 mt-2"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </label>

          {/* Submit Button */}
          <button
            className="btn my-4 w-full text-white font-bold border-none
                       shadow-lg"
            style={{ backgroundColor: "#d95022" }}
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-white/70 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={signInWithGoogle}
          className="btn border-0 w-full bg-white text-black font-semibold hover:bg-gray-200 shadow-lg"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            viewBox="0 0 512 512"
          >
            <g>
              <path fill="#fff" d="m0 0H512V512H0"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p className="text-center text-white/80 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:underline"
            style={{ color: "#d95022" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
