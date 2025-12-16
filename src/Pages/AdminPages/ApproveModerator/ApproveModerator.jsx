import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Eye } from "lucide-react";
import { Bars } from "react-loader-spinner";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ApproveModerator = () => {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMod, setSelectedMod] = useState(null);

  const axiosSecure = useAxiosSecure();

  // ================= FETCH =================
  const fetchPendingModerators = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/moderator-requests/status/pending");
      setModerators(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingModerators();
  }, []);

  // ================= APPROVE =================
  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve moderator?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/moderator-requests/approve/${id}`);
      Swal.fire("Approved!", "Moderator approved successfully", "success");
      fetchPendingModerators();
    } catch {
      Swal.fire("Error", "Failed to approve moderator", "error");
    }
  };

  // ================= REJECT =================
  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject moderator?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/moderator-requests/reject/${id}`);
      Swal.fire("Rejected!", "Moderator rejected successfully", "success");
      fetchPendingModerators();
    } catch {
      Swal.fire("Error", "Failed to reject moderator", "error");
    }
  };

  // ================= LOADER =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
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
    <div className="p-6 bg-base-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Pending Moderator Requests
      </h2>

      {moderators.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Name</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Availability</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {moderators.map((mod) => (
                <tr key={mod._id}>
                  <td className="font-semibold">{mod.name}</td>
                  <td>{mod.email}</td>
                  <td>{mod.experience}</td>
                  <td>{mod.availability}</td>

                  {/* STATUS */}
                  <td>
                    <span className="badge badge-warning badge-outline capitalize">
                      {mod.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="flex items-center justify-center gap-2">
                    {/* VIEW */}
                    <button
                      onClick={() => setSelectedMod(mod)}
                      className="btn btn-info btn-sm btn-outline"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>

                    {/* APPROVE */}
                    <button
                      onClick={() => handleApprove(mod._id)}
                      className="btn btn-success btn-sm"
                    >
                      Approve
                    </button>

                    {/* REJECT */}
                    <button
                      onClick={() => handleReject(mod._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selectedMod && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-xl mb-4">
              Moderator Request Details
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedMod.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedMod.email}
              </p>
              <p>
                <strong>Experience:</strong> {selectedMod.experience}
              </p>
              <p>
                <strong>Availability:</strong> {selectedMod.availability}
              </p>
              <p>
                <strong>Motivation:</strong> {selectedMod.motivation}
              </p>
              <p>
                <strong>NID:</strong> {selectedMod.nid}
              </p>
              <p>
                <strong>DOB:</strong> {selectedMod.dob}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="badge badge-warning badge-outline capitalize">
                  {selectedMod.status}
                </span>
              </p>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedMod(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApproveModerator;
