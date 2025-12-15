// import React, { useEffect, useState } from "react";
// import { Bars } from "react-loader-spinner";
// import Swal from "sweetalert2";
// import { Eye, Pencil, Trash2, CreditCard } from "lucide-react";
// // import useAxios from "../../../Hooks/useAxios";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
// import AddReview from "../AddReview/AddReview";
// import { Link } from "react-router";

// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   // ================= FETCH APPLICATIONS =================
//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchApplications = async () => {
//       try {
//         setLoading(true);
//         const res = await axiosSecure.get(
//           `/my-applications?email=${user.email}`
//         );
//         setApplications(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         console.error("LOAD APPLICATIONS ERROR:", error);
//         Swal.fire("Error", "Failed to load applications", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [user?.email, axiosSecure]);

//   // ================= PAYMENT HANDLER =================
//   const handlePayNow = async (applicationId) => {
//     try {
//       const res = await axiosSecure.post("/create-checkout-session", {
//         applicationId,
//       });

//       if (res.data?.url) {
//         window.location.href = res.data.url; // Stripe redirect
//       }
//     } catch (error) {
//       console.error("PAY NOW ERROR:", error);
//       Swal.fire("Error", "Failed to initiate payment", "error");
//     }
//   };

//   // ================= DELETE HANDLER =================
//   const handleDelete = (id, status) => {
//     if (status !== "pending") {
//       Swal.fire(
//         "Action Blocked",
//         "Only pending applications can be deleted.",
//         "warning"
//       );
//       return;
//     }

//     Swal.fire({
//       title: "Remove Application?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, remove",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosSecure.delete(`/my-applications/${id}`);
//           setApplications((prev) => prev.filter((item) => item._id !== id));
//           Swal.fire("Removed!", "Application removed successfully.", "success");
//         } catch (error) {
//           console.error("DELETE ERROR:", error);
//           Swal.fire("Error", "Failed to delete application", "error");
//         }
//       }
//     });
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="w-full h-[70vh] flex justify-center items-center">
//         <Bars height="80" width="80" color="#d95022" />
//       </div>
//     );
//   }

//   // ================= EMPTY =================
//   if (!applications.length) {
//     return (
//       <p className="text-center mt-24 text-gray-500 text-lg">
//         No scholarship applications found.
//       </p>
//     );
//   }

//   // ================= UI =================
//   return (
//     <div className="my-12 bg-white rounded-3xl p-8 shadow-xl border border-primary/20">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-primary">
//           My Applications
//           <span className="ml-2 text-sm font-medium">
//             ({applications.length})
//           </span>
//         </h2>

//         <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
//           Live Status
//         </span>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto rounded-2xl border border-secondary/20">
//         <table className="w-full text-sm text-left text-gray-700">
//           <thead className="bg-gray-50 border-b">
//             <tr className="uppercase text-xs text-gray-500">
//               <th className="px-6 py-4">University</th>
//               <th>Degree</th>
//               <th>Fees</th>
//               <th>Status</th>
//               <th>Payment</th>
//               <th>Add Review</th>
//               <th>Feedback</th>
//               <th className="text-center px-6">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {applications.map((app) => (
//               <tr
//                 key={app._id}
//                 className="border border-primary/20 hover:bg-gray-50 transition"
//               >
//                 {/* UNIVERSITY */}
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
//                       {app.universityName?.charAt(0)}
//                     </div>
//                     <div>
//                       <p className="font-semibold">{app.universityName}</p>
//                       <p className="text-xs text-gray-500">
//                         {app.universityCountry}
//                       </p>
//                     </div>
//                   </div>
//                 </td>

//                 {/* DEGREE */}
//                 <td>{app.degree || "N/A"}</td>

//                 {/* FEES */}
//                 <td className="font-medium">
//                   {app.applicationFees === 0 ? (
//                     <span className="text-emerald-600">Free</span>
//                   ) : (
//                     `$${app.applicationFees}`
//                   )}
//                 </td>

//                 {/* STATUS */}
//                 <td>
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       app.applicationStatus === "approved"
//                         ? "bg-green-100 text-green-700"
//                         : app.applicationStatus === "processing"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {app.applicationStatus}
//                   </span>
//                 </td>

//                 {/* PAYMENT */}
//                 <td>
//                   {app.applicationFees === 0 ? (
//                     <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
//                       N/A
//                     </span>
//                   ) : app.paymentStatus === "paid" ? (
//                     <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
//                       Paid
//                     </span>
//                   ) : (
//                     <button
//                       onClick={() => handlePayNow(app._id)}
//                       className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700 hover:bg-orange-200"
//                     >
//                       Pay Now
//                     </button>
//                   )}
//                 </td>

//                 {/* Review */}
//                 <td className="text-gray-400 text-xs">
//                   {app.applicationStatus === "approved" &&
//                   (app.applicationFees === 0 ||
//                     app.paymentStatus === "paid") ? (
//                     <Link
//                       to={`/scholarship/${app.scholarshipId}/review`}
//                       className="text-primary hover:underline"
//                     >
//                       Add Review
//                     </Link>
//                   ) : (
//                     <span className="text-gray-400 text-xs">
//                       {app.applicationStatus !== "approved"
//                         ? "Not approved"
//                         : "Payment required"}
//                     </span>
//                   )}
//                 </td>
//                 {/* FEEDBACK */}
//                 <td className="text-gray-400 text-xs">
//                   {app.feedback || "N/A"}
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="px-6">
//                   <div className="flex justify-center gap-3">
//                     <ActionBtn icon={<Eye size={16} />} />
//                     <ActionBtn icon={<Pencil size={16} />} />
//                     <ActionBtn
//                       icon={<Trash2 size={16} />}
//                       danger
//                       onClick={() =>
//                         handleDelete(app._id, app.applicationStatus)
//                       }
//                     />
//                     {app.applicationFees > 0 &&
//                       app.paymentStatus !== "paid" && (
//                         <ActionBtn
//                           icon={<CreditCard size={16} />}
//                           success
//                           onClick={() => handlePayNow(app._id)}
//                         />
//                       )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// /* ================= ACTION BUTTON ================= */
// const ActionBtn = ({ icon, onClick, danger, success }) => (
//   <button
//     onClick={onClick}
//     className={`p-2 rounded-xl transition hover:scale-110 ${
//       danger
//         ? "text-red-500 hover:bg-red-100"
//         : success
//         ? "text-emerald-600 hover:bg-emerald-100"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//   </button>
// );

// export default MyApplications;

// import { useEffect, useState } from "react";
// import { Bars } from "react-loader-spinner";
// import Swal from "sweetalert2";
// import { Eye, Pencil, Trash2, CreditCard, Star, X } from "lucide-react";

// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

// const MyApplications = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedApp, setSelectedApp] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showReview, setShowReview] = useState(false);

//   const [rating, setRating] = useState("");
//   const [comment, setComment] = useState("");

//   /* ================= FETCH APPLICATIONS ================= */
//   useEffect(() => {
//     if (!user?.email) return;

//     const loadApplications = async () => {
//       try {
//         setLoading(true);
//         const res = await axiosSecure.get(
//           `/my-applications?email=${user.email}`
//         );
//         setApplications(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Error", "Failed to load applications", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadApplications();
//   }, [user?.email, axiosSecure]);

//   /* ================= PAYMENT ================= */
//   const handlePay = async (id) => {
//     try {
//       const res = await axiosSecure.post("/create-checkout-session", {
//         applicationId: id,
//       });
//       window.location.href = res.data.url;
//     } catch {
//       Swal.fire("Error", "Failed to initiate payment", "error");
//     }
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (app) => {
//     if (app.applicationStatus !== "pending") {
//       return Swal.fire(
//         "Blocked",
//         "Only pending applications can be deleted",
//         "warning"
//       );
//     }

//     const confirm = await Swal.fire({
//       title: "Remove Application?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await axiosSecure.delete(`/my-applications/${app._id}`);
//       setApplications((prev) => prev.filter((item) => item._id !== app._id));
//       Swal.fire("Removed!", "Application removed successfully", "success");
//     } catch {
//       Swal.fire("Error", "Failed to delete application", "error");
//     }
//   };

//   /* ================= REVIEW ================= */
//   const submitReview = async () => {
//     if (!rating || !comment) {
//       return Swal.fire("Required", "Rating & comment required", "warning");
//     }

//     try {
//       await axiosSecure.post("/reviews", {
//         scholarshipId: selectedApp.scholarshipId,
//         rating: Number(rating),
//         comment,
//       });

//       Swal.fire("Success", "Review submitted successfully", "success");
//       setShowReview(false);
//       setRating("");
//       setComment("");
//     } catch {
//       Swal.fire("Error", "Failed to submit review", "error");
//     }
//   };

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[70vh]">
//         <Bars height="80" width="80" color="#d95022" />
//       </div>
//     );
//   }

//   /* ================= EMPTY ================= */
//   if (!applications.length) {
//     return (
//       <p className="text-center mt-24 text-gray-500 text-lg">
//         No scholarship applications found.
//       </p>
//     );
//   }

//   return (
//     <div className="my-12 bg-white rounded-3xl p-8 shadow-xl border border-primary/20">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-2xl font-bold text-primary">
//           My Applications
//           <span className="ml-2 text-sm font-medium text-gray-500">
//             ({applications.length})
//           </span>
//         </h2>

//         <span className="text-xs px-4 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
//           Live Status
//         </span>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto rounded-2xl border-2 border-b-0 border-primary/60">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-primary border-b border-primary text-xs uppercase text-white">
//             <tr>
//               <th className="px-6 py-4">University</th>
//               <th>Category</th>
//               <th>Fees</th>
//               <th>Status</th>
//               <th>Feedback</th>
//               <th className="text-center px-6">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {applications.map((app) => (
//               <tr
//                 key={app._id}
//                 className="border-b border-primary hover:bg-gray-50 transition"
//               >
//                 {/* UNIVERSITY */}
//                 <td className="px-6 py-4">
//                   <p className="font-semibold">{app.universityName}</p>
//                   <p className="text-xs text-gray-500">
//                     {app.universityCountry}
//                   </p>
//                 </td>

//                 <td>{app.category || "General"}</td>

//                 {/* FEES */}
//                 <td className="font-medium">
//                   {app.applicationFees === 0 ? (
//                     <span className="text-emerald-600">Free</span>
//                   ) : (
//                     `$${app.applicationFees}`
//                   )}
//                 </td>

//                 {/* STATUS */}
//                 <td>
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       app.applicationStatus === "approved"
//                         ? "bg-green-100 text-green-700"
//                         : app.applicationStatus === "processing"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {app.applicationStatus}
//                   </span>
//                 </td>

//                 {/* FEEDBACK */}
//                 <td className="text-xs text-gray-500">
//                   {app.feedback || "N/A"}
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="px-6">
//                   <div className="flex justify-center gap-3">
//                     <ActionBtn
//                       icon={<Eye size={16} />}
//                       onClick={() => {
//                         setSelectedApp(app);
//                         setShowDetails(true);
//                       }}
//                     />

//                     {app.applicationStatus === "pending" && (
//                       <>
//                         <ActionBtn icon={<Pencil size={16} />} />

//                         <ActionBtn
//                           icon={<Trash2 size={16} />}
//                           danger
//                           onClick={() => handleDelete(app)}
//                         />
//                       </>
//                     )}

//                     {app.applicationFees > 0 &&
//                       app.paymentStatus !== "paid" &&
//                       app.applicationStatus === "pending" && (
//                         <ActionBtn
//                           icon={<CreditCard size={16} />}
//                           success
//                           onClick={() => handlePay(app._id)}
//                         />
//                       )}

//                     {app.applicationStatus === "approved" &&
//                       (app.applicationFees === 0 ||
//                         app.paymentStatus === "paid") && (
//                         <ActionBtn
//                           icon={<Star size={16} />}
//                           success
//                           onClick={() => {
//                             setSelectedApp(app);
//                             setShowReview(true);
//                           }}
//                         />
//                       )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* DETAILS MODAL */}
//       {showDetails && selectedApp && (
//         <Modal title="Application Details" close={() => setShowDetails(false)}>
//           <pre className="text-xs bg-gray-100 p-3 rounded">
//             {JSON.stringify(selectedApp, null, 2)}
//           </pre>
//         </Modal>
//       )}

//       {/* REVIEW MODAL */}
//       {showReview && (
//         <Modal title="Add Review" close={() => setShowReview(false)}>
//           <div className="space-y-4">
//             <select
//               className="w-full border rounded p-2"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//             >
//               <option value="">Select Rating</option>
//               {[1, 2, 3, 4, 5].map((r) => (
//                 <option key={r} value={r}>
//                   {r} Star
//                 </option>
//               ))}
//             </select>

//             <textarea
//               className="w-full border rounded p-2"
//               rows="4"
//               placeholder="Write your review..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             />

//             <button
//               onClick={submitReview}
//               className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
//             >
//               Submit Review
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// /* ================= ACTION BUTTON ================= */
// const ActionBtn = ({ icon, onClick, danger, success }) => (
//   <button
//     onClick={onClick}
//     className={`p-2 rounded-xl transition hover:scale-110 ${
//       danger
//         ? "text-red-500 hover:bg-red-100"
//         : success
//         ? "text-emerald-600 hover:bg-emerald-100"
//         : "text-gray-600 hover:bg-gray-100"
//     }`}
//   >
//     {icon}
//   </button>
// );

// /* ================= MODAL ================= */
// const Modal = ({ title, children, close }) => (
//   <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//     <div className="bg-white rounded-xl w-[90%] max-w-lg p-6 relative">
//       <button
//         onClick={close}
//         className="absolute top-3 right-3 text-gray-500 hover:text-black"
//       >
//         <X size={18} />
//       </button>

//       <h3 className="text-xl font-bold mb-4">{title}</h3>
//       {children}
//     </div>
//   </div>
// );

// export default MyApplications;





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
  const submitReview = async () => {
    if (!rating || !comment) {
      return Swal.fire("Required", "Rating & comment required", "warning");
    }

    try {
      await axiosSecure.post("/reviews", {
        scholarshipId: selectedApp.scholarshipId,
        rating: Number(rating),
        comment,
      });

      Swal.fire("Success", "Review submitted successfully", "success");
      setShowReview(false);
      setRating("");
      setComment("");
    } catch {
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
                      <ActionBtn icon={<Pencil size={16} />} />
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
                    {app.applicationStatus === "completed" && (
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
      {showDetails && selectedApp && (
        <Modal title="Application Details" close={() => setShowDetails(false)}>
          <pre className="text-xs bg-gray-100 p-3 rounded">
            {JSON.stringify(selectedApp, null, 2)}
          </pre>
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
