import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= CHANGE ROLE =================
  const handleChangeRole = async (id, role) => {
    const confirm = await Swal.fire({
      title: `Change role to ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/role/${id}`, { role });
      Swal.fire("Updated!", "User role updated successfully", "success");
      fetchUsers();
    } catch {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  // ================= LOADER =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Bars
          height="80"
          width="80"
          color="#d95022"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Users Management</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {/* USER IMAGE + NAME */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={
                              user.photoURL ||
                              "https://i.ibb.co/2kRzYtK/avatar.png"
                            }
                            alt="user avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{user.name || "N/A"}</p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td>{user.email}</td>

                  {/* ROLE */}
                  <td>
                    <span
                      className={`badge capitalize ${
                        user.role === "admin"
                          ? "badge-error"
                          : user.role === "moderator"
                          ? "badge-info"
                          : "badge-outline"
                      }`}
                    >
                      {user.role || "student"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="flex justify-center gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleChangeRole(user._id, "admin")}
                        className="btn btn-error btn-xs"
                      >
                        Make Admin
                      </button>
                    )}

                    {user.role !== "moderator" && (
                      <button
                        onClick={() => handleChangeRole(user._id, "moderator")}
                        className="btn btn-info btn-xs"
                      >
                        Make Moderator
                      </button>
                    )}

                    {user.role !== "student" && (
                      <button
                        onClick={() => handleChangeRole(user._id, "student")}
                        className="btn btn-outline btn-xs"
                      >
                        Make Student
                      </button>
                    )}
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

export default UsersManagement;
