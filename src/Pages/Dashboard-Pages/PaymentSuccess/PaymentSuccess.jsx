import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
// import useAxios from "../../../Hooks/useAxios";

const PaymentSuccess = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.patch(`/payment-success/${id}`).then(() => {
      navigate("/dashboard/payment-history");
    });
  }, [id, axiosSecure, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center text-green-600 text-lg">
      Payment successful! Redirecting...
    </div>
  );
};

export default PaymentSuccess;
