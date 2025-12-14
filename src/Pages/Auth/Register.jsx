import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Bars } from "react-loader-spinner";

const Register = () => {
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, signInWithGoogle, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState([]);

  // Loader States
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  //  PAGE LOAD LOADER
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Simulating page load (You can replace with real auth check)
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // IMAGE PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImage(e.target.files);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // SAVE USER TO DB
  const { mutateAsync: saveUserToDB } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post("/users", userData);
      return res.data;
    },
  });

  // REGISTER HANDLER
  const handleRegister = async (formDataInput) => {
    setLoading(true);
    const loadingToast = toast.loading("Creating account...");

    try {
      if (!image.length) {
        toast.dismiss(loadingToast);
        setLoading(false);
        return toast.error("Please upload a profile image.");
      }

      // Upload image to imgbb
      const imgForm = new FormData();
      imgForm.append("image", image[0]);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imgBB_API_KEY
        }`,
        imgForm
      );

      const imageURL = uploadRes.data.data?.display_url;

      // Firebase user
      const result = await registerUser(
        formDataInput.email,
        formDataInput.password
      );

      const user = result.user;
      await user.getIdToken(true);

      // Update profile
      await updateUserProfile(formDataInput.name, imageURL);

      // Save to DB
      await saveUserToDB({
        name: formDataInput.name,
        email: formDataInput.email,
        photoURL: imageURL,
        role: "Student",
        createdAt: new Date(),
      });

      toast.dismiss(loadingToast);
      toast.success(`Welcome, ${formDataInput.name}!`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    const loadingToast = toast.loading("Signing in with Google...");

    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;

        await saveUserToDB({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "Student",
          createdAt: new Date(),
        });

        toast.dismiss(loadingToast);
        toast.success(`Welcome, ${user.displayName}!`);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        toast.error(err.message);
      })
      .finally(() => {
        setGoogleLoading(false);
      });
  };

  // ============================
  // ⭐ PAGE LOADER UI
  // ============================
  if (pageLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <Bars
          height="80"
          width="80"
          color="#d95022"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center rounded-3xl my-8 justify-center px-4 py-16 bg-black relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute w-[650px] h-[650px] bg-[#d95022]/40 rounded-full blur-[160px] -top-40 -left-40"></div>
      <div className="absolute w-[550px] h-[550px] bg-[#5a1163]/40 rounded-full blur-[160px] -bottom-40 -right-40"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_-10px_rgba(255,255,255,0.25)] rounded-3xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-white tracking-wide mb-4 logo">
          Create Account
        </h2>

        <p className="text-center text-white/70 mb-8">
          Join{" "}
          <span
            className="font-bold text-2xl logo"
            style={{ color: "#d95022" }}
          >
            GrantGenius
          </span>{" "}
          Today!
        </p>

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">Name</span>
            <input
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 20, message: "Name cannot be too long" },
              })}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30 mt-2"
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
            )}
          </label>

          {/* Profile Image */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Profile Image
            </span>

            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full border-white/30 bg-[#d95022]/80 text-white mt-2"
            />

            {preview && (
              <img
                src={preview}
                className="w-20 h-20 rounded-full mt-3 border-2 border-white shadow-md object-cover"
              />
            )}
          </label>

          {/* Email */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Email
            </span>

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30 mt-2"
            />

            {errors.email && (
              <p className="text-red-300 text-sm mt-1">
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
                {...register("password", {
                  required: "Password required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
                    message:
                      "Password must include uppercase, lowercase & number",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30 mt-2"
              />

              {errors.password && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </label>

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-white/70 hover:text-white cursor-pointer text-xl z-20"
            >
              {showPassword ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Submit */}
          <button
            className="btn my-4 w-full text-white font-bold border-none shadow-lg"
            style={{ backgroundColor: "#d95022" }}
            disabled={loading}
          >
            {loading ? (
              <Bars
                height="26"
                width="26"
                color="#ffffff"
                ariaLabel="bars-loading"
                visible
              />
            ) : (
              "Create Account"
            )}
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
          onClick={handleGoogleLogin}
          className="btn border-0 w-full bg-white text-black font-semibold hover:bg-gray-200 shadow-lg"
          disabled={googleLoading}
        >
          {googleLoading ? (
            <Bars
              height="26"
              width="26"
              color="#000000"
              ariaLabel="bars-loading"
              visible
            />
          ) : (
            <>
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
            </>
          )}
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
