import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/reviews/my")
      .then((res) => {
        setReviews(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load your reviews", "error");
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Bars height="80" width="80" color="#d95022" />
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">
        You haven’t submitted any reviews yet.
      </p>
    );
  }

  return (
    <div className="my-12 bg-white rounded-3xl p-8 shadow-xl border border-primary/20">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        My Reviews
        <span className="ml-2 text-sm text-gray-500">({reviews.length})</span>
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-primary/60">
        <table className="w-full text-sm text-left">
          <thead className="bg-primary text-white text-xs uppercase">
            <tr>
              <th className="px-6 py-4">#</th>
              <th>University</th>
              <th>Scholarship</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr
                key={review._id}
                className="border-b border-primary/40 hover:bg-gray-50"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="font-semibold">
                  {review.universityName || "N/A"}
                </td>

                <td>{review.scholarshipName || "N/A"}</td>

                <td>
                  <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                    ⭐ {review.rating}
                  </span>
                </td>

                <td className="max-w-xs truncate" title={review.comment}>
                  {review.comment}
                </td>

                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
