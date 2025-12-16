import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import { Eye, Pencil, Trash2, CreditCard, Star, X } from "lucide-react";

import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    subject: "",
    address: "",
  });

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  /* ================= FETCH APPLICATIONS ================= */
  useEffect(() => {
    if (!user?.email) return;

    const loadApplications = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(
          `/my-applications?email=${user.email}`
        );
        setApplications(Array.isArray(res.data) ? res.data : []);
      } catch {
        Swal.fire("Error", "Failed to load applications", "error");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [user?.email, axiosSecure]);

  /* ================= PAYMENT ================= */
  const handlePay = async (id) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        applicationId: id,
      });
      window.location.href = res.data.url;
    } catch {
      Swal.fire("Error", "Failed to initiate payment", "error");
    }
  };

  const handleUpdateApplication = async () => {
    try {
      await axiosSecure.patch(`/my-applications/${selectedApp._id}`, {
        category: editData.subject,
        universityAddress: editData.address,
      });

      Swal.fire("Updated!", "Application updated successfully", "success");

      // update UI instantly
      setApplications((prev) =>
        prev.map((a) => (a._id === selectedApp._id ? { ...a, ...editData } : a))
      );

      setShowEdit(false);
    } catch {
      Swal.fire("Error", "Failed to update application", "error");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove Application?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/my-applications/${id}`);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      Swal.fire("Removed!", "Application removed successfully", "success");
    } catch {
      Swal.fire("Error", "Failed to delete application", "error");
    }
  };

  /* ================= REVIEW ================= */
  // const submitReview = async () => {
  //   if (!rating || !comment) {
  //     return Swal.fire("Required", "Rating & comment required", "warning");
  //   }

  //   try {
  //     await axiosSecure.post("/reviews", {
  //       scholarshipId: selectedApp.scholarshipId,
  //       rating: Number(rating),
  //       comment,
  //     });

  //     Swal.fire("Success", "Review submitted successfully", "success");
  //     setShowReview(false);
  //     setRating("");
  //     setComment("");
  //   } catch {
  //     Swal.fire("Error", "Failed to submit review", "error");
  //   }
  // };
  const submitReview = async () => {
    if (!rating || !comment) {
      return Swal.fire("Required", "Rating & comment required", "warning");
    }

    try {
      await axiosSecure.post("/reviews", {
        applicationId: selectedApp._id,
        scholarshipId: selectedApp.scholarshipId,
        rating: Number(rating),
        comment,
      });

      Swal.fire("Success", "Review submitted successfully", "success");
      setShowReview(false);
      setRating("");
      setComment("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Bars height="80" width="80" color="#d95022" />
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (!applications.length) {
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">
        No scholarship applications found.
      </p>
    );
  }

  return (
    <div className="my-12 bg-white rounded-3xl p-8 shadow-xl border border-primary/20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary">
          My Applications
          <span className="ml-2 text-sm text-gray-500">
            ({applications.length})
          </span>
        </h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-primary/60">
        <table className="w-full text-sm text-left">
          <thead className="bg-primary text-white text-xs uppercase">
            <tr>
              <th className="px-6 py-4">University Name</th>
              <th>University Address</th>
              <th>Subject Category</th>
              <th>Application Fees</th>
              <th>Application Status</th>
              <th>Feedback</th>
              <th className="text-center px-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="border-b border-primary/40 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-semibold">
                  {app.universityName}
                </td>

                <td>{app.universityAddress || app.universityCountry}</td>

                <td>{app.category || "General"}</td>

                <td>
                  {app.applicationFees === 0 ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    `$${app.applicationFees}`
                  )}
                </td>

                <td>
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                    {app.applicationStatus}
                  </span>
                </td>

                <td className="text-xs text-gray-500">
                  {app.feedback || "N/A"}
                </td>

                {/* ACTIONS */}
                <td className="px-6">
                  <div className="flex justify-center gap-3">
                    {/* DETAILS */}
                    <ActionBtn
                      icon={<Eye size={16} />}
                      onClick={() => {
                        setSelectedApp(app);
                        setShowDetails(true);
                      }}
                    />

                    {/* EDIT */}
                    {app.applicationStatus === "pending" && (
                      <ActionBtn
                        icon={<Pencil size={16} />}
                        onClick={() => {
                          setSelectedApp(app);
                          setEditData({
                            subject: app.category || "",
                            address: app.universityAddress || "",
                          });
                          setShowEdit(true);
                        }}
                      />
                    )}

                    {/* PAY */}
                    {app.applicationStatus === "pending" &&
                      app.paymentStatus === "unpaid" && (
                        <ActionBtn
                          icon={<CreditCard size={16} />}
                          success
                          onClick={() => handlePay(app._id)}
                        />
                      )}

                    {/* DELETE */}
                    {app.applicationStatus === "pending" && (
                      <ActionBtn
                        icon={<Trash2 size={16} />}
                        danger
                        onClick={() => handleDelete(app._id)}
                      />
                    )}

                    {/* ADD REVIEW */}
                    {app.applicationStatus === "approved" && !app.reviewed && (
                      <ActionBtn
                        icon={<Star size={16} />}
                        success
                        onClick={() => {
                          setSelectedApp(app);
                          setShowReview(true);
                        }}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      {/* {showDetails && selectedApp && (
        <Modal title="Application Details" close={() => setShowDetails(false)}>
          <pre className="text-xs bg-gray-100 p-3 rounded">
            {JSON.stringify(selectedApp, null, 2)}
          </pre>
        </Modal>
      )} */}
      {showDetails && selectedApp && (
        <Modal title="Application Details" close={() => setShowDetails(false)}>
          <div className="space-y-4 text-sm">
            {/* STUDENT INFO */}
            <div className="border border-primary/20 shadow-md rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">
                Student Information
              </h4>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {selectedApp.userName || "N/A"}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedApp.userEmail}
              </p>
            </div>

            {/* SCHOLARSHIP INFO */}
            <div className="border border-primary/20 shadow-md rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">
                Scholarship Information
              </h4>
              <p>
                <span className="font-medium">University:</span>{" "}
                {selectedApp.universityName}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {selectedApp.universityAddress || selectedApp.universityCountry}
              </p>
              <p>
                <span className="font-medium">Subject Category:</span>{" "}
                {selectedApp.category || "General"}
              </p>
            </div>

            {/* APPLICATION INFO */}
            <div className="border border-primary/20 shadow-md rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">
                Application Status
              </h4>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="capitalize">
                  {selectedApp.applicationStatus}
                </span>
              </p>
              <p>
                <span className="font-medium">Application Fee:</span>{" "}
                {selectedApp.applicationFees === 0
                  ? "Free"
                  : `$${selectedApp.applicationFees}`}
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                {selectedApp.paymentStatus || "N/A"}
              </p>
            </div>

            {/* FEEDBACK */}
            <div className="border border-primary/20 shadow-md rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">Feedback</h4>
              <p className="text-gray-600">
                {selectedApp.feedback || "No feedback provided yet."}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* REVIEW MODAL */}
      {showReview && (
        <Modal title="Add Review" close={() => setShowReview(false)}>
          <div className="space-y-4">
            <select
              className="w-full border rounded p-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star
                </option>
              ))}
            </select>

            <textarea
              className="w-full border rounded p-2"
              rows="4"
              placeholder="Write your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={submitReview}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Submit Review
            </button>
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {showEdit && selectedApp && (
        <Modal title="Edit Application" close={() => setShowEdit(false)}>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Subject Category"
              value={editData.subject}
              onChange={(e) =>
                setEditData({ ...editData, subject: e.target.value })
              }
            />

            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="University Address"
              value={editData.address}
              onChange={(e) =>
                setEditData({ ...editData, address: e.target.value })
              }
            />

            <button
              onClick={handleUpdateApplication}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

/* ================= ACTION BUTTON ================= */
const ActionBtn = ({ icon, onClick, danger, success }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-xl hover:scale-110 transition ${
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

/* ================= MODAL ================= */
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

export default MyApplications;
