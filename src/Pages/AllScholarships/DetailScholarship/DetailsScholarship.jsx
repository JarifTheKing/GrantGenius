import React from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import { motion } from "framer-motion";

const DetailsScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scholarships, reviews } = useLoaderData();

  const scholarshipData = scholarships.find((item) => item.id === parseInt(id));

  if (!scholarshipData) {
    return (
      <p className="text-center mt-20 text-red-500 text-lg font-semibold">
        Scholarship not found...
      </p>
    );
  }

  const scholarshipReviews = reviews.filter(
    (rev) => rev.scholarshipId === parseInt(id)
  );

  const handleApply = () => {
    navigate(`/checkout/${scholarshipData.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      {/* ================= Hero Section ================= */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-gray-100"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            src={scholarshipData.universityImage}
            alt="University"
            className="rounded-2xl w-full h-72 object-cover shadow-md border"
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              {scholarshipData.scholarshipName}
            </h1>

            <p className="text-xl font-semibold text-primary mt-2">
              {scholarshipData.universityName}
            </p>

            <div className="mt-4 space-y-2 text-gray-700 text-[15px]">
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleApply}
              className="mt-6 bg-primary text-white px-7 py-3 rounded-xl shadow-lg hover:bg-primary/90 transition w-full md:w-auto text-lg font-medium"
            >
              Apply for Scholarship
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ================= Description Section ================= */}
      <div className="mt-12 bg-white p-8 shadow-lg rounded-3xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">
          Scholarship Description
        </h2>
        <p className="text-gray-700 leading-relaxed text-[15px]">
          {scholarshipData.description ||
            "No detailed description available for this scholarship."}
        </p>
      </div>

      {/* ================= Coverage / Stipend ================= */}
      <div className="mt-12 bg-white p-8 shadow-lg rounded-3xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">
          Scholarship Coverage
        </h2>
        <p className="text-gray-700 leading-relaxed text-[15px]">
          {scholarshipData.coverage ||
            "Coverage or stipend information is not available."}
        </p>
      </div>

      {/* ================= Reviews Section ================= */}
      <div className="mt-12 bg-white p-8 shadow-lg rounded-3xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-5 text-gray-900">
          Student Reviews
        </h2>

        {scholarshipReviews.length === 0 ? (
          <p className="text-gray-500 text-[15px]">No reviews available yet.</p>
        ) : (
          <div className="space-y-6">
            {scholarshipReviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-5 border rounded-2xl shadow-sm flex gap-5 bg-gray-50"
              >
                <img
                  src={rev.userImage}
                  alt={rev.userName}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{rev.userName}</h3>

                  <p className="text-sm text-gray-500">{rev.reviewDate}</p>

                  <p className="text-yellow-500 mt-1 text-lg">
                    {"⭐".repeat(rev.ratingPoint)}
                  </p>

                  <p className="text-gray-700 mt-2 text-[15px] leading-relaxed">
                    {rev.reviewComment}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DetailsScholarship;
