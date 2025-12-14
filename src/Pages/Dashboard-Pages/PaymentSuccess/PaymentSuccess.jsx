// import { useParams, useNavigate } from "react-router";
// import { useEffect } from "react";
// import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
// import toast from "react-hot-toast";

// const PaymentSuccess = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const confirmPayment = async () => {
//       try {
//         const res = await axiosSecure.patch(`/payment-success/${id}`);

//         if (res.data?.success) {
//           toast.success("Payment successful! Redirecting...");
//           navigate("/dashboard/payment-history");
//         }
//       } catch (error) {
//         console.error("PAYMENT CONFIRM ERROR:", error);
//         toast.error("Payment verification failed!");
//       }
//     };

//     confirmPayment();
//   }, [id, axiosSecure, navigate]);

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center text-green-600 text-lg">
//       Processing payment...
//     </div>
//   );
// };

// export default PaymentSuccess;

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const { id } = useParams(); // applicationId
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        await axiosSecure.patch(`/payment-success/${id}`);
        toast.success("Payment successful!");
        navigate("/dashboard/payment-history");
      } catch (error) {
        console.error(error);
        toast.error("Payment confirmation failed");
      }
    };

    if (user?.email && id) {
      confirmPayment();
    }
  }, [id, user, axiosSecure, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <h2 className="text-xl font-semibold">Confirming payment...</h2>
    </div>
  );
};

export default PaymentSuccess;
