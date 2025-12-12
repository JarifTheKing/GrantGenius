import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import { ArrowLeft } from "lucide-react";

const DetailsScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scholarshipData = useLoaderData();

  const [loading, setLoading] = useState(true);

  // Small delay for loader (doesn’t affect your data logic)
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  // ================= LOADER =================
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
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

  if (!scholarshipData) {
    return (
      <p className="text-center mt-20 text-red-500 text-lg font-semibold">
        Scholarship not found...
      </p>
    );
  }

  // ================= APPLY HANDLER =================
  const handleApply = () => {
    Swal.fire({
      title: "Proceed to Apply?",
      text: "You will be redirected to the checkout page.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/checkout/${scholarshipData._id}`);
      }
    });
  };

  // ================= UI =================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="  py-12"
    >
      {/* Back Button (Unchanged) */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary flex items-center gap-2 text-white hover:text-white mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white shadow-2xl border border-gray-100 p-6 md:p-10"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <motion.img
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            src={scholarshipData.universityImage}
            alt="University"
            className="rounded-2xl w-full h-72 object-cover shadow-xl"
          />

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 logo leading-snug">
              {scholarshipData.scholarshipName}
            </h1>

            <p className="text-xl font-semibold text-primary mt-2">
              {scholarshipData.universityName}
            </p>

            <div className="mt-5 space-y-3 text-gray-700 text-[15px]">
              <p>
                🌍 <b>Location:</b> {scholarshipData.universityCountry},{" "}
                {scholarshipData.universityCity}
              </p>
              <p>
                🎓 <b>Degree:</b> {scholarshipData.degree}
              </p>
              <p>
                🌐 <b>World Rank:</b> {scholarshipData.universityWorldRank}
              </p>
              <p>
                ⏳ <b>Deadline:</b> {scholarshipData.applicationDeadline}
              </p>
              <p>
                💰 <b>Application Fees:</b>{" "}
                <span className="text-primary font-semibold">
                  {scholarshipData.applicationFees === 0
                    ? "Free"
                    : `$${scholarshipData.applicationFees}`}
                </span>
              </p>

              {scholarshipData.tuitionFees && (
                <p>
                  🧾 <b>Tuition Fees:</b> {scholarshipData.tuitionFees}
                </p>
              )}
            </div>

            {/* Apply Button (Style Unchanged) */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleApply}
              className="btn btn-primary mt-6 px-8 py-3 text-lg font-semibold"
            >
              Apply for Scholarship
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* DESCRIPTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 bg-white shadow-xl p-8 rounded-3xl border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-3 text-gray-900">
          Scholarship Description
        </h2>
        <p className="text-gray-700 leading-relaxed text-[15px]">
          {scholarshipData.description ||
            "No detailed description available for this scholarship."}
        </p>
      </motion.div>

      {/* COVERAGE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 bg-white shadow-xl p-8 rounded-3xl border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-3 text-gray-900">
          Scholarship Coverage
        </h2>
        <p className="text-gray-700 leading-relaxed text-[15px]">
          {scholarshipData.coverage ||
            "Coverage or stipend information is not available."}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DetailsScholarship;
