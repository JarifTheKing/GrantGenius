import { BadgePlus } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import Navbar from "../Components/Nav/Navbar";
import Footer from "../Components/Footer/Footer";
import { Bars } from "react-loader-spinner";

const DashboardLayout = () => {
  const [isLoading, setIsLoading] = useState(false);

  // You can trigger loader like this wherever needed:
  // setIsLoading(true);
  // setTimeout(() => setIsLoading(false), 2000);

  return (
    <div className="relative">
      {/* ===== Loader Overlay ===== */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-[9999]">
          <Bars height="80" width="80" color="#ffffff" ariaLabel="loading" />
        </div>
      )}

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>

            <div className="px-4">
              <div className="flex items-center gap-2 font-extrabold text-2xl text-secondary tracking-wide">
                <img
                  src="https://img.icons8.com/ios/50/google-scholar--v2.png"
                  width="50"
                />
                <span className="text-3xl logo">GrantGenius</span>
              </div>
            </div>
          </nav>

          {/* Main Page + Footer */}
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <Outlet />
            </div>

            <Footer />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow">
              {/* Home */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Home</span>
                </Link>
              </li>

              {/* Add Scholarship */}
              <li>
                <Link
                  to="add-scholarship"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Scholarship"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <line x1="12" x2="12" y1="8" y2="16" />
                    <line x1="8" x2="16" y1="12" y2="12" />
                  </svg>
                  <span className="is-drawer-close:hidden">
                    Add Scholarship
                  </span>
                </Link>
              </li>

              {/* My Scholarship */}
              <li>
                <Link
                  to="my-scholarship"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Scholarship"
                >
                  <img
                    width="18"
                    height="18"
                    src="https://img.icons8.com/ios-glyphs/30/scholarship.png"
                    alt="scholarship"
                  />
                  <span className="is-drawer-close:hidden">My Scholarship</span>
                </Link>
              </li>

              {/* Settings */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
