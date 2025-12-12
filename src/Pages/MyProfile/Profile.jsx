import React from "react";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-black relative overflow-hidden rounded-3xl my-10">
      {/* Glow Background */}
      <div className="absolute w-[650px] h-[650px] bg-[#d95022]/40 rounded-full blur-[160px] -top-40 -left-40"></div>
      <div className="absolute w-[550px] h-[550px] bg-[#5a1163]/40 rounded-full blur-[160px] -bottom-40 -right-40"></div>

      {/* PROFILE CARD */}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_50px_-10px_rgba(255,255,255,0.25)] rounded-3xl p-10 animate-fadeIn">
        {/* HEADER */}
        <h1 className="text-center text-4xl font-extrabold text-white tracking-wide logo drop-shadow mb-6">
          Your Profile
        </h1>

        {/* USER SECTION */}
        <div className="text-center">
          <img
            src={
              user?.photoURL ||
              "https://img.icons8.com/office/80/gender-neutral-user.png"
            }
            alt="User"
            className="w-32 h-32 rounded-full mx-auto border-4 border-[#d95022]/50 shadow-[0_0_20px_#d95022] object-cover hover:scale-110 transition-all duration-300"
          />

          <h2 className="mt-5 text-3xl font-bold text-white drop-shadow-sm">
            {user?.displayName || "Unnamed User"}
          </h2>

          <p className="text-white/70 text-lg mt-2">
            {user?.email || "No Email Found"}
          </p>
        </div>

        {/* INFO GRID */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ACCOUNT STATUS */}
          <div className="p-5 bg-white/10 border border-white/20 rounded-xl shadow-lg backdrop-blur-xl hover:shadow-[0_0_20px_#d95022] transition-all duration-300">
            <h3 className="text-lg font-semibold text-[#d95022] mb-1">
              Account Status
            </h3>
            <p className="text-white/80">
              {user ? "Logged In" : "Not Logged In"}
            </p>
          </div>

          {/* ACCOUNT CREATED */}
          <div className="p-5 bg-white/10 border border-white/20 rounded-xl shadow-lg backdrop-blur-xl hover:shadow-[0_0_20px_#5a1163] transition-all duration-300">
            <h3 className="text-lg font-semibold text-[#5a1163] mb-1">
              Joined On
            </h3>
            <p className="text-white/80">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* EDIT BUTTON */}
        <div className="mt-10 text-center">
          <button className="btn w-full bg-[#d95022] text-white font-bold py-3 rounded-full shadow-lg hover:bg-[#c03e17] hover:scale-105 transition-all duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
