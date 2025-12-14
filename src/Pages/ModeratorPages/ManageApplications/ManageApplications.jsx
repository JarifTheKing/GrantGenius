import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import useAxios from "../../../hooks/useAxios";

const ManageApplications = () => {
  const axiosSecure = useAxios();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all applications
  useEffect(() => {
    axiosSecure
      .get("/applications")
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  // Update Status
  const updateStatus = (id, status) => {
    axiosSecure.patch(`/applications/status/${id}`, { status }).then(() => {
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, applicationStatus: status } : app
        )
      );
      Swal.fire("Updated!", `Status set to ${status}`, "success");
    });
  };

  // Add Feedback
  const addFeedback = (id) => {
    Swal.fire({
      title: "Write Feedback",
      input: "textarea",
      inputPlaceholder: "Enter feedback for student...",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        axiosSecure
          .patch(`/applications/feedback/${id}`, {
            feedback: result.value,
          })
          .then(() => {
            setApplications((prev) =>
              prev.map((app) =>
                app._id === id ? { ...app, feedback: result.value } : app
              )
            );
            Swal.fire("Success", "Feedback added", "success");
          });
      }
    });
  };

  // Reject Application
  const rejectApplication = (id) => {
    Swal.fire({
      title: "Reject Application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(id, "rejected");
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Bars height="80" width="80" color="#d95022" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Applications</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>University</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>

                <td>
                  <p className="font-semibold">{app.userName}</p>
                  <p className="text-sm opacity-70">{app.userEmail}</p>
                </td>

                <td>{app.universityName}</td>

                <td>
                  <span className="badge badge-info">
                    {app.applicationStatus}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      app.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>

                <td className="max-w-xs truncate">
                  {app.feedback || "No feedback"}
                </td>

                <td className="space-x-1">
                  <button
                    onClick={() => updateStatus(app._id, "processing")}
                    className="btn btn-xs btn-warning"
                  >
                    Processing
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "completed")}
                    className="btn btn-xs btn-success"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => addFeedback(app._id)}
                    className="btn btn-xs btn-info"
                  >
                    Feedback
                  </button>

                  <button
                    onClick={() => rejectApplication(app._id)}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!applications.length && (
          <p className="text-center py-10 text-gray-500">
            No applications found
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
