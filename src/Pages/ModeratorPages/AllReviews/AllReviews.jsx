import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/reviews")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then(() => {
          setReviews((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Review removed.", "success");
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Bars height="80" width="80" color="#d95022" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Reviews</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>University</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>

                <td className="flex items-center gap-3">
                  <img
                    src={
                      review.userImage || "https://i.ibb.co/2d9F4Qp/avatar.png"
                    }
                    className="w-10 h-10 rounded-full"
                    alt="User"
                  />
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <p className="text-sm opacity-70">{review.userEmail}</p>
                  </div>
                </td>

                <td>{review.universityName}</td>

                <td>
                  <span className="badge badge-primary">
                    ⭐ {review.ratingPoint}
                  </span>
                </td>

                <td className="max-w-xs truncate" title={review.reviewComment}>
                  {review.reviewComment}
                </td>

                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>

                <td>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!reviews.length && (
          <p className="text-center py-10 text-gray-500">No reviews found</p>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
