import { useParams, useNavigate } from "react-router";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <XCircle size={64} className="text-red-500 mb-4" />

      <h2 className="text-2xl font-semibold mb-2">Payment Cancelled</h2>

      <p className="text-gray-600 mb-6">
        Your payment was cancelled. No money was charged.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/dashboard/my-applications`)}
          className="px-5 py-2 rounded-xl bg-primary text-white hover:bg-primary/90"
        >
          Try Again
        </button>

        <button
          onClick={() => navigate("/dashboard/my-applications")}
          className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
        >
          My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
