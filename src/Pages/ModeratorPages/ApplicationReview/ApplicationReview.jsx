import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ApplicationReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    axiosSecure.get(`/applications/moderator/${id}`).then((res) => {
      setApplication(res.data);
      setStatus(res.data.applicationStatus);
      setFeedback(res.data.feedback || "");
    });
  }, [id]);

  const handleUpdate = async () => {
    await axiosSecure.patch(`/applications/${id}`, {
      applicationStatus: status,
      feedback,
    });

    Swal.fire("Updated!", "Application updated successfully", "success");
    navigate("/dashboard/manage-applications");
  };

  if (!application) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Application Review</h2>

      <div className="card bg-base-100 shadow p-6 space-y-3">
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

      <div className="space-y-4">
        <label className="block font-semibold">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>

        <label className="block font-semibold">Feedback</label>
        <textarea
          className="textarea textarea-bordered w-full"
          rows="4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button onClick={handleUpdate} className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ApplicationReview;
