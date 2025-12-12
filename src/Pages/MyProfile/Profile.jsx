import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

const Profile = () => {
  const axiosSecure = useAxios();
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
  // FIX: NO INFINITE LOADING
  // ================================
  useEffect(() => {
    if (user === undefined) return;

    if (user === null) {
      setLoading(false);
      return;
    }

    // 🛑 NEW FIX — wait until axios + user.email exist
    if (!axiosSecure) return;
    if (!user?.email) return;

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
  }, [user]); // Do NOT add axiosSecure here

  // LOADING UI
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary text-4xl"></span>
      </div>
    );

  if (!dbUser)
    return (
      <p className="text-center mt-10 text-xl text-red-500">
        No user found in database!
      </p>
    );

  // UPDATE USER
  const handleUpdate = async () => {
    try {
      // update firebase
      await updateUserProfile(name, photoURL);

      // FIX: prevent undefined user state
      await user.reload();

      // update db
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

  // DELETE USER
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
            inputLabel: "Enter your password",
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-black relative overflow-hidden rounded-3xl my-10">
      <div className="absolute w-[650px] h-[650px] bg-[#d95022]/40 rounded-full blur-[160px] -top-40 -left-40"></div>
      <div className="absolute w-[550px] h-[550px] bg-[#5a1163]/40 rounded-full blur-[160px] -bottom-40 -right-40"></div>

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_50px_-10px_rgba(255,255,255,0.25)] rounded-3xl p-10 animate-fadeIn">
        {/* <h1 className="text-center text-4xl font-extrabold text-white tracking-wide logo drop-shadow mb-6">
          My Profile
        </h1> */}

        <div className="text-center">
          <img
            src={
              photoURL ||
              "https://img.icons8.com/office/80/gender-neutral-user.png"
            }
            alt="User"
            className="w-32 h-32 rounded-full mx-auto border-4 border-[#d95022]/50 shadow-[0_0_20px_#d95022] object-cover hover:scale-110 transition-all duration-300"
          />

          <h2 className="mt-5 text-3xl font-bold text-white logo">{name}</h2>
          <p className="text-white/70 text-lg mt-2">{email}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white/10 border border-white/20 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-[#d95022]">
                Account Status
              </h3>
              <p className="text-white/80">Active</p>
            </div>

            <div className="p-5 bg-white/10 border border-white/20 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-[#d95022]">
                Joined On
              </h3>
              <p className="text-white/80">{joinDate}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          <label className="block">
            <span className="text-white/90 font-semibold">Full Name</span>
            <input
              className="input input-bordered w-full bg-white/20 text-white border-white/30 mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-white/90 font-semibold">Email</span>
            <input
              className="input input-bordered w-full bg-white/10 text-white border-white/30 mt-2"
              value={email}
              disabled
            />
          </label>

          <label className="block">
            <span className="text-white/90 font-semibold">Photo URL</span>
            <input
              className="input input-bordered w-full bg-white/20 text-white border-white/30 mt-2"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleUpdate}
              className="btn w-full text-white border-none"
              style={{ backgroundColor: "#d95022" }}
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              className="btn btn-error w-full text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
