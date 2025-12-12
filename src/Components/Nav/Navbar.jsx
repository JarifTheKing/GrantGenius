import { NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import lockImg from "../../assets/log-lock.jpeg";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // 🔥 FIX: always reload user so updated photoURL shows instantly
  useEffect(() => {
    if (user) {
      user.reload();
    }
  }, [user]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Just confirming—ready to step out of your account safely?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            toast.success("Logout successful!");
            Swal.fire({
              title: "Logged out!",
              text: "You have been logged out.",
              icon: "success",
            });
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  const activeLink = ({ isActive }) =>
    `px-4 py-2 rounded-lg tracking-wide transition-all duration-300 font-bold ${
      isActive
        ? "bg-primary text-white shadow-md scale-105"
        : "text-secondary hover:text-primary hover:bg-primary/10"
    }`;

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/70 border border-primary/20 shadow-md rounded-3xl px-4 py-0 mt-3">
      <div className="navbar max-w-7xl mx-auto">
        {/* LEFT — LOGO */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Mobile Drop Down */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 p-3 shadow bg-white rounded-xl border border-primary/20 z-[100]"
            >
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/scholarships" className={activeLink}>
                  All Scholarships
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={activeLink}>
                  About Us
                </NavLink>
              </li>

              {/* {user && (
                <li>
                  <details>
                    <summary className="flex items-center gap-2 cursor-pointer">
                      <img
                        src={
                          user?.photoURL ||
                          "https://img.icons8.com/office/40/gender-neutral-user.png"
                        }
                        className="w-10 h-10 rounded-full border border-primary"
                      />
                      Profile
                    </summary>

                    <ul className="p-2 mt-2 bg-white rounded-xl border border-primary/20 shadow">
                      <li>
                        <NavLink to="/dashboard" className={activeLink}>
                          Dashboard
                        </NavLink>
                      </li>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="btn w-full bg-secondary text-white hover:bg-secondary/80"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </details>
                </li>
              )} */}
            </ul>
          </div>

          <NavLink
            to="/"
            className="font-extrabold text-2xl text-secondary tracking-wide"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://img.icons8.com/ios/50/google-scholar--v2.png"
                width="50"
              />
              <span className="text-3xl logo">GrantGenius</span>
            </div>
          </NavLink>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3">
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-scholarships" className={activeLink}>
                All Scholarships
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={activeLink}>
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-3">
          {/* ⭐ MOBILE GUEST ⭐ */}
          {!user && (
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} className="cursor-pointer">
                <img
                  src={lockImg}
                  className="w-12 h-12 rounded-full border border-blue-300"
                />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 mt-3 shadow bg-white rounded-xl border border-primary/20 w-48 z-[200]"
              >
                <li>
                  <NavLink
                    to="/login"
                    className="btn btn-outline w-full text-secondary font-bold"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="btn bg-secondary w-full text-white font-bold hover:bg-secondary/80"
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          {/* ⭐ DESKTOP GUEST ⭐ */}
          {!user && (
            <div className="hidden lg:flex gap-3">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn font-bold px-6 rounded-full shadow transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "btn-outline text-secondary hover:text-primary hover:bg-primary/10"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `btn font-bold px-6 rounded-full shadow transition-all ${
                    isActive
                      ? "bg-primary text-white scale-105"
                      : "btn-outline text-secondary hover:text-primary hover:bg-primary/10"
                  }`
                }
              >
                Register
              </NavLink>
            </div>
          )}

          {/* ⭐ LOGGED-IN USER ⭐ */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer">
                <img
                  src={
                    user?.photoURL ||
                    "https://img.icons8.com/office/40/gender-neutral-user.png"
                  }
                  className="w-14 h-14 rounded-full border border-blue-300"
                />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 mt-3 shadow bg-white rounded-xl border border-primary/20 w-52 gap-2 z-[200]"
              >
                {/* DASHBOARD */}
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `btn w-full font-bold px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "btn-outline text-secondary hover:text-primary hover:bg-primary/10"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>

                {/* PROFILE */}
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `btn w-full font-bold px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "btn-outline text-secondary hover:text-primary hover:bg-primary/10"
                      }`
                    }
                  >
                    My Profile
                  </NavLink>
                </li>

                {/* LOGOUT */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn w-full text-secondary btn-outline hover:bg-primary hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
