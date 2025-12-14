import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Bars } from "react-loader-spinner";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile, logOut } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getJoinDate = (id) => {
    try {
      const timestamp = parseInt(id.substring(0, 8), 16);
      return new Date(timestamp * 1000).toLocaleDateString();
    } catch {
      return "Unknown";
    }
  };

  const joinDate = dbUser ? getJoinDate(dbUser._id) : "";

  // ================================
  // LOAD USER FROM DATABASE
  // ================================
  useEffect(() => {
    if (!user?.email || !axiosSecure) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await axiosSecure.get(`/users?email=${user.email}`);

        if (Array.isArray(res.data) && res.data.length > 0) {
          const foundUser = res.data[0];
          setDbUser(foundUser);
          setName(foundUser.name || user.displayName || "");
          setPhotoURL(foundUser.photoURL || user.photoURL || "");
          setEmail(foundUser.email);
        } else {
          setDbUser(null);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [user, axiosSecure]);

  // ================================
  // LOADER
  // ================================
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

  if (!dbUser) {
    return (
      <p className="text-center mt-10 text-xl text-red-500">
        No user found in database!
      </p>
    );
  }

  // ================================
  // UPDATE PROFILE
  // ================================
  const handleUpdate = async () => {
    try {
      await updateUserProfile(name, photoURL);
      await user.reload();

      await axiosSecure.put(`/users/${dbUser._id}`, {
        name,
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your information has been successfully updated.",
        confirmButtonColor: "#d95022",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Unable to update profile.",
      });
    }
  };

  // ================================
  // DELETE ACCOUNT
  // ================================
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting your account is permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { value: password } = await Swal.fire({
            title: "Confirm Password",
            input: "password",
            inputPlaceholder: "•••••••",
            showCancelButton: true,
          });

          if (!password) return;

          const credential = EmailAuthProvider.credential(user.email, password);
          await reauthenticateWithCredential(user, credential);

          await axiosSecure.delete(`/users/${dbUser._id}`);
          await deleteUser(user);

          Swal.fire({
            icon: "success",
            title: "Account Deleted",
            text: "Your account has been removed permanently.",
          });

          await logOut();
          navigate("/register");
        } catch {
          Swal.fire({
            icon: "error",
            title: "Delete Failed!",
            text: "Unable to delete your account.",
          });
        }
      }
    });
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-black relative overflow-hidden rounded-3xl my-10">
      <div className="absolute w-[650px] h-[650px] bg-[#d95022]/40 rounded-full blur-[160px] -top-40 -left-40"></div>
      <div className="absolute w-[550px] h-[550px] bg-[#5a1163]/40 rounded-full blur-[160px] -bottom-40 -right-40"></div>

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10">
        <div className="text-center">
          <img
            src={
              photoURL ||
              "https://img.icons8.com/office/80/gender-neutral-user.png"
            }
            alt="User"
            className="w-32 h-32 rounded-full mx-auto border-4 border-[#d95022]/50 object-cover"
          />

          <h2 className="mt-5 text-4xl font-bold text-white logo">{name}</h2>
          <p className="text-white/70 mt-2">{email}</p>

          {/* ROLE */}
          <div className="mt-3">
            <span
              className={`badge capitalize bg-primary/60 border-0 text-white ${
                dbUser.role === "admin"
                  ? "badge-error"
                  : dbUser.role === "moderator"
                  ? "badge-info"
                  : "badge-outline"
              }`}
            >
              {dbUser.role || "user"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="p-5 bg-white/10 rounded-xl">
              <h3 className="text-[#d95022] font-semibold">Account Status</h3>
              <p className="text-white/80">Active</p>
            </div>

            <div className="p-5 bg-white/10 rounded-xl">
              <h3 className="text-[#d95022] font-semibold">Joined On</h3>
              <p className="text-white/80">{joinDate}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          <input
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input input-bordered w-full"
            value={email}
            disabled
          />

          <input
            className="input input-bordered w-full"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleUpdate}
              className="btn text-white"
              style={{ backgroundColor: "#d95022" }}
            >
              Update
            </button>

            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
