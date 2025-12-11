import { NavLink } from "react-router";

const Navbar = () => {
  const navItems = (
    <>
      {/* HOME */}
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg tracking-wide transition-all duration-300 font-bold ${
              isActive
                ? "bg-primary text-white shadow-md scale-105"
                : "text-secondary hover:text-primary hover:bg-primary/10"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      {/* ALL SCHOLARSHIPS */}
      <li>
        <NavLink
          to="/scholarships"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg tracking-wide transition-all duration-300 font-bold ${
              isActive
                ? "bg-primary text-white shadow-md scale-105"
                : "text-secondary hover:text-primary hover:bg-primary/10"
            }`
          }
        >
          All Scholarships
        </NavLink>
      </li>

      {/* DASHBOARD */}
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg tracking-wide transition-all duration-300 font-bold ${
              isActive
                ? "bg-primary text-white shadow-md scale-105"
                : "text-secondary hover:text-primary hover:bg-primary/10"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full backdrop-blur-xl bg-white/70 border border-primary/20 shadow-md rounded-3xl px-4 py-2 mt-3">
      <div className="navbar max-w-7xl mx-auto">
        {/* MOBILE MENU */}
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
              className="menu menu-sm dropdown-content mt-3 w-52 p-3 shadow bg-white rounded-xl border border-primary/20 z-[100]"
            >
              {navItems}

              <li className="mt-2">
                <NavLink
                  to="/login"
                  className="btn btn-outline w-full border-secondary text-secondary"
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  className="btn w-full bg-secondary text-white hover:bg-secondary/90"
                >
                  Register
                </NavLink>
              </li>
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
          <ul className="menu menu-horizontal gap-3">{navItems}</ul>
        </div>

        {/* DESKTOP RIGHT BUTTONS */}
        <div className="navbar-end hidden lg:flex">
          <NavLink
            to="/login"
            className="btn btn-outline rounded-full font-bold px-6 border-secondary text-secondary hover:bg-primary hover:text-white"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="btn ml-2 bg-primary text-white font-bold px-6 rounded-full shadow hover:bg-secondary/90 transition-all"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
