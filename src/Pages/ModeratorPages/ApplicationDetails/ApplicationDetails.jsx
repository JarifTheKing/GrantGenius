import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Bars } from "react-loader-spinner";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ApplicationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const res = await axiosSecure.get(`/applications/moderator/${id}`);
        setApplication(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Bars height="50" width="50" color="#d95022" />
      </div>
    );
  }

  if (!application) {
    return <p className="text-center mt-20">Application not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Application Details
      </h2>

      <div className="space-y-4 text-sm">
        <Detail label="University" value={application.universityName} />
        <Detail label="Country" value={application.universityCountry} />
        <Detail label="Degree" value={application.degree} />
        <Detail label="Scholarship" value={application.scholarshipName} />
        <Detail label="Fees" value={`$${application.applicationFees}`} />
        <Detail label="Status" value={application.applicationStatus} badge />
        <Detail label="Payment" value={application.paymentStatus} badge />
        <Detail label="Feedback" value={application.feedback || "N/A"} />
      </div>
    </div>
  );
};

const Detail = ({ label, value, badge }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-600">{label}</span>
    {badge ? (
      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
        {value}
      </span>
    ) : (
      <span className="text-gray-800">{value}</span>
    )}
  </div>
);

export default ApplicationDetails;
