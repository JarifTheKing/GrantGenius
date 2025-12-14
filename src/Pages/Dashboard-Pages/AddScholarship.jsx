import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    data.postedUserEmail = user?.email;

    try {
      const res = await axiosSecure.post("/all-scholarship", data);
      setLoading(false);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Scholarship has been added successfully.",
          icon: "success",
          confirmButtonColor: "#d95022",
        });
        reset();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add scholarship.",
          icon: "error",
          confirmButtonColor: "#d95022",
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#d95022",
      });
    }
  };

  return (
    <div className="min-h-screen py-10 bg-base-200 bg-gradient-to-br from-base-200 via-white/40 to-base-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 py-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#d95022] to-[#5a1163] bg-clip-text text-transparent drop-shadow-xl logo">
            Add Scholarship
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Provide accurate details to publish a new scholarship opportunity.
          </p>
        </div>

        {/* Admin Info */}
        <div
          className="max-w-md mx-auto my-10 p-6 rounded-3xl 
  bg-white/10 backdrop-blur-2xl shadow-xl
  border border-primary/10 flex flex-col items-center gap-6
  animate-[fadeIn_0.6s_ease-out]"
        >
          <style>
            {`
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `}
          </style>

          {/* Profile Image */}
          <div className="relative">
            <img
              src={user?.photoURL || "/404.jpeg"}
              alt="User"
              className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white/40"
            />
            <span className="absolute -bottom-1.5 -right-1.5 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></span>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center text-center gap-2 w-full">
            {/* Name */}
            <h2
              className="text-2xl font-bold flex items-center justify-center gap-2
      bg-gradient-to-r from-purple-500 to-orange-400 bg-clip-text text-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-purple-500/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.507 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              {user?.displayName || "Admin User"}
            </h2>

            {/* Email */}
            <p className="text-base flex items-center justify-center gap-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m8 0a4 4 0 10-8 0m8 0v.01M8 12v.01M12 4a8 8 0 110 16 8 8 0 010-16z"
                />
              </svg>

              {user?.email || "No Email"}
            </p>

            {/* Badge */}
            <div
              className="mt-2 px-4 py-1 
      bg-gradient-to-r from-orange-500 to-red-500
      rounded-full text-xs text-white font-bold shadow-md
      animate-pulse"
            >
              Dashboard Admin
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10"
        >
          {/* 🔥 LOADER HERE */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Bars
                height="80"
                width="80"
                color="#d95022"
                ariaLabel="bars-loading"
                visible={true}
              />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-[#d95022]">
                  🎓 Scholarship Information
                </h3>
                <div className="h-[3px] w-full bg-gradient-to-r from-[#d95022] to-[#5a1163] mt-2"></div>
              </div>

              {[
                {
                  label: "Scholarship Name",
                  name: "scholarshipName",
                  type: "text",
                  placeholder: "Global Excellence Scholarship",
                },
                {
                  label: "University Name",
                  name: "universityName",
                  type: "text",
                  placeholder: "Harvard University",
                },
                {
                  label: "University Image URL",
                  name: "universityImage",
                  type: "text",
                  placeholder: "https://example.com/image.jpg",
                },
                {
                  label: "University Country",
                  name: "universityCountry",
                  type: "text",
                  placeholder: "USA, Canada, Australia...",
                },
                {
                  label: "University City",
                  name: "universityCity",
                  type: "text",
                  placeholder: "New York, Toronto...",
                },
                {
                  label: "University World Rank",
                  name: "universityWorldRank",
                  type: "number",
                  placeholder: "1 - 1000",
                },
              ].map((item, index) => (
                <div key={index}>
                  <label className="font-semibold text-[#5a1163]">
                    {item.label}
                  </label>
                  <input
                    type={item.type}
                    {...register(item.name, { required: true })}
                    placeholder={item.placeholder}
                    className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                  />
                </div>
              ))}

              <div className="md:col-span-2 mt-4">
                <h3 className="text-2xl font-bold text-[#5a1163]">
                  📚 Academic Information
                </h3>
                <div className="h-[3px] bg-gradient-to-r from-[#5a1163] to-[#d95022] mt-2"></div>
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Subject Category
                </label>
                <select
                  {...register("subjectCategory", { required: true })}
                  className="select select-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                >
                  <option value="">Select Category</option>
                  <option>Engineering</option>
                  <option>Business</option>
                  <option>Arts</option>
                  <option>Science</option>
                  <option>Law</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Scholarship Category
                </label>
                <select
                  {...register("scholarshipCategory", { required: true })}
                  className="select select-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                >
                  <option value="">Select Category</option>
                  <option>Full Fund</option>
                  <option>Partial</option>
                  <option>Self-fund</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Degree Level
                </label>
                <select
                  {...register("degree", { required: true })}
                  className="select select-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                >
                  <option value="">Select Degree</option>
                  <option>Diploma</option>
                  <option>Bachelor</option>
                  <option>Masters</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Tuition Fees (Optional)
                </label>
                <input
                  type="number"
                  {...register("tuitionFees")}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                  placeholder="e.g. 5000"
                />
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Application Fees
                </label>
                <input
                  type="number"
                  {...register("applicationFees", { required: true })}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                  placeholder="e.g. 100"
                />
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Service Charge
                </label>
                <input
                  type="number"
                  {...register("serviceCharge", { required: true })}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                  placeholder="e.g. 300"
                />
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Application Deadline
                </label>
                <input
                  type="date"
                  {...register("applicationDeadline", { required: true })}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Posted Date
                </label>
                <input
                  type="date"
                  {...register("scholarshipPostDate", { required: true })}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#5a1163]">
                  Posted User Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  {...register("postedUserEmail", { required: true })}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                />
              </div>

              <div className="md:col-span-2 mt-8">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn w-full text-lg py-3 bg-gradient-to-r from-[#d95022] to-[#5a1163] text-white font-bold rounded-xl border-none shadow-lg hover:opacity-90"
                >
                  Submit Scholarship
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddScholarship;
