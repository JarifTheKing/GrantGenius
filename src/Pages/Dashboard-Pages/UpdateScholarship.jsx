import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Bars } from "react-loader-spinner";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
// import useAxios from "../../Hooks/useAxios";

const UpdateScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    scholarshipPostDate: "",
    postedUserEmail: "",
  });

  // ================= LOAD EXISTING ==================
  useEffect(() => {
    axiosSecure
      .get(`/all-scholarship/${id}`)
      .then((res) => {
        const { _id, ...rest } = res.data;
        setFormData(rest);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, axiosSecure]);

  // ================= HANDLE INPUT ==================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE UPDATE ==================
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure
      .put(`/all-scholarship/${id}`, formData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Scholarship updated successfully!", "success");
          navigate("/dashboard/my-scholarship");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  // ================= LOADING ==================
  if (loading) {
    return (
      <div className="flex justify-center py-40">
        <Bars height="80" width="80" color="#d95022" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-base-200 bg-gradient-to-br from-base-200 via-white/40 to-base-200">
      {/* PAGE WRAPPER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 py-10"
      >
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#d95022] to-[#5a1163] bg-clip-text text-transparent drop-shadow-xl logo">
            Update Scholarship
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Update and modify your existing scholarship information.
          </p>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10"
        >
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* SECTION TITLE */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-[#d95022]">
                🎓 Scholarship Information
              </h3>
              <div className="h-[3px] w-full bg-gradient-to-r from-[#d95022] to-[#5a1163] mt-2"></div>
            </div>

            {/* INPUT FIELDS */}
            {[
              { label: "Scholarship Name", name: "scholarshipName" },
              { label: "University Name", name: "universityName" },
              { label: "University Image URL", name: "universityImage" },
              { label: "University Country", name: "universityCountry" },
              { label: "University City", name: "universityCity" },
              {
                label: "University World Rank",
                name: "universityWorldRank",
                type: "number",
              },
            ].map((item, i) => (
              <div key={i}>
                <label className="font-semibold text-[#5a1163]">
                  {item.label}
                </label>
                <input
                  type={item.type || "text"}
                  name={item.name}
                  value={formData[item.name] || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                />
              </div>
            ))}

            {/* SECTION TITLE */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-2xl font-bold text-[#5a1163]">
                📚 Academic Information
              </h3>
              <div className="h-[3px] bg-gradient-to-r from-[#5a1163] to-[#d95022] mt-2"></div>
            </div>

            {/* SELECT FIELDS */}
            <div>
              <label className="font-semibold text-[#5a1163]">
                Subject Category
              </label>
              <select
                name="subjectCategory"
                value={formData.subjectCategory}
                onChange={handleChange}
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
                name="scholarshipCategory"
                value={formData.scholarshipCategory}
                onChange={handleChange}
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
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="select select-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
              >
                <option value="">Select Degree</option>
                <option>Diploma</option>
                <option>Bachelor</option>
                <option>Masters</option>
              </select>
            </div>

            {/* FEES */}
            {[
              { label: "Tuition Fees (Optional)", name: "tuitionFees" },
              { label: "Application Fees", name: "applicationFees" },
              { label: "Service Charge", name: "serviceCharge" },
            ].map((item, i) => (
              <div key={i}>
                <label className="font-semibold text-[#5a1163]">
                  {item.label}
                </label>
                <input
                  type="number"
                  name={item.name}
                  value={formData[item.name] || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                />
              </div>
            ))}

            {/* DATES */}
            {[
              { label: "Application Deadline", name: "applicationDeadline" },
              { label: "Posted Date", name: "scholarshipPostDate" },
            ].map((item, i) => (
              <div key={i}>
                <label className="font-semibold text-[#5a1163]">
                  {item.label}
                </label>
                <input
                  type="date"
                  name={item.name}
                  value={formData[item.name] || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-xl border-[#d9502260] focus:border-[#d95022]"
                />
              </div>
            ))}

            {/* EMAIL READONLY */}
            <div>
              <label className="font-semibold text-[#5a1163]">
                Posted User Email
              </label>
              <input
                type="email"
                name="postedUserEmail"
                value={formData.postedUserEmail}
                readOnly
                className="input input-bordered w-full rounded-xl border-[#d9502260] bg-gray-100"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 mt-8">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="btn w-full text-lg py-3 bg-gradient-to-r from-[#d95022] to-[#5a1163] text-white font-bold rounded-xl border-none shadow-lg hover:opacity-90"
              >
                Update Scholarship
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UpdateScholarship;
