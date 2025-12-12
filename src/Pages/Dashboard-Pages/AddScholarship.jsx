import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);

    // simulate API delay
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "Success!",
        text: "Scholarship has been added successfully.",
        icon: "success",
        confirmButtonColor: "#d95022",
      });

      console.log(data);
      reset();
    }, 1500);
  };

  return (
    <div className="bg-base-200 min-h-screen py-10">
      {/** PAGE ANIMATION WRAPPER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 py-10"
      >
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#d95022] to-[#5a1163] bg-clip-text text-transparent drop-shadow-xl logo">
            Add Scholarship
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Provide accurate details to publish a new scholarship opportunity.
          </p>
        </div>

        {/* FORM CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10"
        >
          {/* LOADER */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                visible={true}
              />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* SECTION TITLE */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-[#d95022]">
                  🎓 Scholarship Information
                </h3>
                <div className="h-[3px] w-full bg-gradient-to-r from-[#d95022] to-[#5a1163] mt-2"></div>
              </div>

              {/* FIELDS */}
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
                <div key={index} className="group">
                  <label className="font-semibold text-[#5a1163]">
                    {item.label}
                  </label>
                  <input
                    type={item.type}
                    {...register(item.name, { required: true })}
                    placeholder={item.placeholder}
                    className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022] transition-all"
                  />
                </div>
              ))}

              {/* ACADEMIC INFO TITLE */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-2xl font-bold text-[#5a1163]">
                  📚 Academic Information
                </h3>
                <div className="h-[3px] bg-gradient-to-r from-[#5a1163] to-[#d95022] mt-2"></div>
              </div>

              {/* Subject Category */}
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

              {/* Scholarship Category */}
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

              {/* Degree */}
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

              {/* Tuition Fees */}
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

              {/* Application Fees */}
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

              {/* Service Charge */}
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

              {/* Deadline */}
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

              {/* Posted Date */}
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

              {/* Email */}
              <div>
                <label className="font-semibold text-[#5a1163]">
                  Posted User Email
                </label>
                <input
                  type="email"
                  {...register("postedUserEmail", { required: true })}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                  placeholder="your email"
                />
              </div>

              {/* SUBMIT BUTTON */}
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
