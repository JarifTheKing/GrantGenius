import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get(
          `/payment-history?email=${user.email}`
        );

        setPayments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("PAYMENT HISTORY ERROR:", err);
        setError("Failed to load payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [axiosSecure, user?.email]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Bars height="40" width="40" color="#d95022" />
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Payment History</h2>

      {payments.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No payment history found
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Scholarship</th>
                <th className="px-4 py-3 text-left">University</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((pay) => (
                <tr
                  key={pay._id}
                  className="border-t border-primary/20 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{pay.scholarshipName}</td>
                  <td className="px-4 py-3">{pay.universityName}</td>

                  <td className="px-4 py-3 font-medium">${pay.amount}</td>

                  {/* ✅ DATE FIXED */}
                  <td className="px-4 py-3">{formatDate(pay.paymentDate)}</td>

                  {/* ✅ TRANSACTION ID FIXED */}
                  <td className="px-4 py-3 text-xs font-mono text-gray-600">
                    {pay.transactionId ||
                      pay.paymentIntentId ||
                      pay.stripeSessionId ||
                      "—"}
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
