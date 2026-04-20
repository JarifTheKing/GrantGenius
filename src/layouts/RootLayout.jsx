import React from "react";
import { Outlet } from "react-router";
import { Bars } from "react-loader-spinner";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Nav/Navbar";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
      {/* Navbar */}
      <Navbar />

      {/* Main content grows to push footer down */}
      <div className="flex-grow">
        <React.Suspense fallback={<div className="flex justify-center items-center py-20 min-h-screen"><Bars height="80" width="80" color="#d95022" ariaLabel="loading" /></div>}>
          <Outlet />
        </React.Suspense>
      </div>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

export default RootLayout;
