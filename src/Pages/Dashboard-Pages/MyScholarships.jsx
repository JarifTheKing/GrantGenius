// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { Bars } from "react-loader-spinner";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/UseAxiosSecure";

// const MyScholarships = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const [myScholarships, setMyScholarships] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= LOAD USER SCHOLARSHIPS ==================
//   useEffect(() => {
//     if (!user?.email) return;

//     axiosSecure
//       .get(`/all-scholarship?email=${user.email}`)
//       .then((res) => {
//         setMyScholarships(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching My Scholarships:", err);
//         setLoading(false);
//       });
//   }, [user, axiosSecure]);

//   // ================= HANDLE DELETE ==================
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This scholarship will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d95022",
//       cancelButtonColor: "#5a1163",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/all-scholarship/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             Swal.fire(
//               "Deleted!",
//               "Your scholarship has been removed.",
//               "success"
//             );

//             setMyScholarships((prev) => prev.filter((item) => item._id !== id));
//           }
//         });
//       }
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-5 py-12">
//       {/* Heading Animation */}
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#d95022] to-[#5a1163] bg-clip-text text-transparent drop-shadow-lg logo"
//       >
//         My Scholarships
//       </motion.h1>

//       {loading ? (
//         <div className="flex justify-center py-40">
//           <Bars height="80" width="80" color="#d95022" />
//         </div>
//       ) : myScholarships.length === 0 ? (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center text-gray-400 text-xl mt-10 font-semibold"
//         >
//           Please add scholarships. <br /> You haven't added any scholarships
//           yet.
//         </motion.p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {myScholarships.map((item, index) => (
//             <motion.div
//               key={item._id}
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ scale: 1.03 }}
//               className="backdrop-blur-xl bg-white/40 border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
//             >
//               {/* Image */}
//               <img
//                 src={item.universityImage}
//                 alt={item.universityName}
//                 className="w-full h-56 object-cover"
//               />

//               {/* Content */}
//               <div className="p-6 space-y-3">
//                 <h2 className="text-2xl font-extrabold text-gray-800">
//                   {item.scholarshipName}
//                 </h2>

//                 <p className="text-gray-600 font-medium text-lg">
//                   {item.universityName}
//                 </p>

//                 <div className="text-sm text-gray-700 space-y-1">
//                   <p>
//                     <strong>Country:</strong> {item.universityCountry}
//                   </p>
//                   <p>
//                     <strong>City:</strong> {item.universityCity}
//                   </p>
//                   <p>
//                     <strong>World Rank:</strong> {item.universityWorldRank}
//                   </p>
//                   <p>
//                     <strong>Category:</strong> {item.scholarshipCategory}
//                   </p>
//                   <p>
//                     <strong>Degree:</strong> {item.degree}
//                   </p>
//                   <p>
//                     <strong>Deadline:</strong> {item.applicationDeadline}
//                   </p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="pt-4 space-y-3">
//                   <Link
//                     to={`/details-scholarship/${item._id}`}
//                     className="block text-center py-2 rounded-xl font-semibold bg-primary text-white hover:opacity-90 hover:bg-secondary transition"
//                   >
//                     View Details
//                   </Link>

//                   <Link
//                     to={`/dashboard/update-scholarship/${item._id}`}
//                     className="block text-center py-2 rounded-xl font-semibold bg-secondary text-white hover:bg-primary transition"
//                   >
//                     Update
//                   </Link>

//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="w-full py-2 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyScholarships;

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
