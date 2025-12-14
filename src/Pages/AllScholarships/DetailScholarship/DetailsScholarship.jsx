import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import { ArrowLeft } from "lucide-react";
// import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const DetailsScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scholarshipData = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  // ================= LOADER =================
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // ================= FETCH MY APPLICATIONS =================
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/my-applications?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        setApplications(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        setApplications([]);
      });
  }, [axiosSecure, user]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Bars height="80" width="80" color="#d95022" />
      </div>
    );
  }

  // ================= DATA CHECK =================
  if (!scholarshipData) {
    return (
      <p className="text-center mt-20 text-red-500 font-semibold">
        Scholarship not found.
      </p>
    );
  }

  // ================= APPLIED CHECK =================
  const appliedScholarship = applications.find(
    (item) => String(item.scholarshipId) === String(scholarshipData._id)
  );

  const isApplied = Boolean(appliedScholarship);

  // ================= APPLY HANDLER =================
  const handleApply = () => {
    if (!user?.email) {
      Swal.fire("Login Required", "Please login to apply.", "warning");
      return;
    }

    Swal.fire({
      title: `Apply to ${scholarshipData.scholarshipName}`,
      html: `
        <p>
          Application Fee:
          <strong>
            ${
              scholarshipData.applicationFees === 0
                ? " Free"
                : ` $${scholarshipData.applicationFees}`
            }
          </strong>
        </p>
        <p class="mt-2">Are you sure you want to apply?</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, apply",
    }).then((result) => {
      if (!result.isConfirmed) return;

      if (isApplied) {
        Swal.fire(
          "Already Applied!",
          "You have already applied for this scholarship.",
          "info"
        );
        return;
      }

      const applicationData = {
        scholarshipId: scholarshipData._id,
        scholarshipName: scholarshipData.scholarshipName,
        universityName: scholarshipData.universityName,
        universityCountry: scholarshipData.universityCountry,
        universityCity: scholarshipData.universityCity,
        degree: scholarshipData.degree,
        applicationFees: scholarshipData.applicationFees,
        applicationStatus: "pending",
        paymentStatus:
          scholarshipData.applicationFees === 0 ? "paid" : "unpaid",
        applicationDate: new Date(),
        userEmail: user.email,
      };

      axiosSecure
        .post("/my-applications", applicationData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then(() => {
          Swal.fire(
            "Success!",
            "Application submitted successfully.",
            "success"
          );
          navigate("/dashboard/my-applications");
        })
        .catch(() => {
          Swal.fire("Error", "Failed to submit application.", "error");
        });
    });
  };

  // ================= UI =================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary flex items-center gap-2 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl border p-6 md:p-10"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            src={scholarshipData.universityImage}
            alt="University"
            className="rounded-2xl w-full h-72 object-cover shadow-xl"
          />

          <div>
            <h1 className="text-4xl font-bold text-primary logo">
              {scholarshipData.scholarshipName}
            </h1>

            <p className="text-xl font-semibold text-secondary mt-2">
              {scholarshipData.universityName}
            </p>

            {isApplied && (
              <span className="inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                Status: {appliedScholarship.applicationStatus}
              </span>
            )}

            <div className="mt-5 space-y-3 text-gray-700 text-sm">
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
            </div>

            <motion.button
              whileHover={!isApplied ? { scale: 1.05 } : {}}
              whileTap={!isApplied ? { scale: 0.95 } : {}}
              disabled={isApplied}
              onClick={!isApplied ? handleApply : undefined}
              className={`mt-6 px-8 py-3 rounded-xl font-semibold text-lg text-white ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply for Scholarship"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* DESCRIPTION */}
      <motion.div
        className="mt-12 bg-white shadow-xl p-8 rounded-3xl border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-3">About This Scholarship</h2>
        <p className="text-gray-700 leading-relaxed text-sm">
          {scholarshipData.description || "No description available."}
        </p>
      </motion.div>

      {/* REVIEWS */}
      <motion.div
        className="mt-12 bg-white shadow-xl p-8 rounded-3xl border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

        {scholarshipData.reviews?.length > 0 ? (
          scholarshipData.reviews.map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">{review.studentName}</h4>
                <div className="text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{review.date}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No student reviews yet.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DetailsScholarship;
