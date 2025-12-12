import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Nav/Navbar";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
      {/* Navbar */}
      <Navbar />

      {/* Main content grows to push footer down */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

export default RootLayout;
