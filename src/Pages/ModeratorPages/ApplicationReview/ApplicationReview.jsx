import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import { Bars } from "react-loader-spinner";

const ApplicationReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");

  // 🔹 LOADER STATE
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/applications/moderator/${id}`).then((res) => {
      setApplication(res.data);
      setStatus(res.data.applicationStatus);
      setFeedback(res.data.feedback || "");
      setIsLoading(false);
    });
  }, [id, axiosSecure]);

  const handleUpdate = async () => {
    await axiosSecure.patch(`/applications/${id}`, {
      applicationStatus: status,
      feedback,
    });

    Swal.fire("Updated!", "Application updated successfully", "success");
    navigate("/dashboard/manage-applications");
  };

  const handleReject = async () => {
    const confirm = await Swal.fire({
      title: "Reject Application?",
      text: "This will permanently reject the application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/applications/${id}`, {
      applicationStatus: "rejected",
      feedback,
    });

    Swal.fire("Rejected!", "Application rejected", "success");
    navigate("/dashboard/manage-applications");
  };

  /* ================= LOADER ================= */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
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
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Application Review</h2>
      </div>

      {/* ================= INFO CARD ================= */}
      <div className="card bg-base-100 shadow-md rounded-3xl border border-primary/20">
        <div className="card-body grid md:grid-cols-2 gap-4 text-sm">
          <p>
            <b>Student:</b> {application.userName}
          </p>
          <p>
            <b>Email:</b> {application.userEmail}
          </p>
          <p>
            <b>Scholarship:</b> {application.scholarshipName}
          </p>
          <p>
            <b>University:</b> {application.universityName}
          </p>
        </div>
      </div>

      {/* ================= ACTION PANEL ================= */}
      <div className="card bg-base-100 shadow-md rounded-3xl border border-primary/20">
        <div className="card-body space-y-5">
          <div>
            <label className="block font-semibold mb-1">
              Application Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered  w-full"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Feedback</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write moderator feedback..."
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={handleReject}
              className="btn btn-error btn-outline"
            >
              Cancel
            </button>
            <button onClick={handleUpdate} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ title, children, close }) => (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl w-[90%] max-w-lg p-6 relative">
      <button onClick={close} className="absolute top-3 right-3 text-gray-500">
        <X size={18} />
      </button>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

export default ApplicationReview;
