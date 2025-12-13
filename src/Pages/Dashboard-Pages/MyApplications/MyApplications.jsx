import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import { Eye, Pencil, Trash2, CreditCard } from "lucide-react";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();
  const { user } = useAuth(); // ✅ AUTH USER

  // ================= FETCH APPLICATIONS =================
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);

    axiosSecure
      .get(`/my-applications?email=${user.email}`)
      .then((res) => {
        setApplications(Array.isArray(res.data) ? res.data : []);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Failed to load applications", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, axiosSecure]);

  // ================= DELETE HANDLER =================
  const handleDelete = (id, status) => {
    if (status !== "pending") {
      Swal.fire(
        "Action Blocked",
        "Only pending applications can be deleted.",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: "Remove Application?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-applications/${id}`).then(() => {
          setApplications((prev) => prev.filter((item) => item._id !== id));
          Swal.fire("Removed!", "Application removed successfully.", "success");
        });
      }
    });
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <Bars height="80" width="80" color="#d95022" />
      </div>
    );
  }

  // ================= EMPTY =================
  if (!applications.length) {
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">
        No scholarship applications found.
      </p>
    );
  }

  // ================= UI =================
  return (
    <div className="my-12 bg-white rounded-3xl p-8 shadow-xl border border-primary/20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">
          My Applications
          <span className="ml-2 text-sm font-medium">
            ({applications.length})
          </span>
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          Live Status
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-secondary/20">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 border-b">
            <tr className="uppercase text-xs text-gray-500">
              <th className="px-6 py-4">University</th>
              <th>Degree</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Feedback</th>
              <th className="text-center px-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="border border-primary/20 last:border-none hover:bg-gray-50 transition"
              >
                {/* UNIVERSITY */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {app.universityName?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{app.universityName}</p>
                      <p className="text-xs text-gray-500">
                        {app.universityCountry}
                      </p>
                    </div>
                  </div>
                </td>

                {/* DEGREE */}
                <td>{app.degree || "N/A"}</td>

                {/* FEES */}
                <td className="font-medium">
                  {app.applicationFees === 0 ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    `$${app.applicationFees}`
                  )}
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.applicationStatus === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.applicationStatus === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.applicationStatus || "pending"}
                  </span>
                </td>

                {/* PAYMENT */}
                <td>
                  {app.applicationFees === 0 ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      N/A
                    </span>
                  ) : app.paymentStatus === "paid" ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Paid
                    </span>
                  ) : (
                    <Link
                      to="/dashboard/payment"
                      state={{
                        applicationId: app._id,
                        amount: app.applicationFees,
                      }}
                      className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700 hover:bg-orange-200 transition"
                    >
                      Pay Now
                    </Link>
                  )}
                </td>

                {/* FEEDBACK */}
                <td className="text-gray-400 text-xs">
                  {app.feedback || "N/A"}
                </td>

                {/* ACTIONS */}
                <td className="px-6">
                  <div className="flex justify-center gap-3">
                    <ActionBtn icon={<Eye size={16} />} />
                    <ActionBtn icon={<Pencil size={16} />} />
                    <ActionBtn
                      icon={<Trash2 size={16} />}
                      danger
                      onClick={() =>
                        handleDelete(app._id, app.applicationStatus)
                      }
                    />
                    {app.applicationFees > 0 &&
                      app.paymentStatus !== "paid" && (
                        <ActionBtn icon={<CreditCard size={16} />} success />
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================= ACTION BUTTON ================= */
const ActionBtn = ({ icon, onClick, danger, success }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-xl transition hover:scale-110 ${
      danger
        ? "text-red-500 hover:bg-red-100"
        : success
        ? "text-emerald-600 hover:bg-emerald-100"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
  </button>
);

export default MyApplications;
