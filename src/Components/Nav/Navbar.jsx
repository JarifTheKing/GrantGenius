import { NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // Active Link Style (reuseable)
  const activeLink = ({ isActive }) =>
    `px-4 py-2 rounded-lg tracking-wide transition-all duration-300 font-bold ${
      isActive
        ? "bg-primary text-white shadow-md scale-105"
        : "text-secondary hover:text-primary hover:bg-primary/10"
    }`;

  return (
    <div className="w-full backdrop-blur-xl bg-white/70 border border-primary/20 shadow-md rounded-3xl px-4 py-2 mt-3">
      <div className="navbar max-w-7xl mx-auto">
        {/* MOBILE */}
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

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 p-3 shadow bg-white  rounded-xl border border-primary/20 z-[100]"
            >
              {/* HOME */}
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>

              {/* ALL SCHOLARSHIPS */}
              <li>
                <NavLink to="/scholarships" className={activeLink}>
                  All Scholarships
                </NavLink>
              </li>

              {/* DASHBOARD */}
              {user && (
                <li>
                  <NavLink to="/dashboard" className={activeLink}>
                    Dashboard
                  </NavLink>
                </li>
              )}

              {/* LOGIN & REGISTER (active now!) */}
              {!user ? (
                <>
                  <li className="mt-2">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `btn w-full font-bold border-secondary ${
                          isActive
                            ? "bg-primary text-white border-primary"
                            : "btn-outline text-secondary"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `btn w-full font-bold ${
                          isActive
                            ? "bg-primary text-white shadow-md scale-105"
                            : "bg-secondary text-white hover:bg-secondary/90"
                        }`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="mt-3">
                  <button
                    onClick={logOut}
                    className="btn w-full bg-secondary text-white hover:bg-secondary/80"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* LOGO */}
          <NavLink
            to="/"
            className="font-extrabold text-2xl text-secondary tracking-wide"
          >
            <div className="flex items-center gap-2">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/google-scholar--v2.png"
              />
              <span className="text-3xl">GrantGenius</span>
            </div>
          </NavLink>
        </div>

        {/* DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3">
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

            {user && (
              <li>
                <NavLink to="/dashboard" className={activeLink}>
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end hidden lg:flex items-center gap-3">
          {!user && (
            <>
              {/* LOGIN ACTIVE */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn font-bold px-6 rounded-full shadow transition-all  ${
                    isActive
                      ? "bg-primary text-white"
                      : "btn-outline text-secondary hover:bg-primary hover:text-white"
                  }`
                }
              >
                Login
              </NavLink>

              {/* REGISTER ACTIVE */}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `btn font-bold px-6 rounded-full shadow transition-all ${
                    isActive
                      ? "bg-primary text-white scale-105"
                      : "btn-outline text-secondary hover:bg-primary hover:text-white"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}

          {user && (
            <div className="flex items-center gap-2">
              <img
                src={
                  user?.photoURL ||
                  "https://img.icons8.com/office/40/gender-neutral-user.png"
                }
                className="w-12 h-12 rounded-full border border-primary"
              />

              <button
                onClick={logOut}
                className="btn btn-outline font-bold px-6 rounded-full text-secondary hover:bg-primary hover:text-white transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
