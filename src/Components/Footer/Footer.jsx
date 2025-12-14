import React from "react";
import { NavLink } from "react-router";
import { Facebook, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary-content rounded-t-3xl mt-20">
      <div className="max-w-7xl mx-auto px-6 py-1">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Brand */}
          <div className="space-y-4 text-center md:text-left">
            <NavLink to="/" className="inline-flex items-center gap-3">
              <img
                src="https://img.icons8.com/ios/50/google-scholar--v2.png"
                width="42"
                alt="GrantGenius"
                className="bg-white rounded-full"
              />
              <span className="text-3xl font-extrabold logo tracking-wide text-white">
                GrantGenius
              </span>
            </NavLink>

            <p className="text-sm text-primary-content/80 leading-relaxed max-w-sm">
              Empowering students and researchers with smarter scholarship
              discovery and transparent funding opportunities worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center space-y-4">
            <h3 className="font-semibold text-lg  tracking-wide">Explore</h3>

            <div className="flex flex-col gap-2 text-sm">
              <NavLink className="hover:text-primary transition" to="/">
                Home
              </NavLink>
              <NavLink
                className="hover:text-primary transition"
                to="/all-scholarships"
              >
                Scholarships
              </NavLink>
              <NavLink className="hover:text-primary transition" to="/about">
                About Us
              </NavLink>
              <NavLink className="hover:text-primary transition" to="/contact">
                Contact
              </NavLink>
            </div>
          </div>

          {/* Social */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition"
              href="https://www.linkedin.com/in/mahfuz-billah/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </a>
            <a
              className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition"
              href="https://www.youtube.com/channel/UClKVcw8FwIuhUJemQveVXcQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube size={18} />
            </a>

            <a
              className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-primary/20"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-content/70">
          <p>© {new Date().getFullYear()} GrantGenius. All rights reserved.</p>

          <div className="flex gap-6">
            <NavLink className="hover:text-primary transition" to="/privacy">
              Privacy Policy
            </NavLink>
            <NavLink className="hover:text-primary transition" to="/terms">
              Terms of Service
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
