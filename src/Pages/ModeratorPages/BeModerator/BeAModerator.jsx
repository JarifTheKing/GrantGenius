import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Bars } from "react-loader-spinner";

const BeAModerator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    about: "",
    motivation: "",
    nid: "",
    dob: "",
    experience: "",
    availability: "",
  });

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { about, motivation, nid, dob, experience, availability } = formData;

    if (!about || !motivation || !nid || !dob || !experience || !availability) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all required fields",
      });
    }

    if (!agree) {
      return Swal.fire({
        icon: "warning",
        title: "Agreement Required",
        text: "You must agree to the moderator responsibilities",
      });
    }

    setLoading(true);

    try {
      await axiosSecure.post("/moderator-request", {
        name: user?.displayName,
        email: user?.email,
        ...formData,
        roleRequested: "moderator",
        status: "pending",
        agreedToRules: true,
        requestDate: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: "Your moderator request has been submitted successfully!",
      });

      setFormData({
        about: "",
        motivation: "",
        nid: "",
        dob: "",
        experience: "",
        availability: "",
      });
      setAgree(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error?.response?.data?.message ||
          "Failed to submit moderator request",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 my-8">
      {/* Page Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <Bars height="60" width="60" color="#ea580c" />
        </div>
      )}

      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-primary mb-2">
            Become a Moderator
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Join our trusted moderation team and help ensure fairness,
            transparency, and quality for scholarship applicants.
          </p>
        </div>

        {/* Responsibilities */}
        <div className="mb-8 p-5 rounded-2xl bg-orange-50 border border-orange-200">
          <h4 className="font-semibold text-orange-700 mb-3 text-lg">
            Important Responsibilities
          </h4>
          <ul className="text-sm text-orange-700 space-y-2 list-disc list-inside">
            <li>Carefully review scholarship applications</li>
            <li>Provide honest and constructive feedback</li>
            <li>Maintain confidentiality of applicant data</li>
            <li>No favoritism, manipulation, or data misuse</li>
            <li>Violation may result in permanent role removal</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label font-semibold">Full Name</label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label font-semibold">Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label font-semibold">
              Tell us about yourself *
            </label>
            <textarea
              name="about"
              rows="3"
              className="textarea textarea-bordered w-full"
              placeholder="Education, background, personality, interests..."
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label font-semibold">Date of Birth *</label>
              <input
                type="date"
                name="dob"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label font-semibold">
                NID / Birth Certificate *
              </label>
              <input
                type="text"
                name="nid"
                className="input input-bordered w-full"
                placeholder="Used only for verification"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="label font-semibold">Relevant Experience *</label>
            <textarea
              name="experience"
              rows="3"
              className="textarea textarea-bordered w-full"
              placeholder="Moderation, education, admin, volunteering..."
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label font-semibold">Weekly Availability *</label>
            <select
              name="availability"
              className="select select-bordered w-full"
              onChange={handleChange}
            >
              <option value="">Select availability</option>
              <option value="2-4 hours">2–4 hours / week</option>
              <option value="5-10 hours">5–10 hours / week</option>
              <option value="10+ hours">10+ hours / week</option>
            </select>
          </div>

          <div>
            <label className="label font-semibold">
              Why do you want to be a moderator? *
            </label>
            <textarea
              name="motivation"
              rows="3"
              className="textarea textarea-bordered w-full"
              placeholder="Your motivation and commitment..."
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 items-start">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="checkbox checkbox-warning mt-1"
            />
            <p className="text-sm text-gray-600">
              I confirm that all information is correct and I agree to follow
              all moderator rules and ethical guidelines.
            </p>
          </div>

          <button
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg tracking-wide hover:opacity-90 transition"
          >
            Submit Moderator Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeAModerator;
