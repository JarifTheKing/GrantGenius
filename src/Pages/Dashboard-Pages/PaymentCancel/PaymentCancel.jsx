import { useParams, useNavigate } from "react-router";
import { XCircle, RotateCcw, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
// import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const PaymentCancel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // ================= PAYMENT HANDLER =================
  const handlePayNow = async () => {
    if (!id) {
      Swal.fire("Error", "Invalid application ID", "error");
      return;
    }

    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        applicationId: id,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("PAY NOW ERROR:", error);
      Swal.fire("Error", "Failed to initiate payment", "error");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center"
      >
        {/* ICON */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle size={42} className="text-red-500" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Your payment process was cancelled before completion.
          <br />
          <span className="font-medium text-gray-700">
            No charges were made to your account.
          </span>
        </p>

        {/* INFO BOX */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 mb-6">
          You can safely try again or return to your applications to continue
          managing your scholarship submissions.
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePayNow}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition"
          >
            <RotateCcw size={16} />
            Try Payment Again
          </button>

          <button
            onClick={() => navigate("/dashboard/my-applications")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            <LayoutDashboard size={16} />
            My Applications
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
