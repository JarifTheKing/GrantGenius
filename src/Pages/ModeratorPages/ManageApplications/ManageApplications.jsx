// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
// // import useAxios from "../../Hooks/useAxios";

// const ManageApplications = () => {
//   const axiosSecure = useAxiosSecure();
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     axiosSecure
//       .get("/applications")
//       .then((res) => setApplications(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "badge-success";
//       case "processing":
//         return "badge-warning";
//       case "pending":
//         return "badge-info";
//       default:
//         return "badge-ghost";
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Applications</h2>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>Student</th>
//               <th>Scholarship</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applications.map((app) => (
//               <tr key={app._id}>
//                 <td>{app.userName}</td>
//                 <td>{app.scholarshipName}</td>
//                 <td>
//                   <span
//                     className={`badge ${getStatusBadge(app.applicationStatus)}`}
//                   >
//                     {app.applicationStatus}
//                   </span>
//                 </td>
//                 <td>
//                   <Link
//                     to={`/dashboard/application-review/${app._id}`}
//                     className="btn btn-sm btn-primary"
//                   >
//                     Review
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageApplications;

import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/applications")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "badge-success";
      case "processing":
        return "badge-warning";
      case "pending":
        return "badge-info";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Student</th>
              <th>Scholarship</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                {/* ✅ FIX: fallback if userName is missing */}
                <td>{app.userName || app.userEmail || "Unknown Student"}</td>

                <td>{app.scholarshipName}</td>

                <td>
                  <span
                    className={`badge ${getStatusBadge(app.applicationStatus)}`}
                  >
                    {app.applicationStatus}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/dashboard/application-review/${app._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplications;
