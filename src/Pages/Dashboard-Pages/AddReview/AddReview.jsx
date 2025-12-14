import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const AddReview = () => {
  const { id } = useParams(); // applicationId
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [ratingPoint, setRatingPoint] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    axiosSecure.get(`/applications/${id}`).then((res) => {
      setApplication(res.data);
    });
  }, [id, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      applicationId: id,
      scholarshipId: application.scholarshipId,
      userEmail: user.email,
      ratingPoint,
      reviewComment,
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      toast.success("Review submitted successfully");
      navigate("/dashboard/my-applications");
    } catch (err) {
      toast.error(err.response?.data?.message || "Review failed");
    }
  };

  if (!application) return null;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Give Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Rating</label>
          <select
            value={ratingPoint}
            onChange={(e) => setRatingPoint(Number(e.target.value))}
            className="select select-bordered w-full"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Comment</label>
          <textarea
            className="textarea textarea-bordered w-full"
            required
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-full">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
