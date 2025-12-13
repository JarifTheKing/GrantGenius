import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

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
  }, [axiosSecure, user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Bars height="40" width="40" color="#d95022" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

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
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr
                  key={pay._id}
                  className="border-t border-primary/20 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{pay.scholarshipName}</td>
                  <td className="px-4 py-3">{pay.universityName}</td>
                  <td className="px-4 py-3 font-medium">
                    $ {pay.applicationFees}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(pay.applicationDate).toLocaleDateString()}
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
