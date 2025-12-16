import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const MyScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [myScholarships, setMyScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= LOAD USER SCHOLARSHIPS ==================
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/all-scholarship?email=${user.email}`)
      .then((res) => {
        setMyScholarships(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching My Scholarships:", err);
        setLoading(false);
      });
  }, [user, axiosSecure]);

  // ================= HANDLE DELETE ==================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d95022",
      cancelButtonColor: "#5a1163",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/all-scholarship/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Deleted!",
              "Your scholarship has been removed.",
              "success"
            );
            setMyScholarships((prev) => prev.filter((item) => item._id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-5 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#d95022] to-[#5a1163] bg-clip-text text-transparent"
      >
        Manage Scholarships
      </motion.h1>

      {loading ? (
        <div className="flex justify-center py-40">
          <Bars height="80" width="80" color="#d95022" />
        </div>
      ) : myScholarships.length === 0 ? (
        <p className="text-center text-gray-400 text-xl font-semibold">
          You haven't added any scholarships yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="table w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Scholarship</th>
                <th>University</th>
                <th>Country</th>
                <th>City</th>
                <th>Category</th>
                <th>Degree</th>
                <th>Deadline</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {myScholarships.map((item, index) => (
                <tr key={item._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{item.scholarshipName}</td>
                  <td>{item.universityName}</td>
                  <td>{item.universityCountry}</td>
                  <td>{item.universityCity}</td>
                  <td>
                    <span className="badge badge-primary">
                      {item.scholarshipCategory}
                    </span>
                  </td>
                  <td>{item.degree}</td>
                  <td>{item.applicationDeadline}</td>
                  <td className="flex gap-2 justify-center">
                    <Link
                      to={`/details-scholarship/${item._id}`}
                      className="btn btn-xs bg-primary text-white"
                    >
                      View
                    </Link>

                    <Link
                      to={`/dashboard/update-scholarship/${item._id}`}
                      className="btn btn-xs bg-secondary text-white"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
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

export default MyScholarships;
