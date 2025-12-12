import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);

  // Fake loading for 1.5 sec
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#d95022",
    });

    e.target.reset(); // Reset the form after success
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-40">
          <Bars
            height="80"
            width="80"
            color="#d95022"
            ariaLabel="bars-loading"
            visible={true}
          />
        </div>
      )}

      {/* PAGE CONTENT */}
      {!loading && (
        <>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Have questions? We’re here to help! Reach out to us anytime.
            </p>
          </motion.div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-100 shadow-md rounded-xl p-6 text-center"
            >
              <Mail className="w-10 h-10 mx-auto text-primary mb-3" />
              <h3 className="font-bold text-lg">Email Us</h3>
              <p className="text-gray-600">support@scholarstream.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-100 shadow-md rounded-xl p-6 text-center"
            >
              <Phone className="w-10 h-10 mx-auto text-primary mb-3" />
              <h3 className="font-bold text-lg">Call Us</h3>
              <p className="text-gray-600">+880 1234-567890</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-100 shadow-md rounded-xl p-6 text-center  "
            >
              <MapPin className="w-10 h-10 mx-auto text-primary mb-3" />
              <h3 className="font-bold text-lg">Our Location</h3>
              <p className="text-gray-600">Dhaka, Bangladesh</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 shadow-xl rounded-3xl p-8 max-w-3xl mx-auto  "
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Send Us a Message
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="font-medium">Your Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-primary/20 rounded-lg focus:ring focus:ring-primary/40 outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Your Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-primary/20 rounded-lg focus:ring focus:ring-primary/40 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Message</label>
                <textarea
                  className="w-full p-3 border border-primary/20 rounded-lg focus:ring focus:ring-primary/40 outline-none"
                  rows="4"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Google Map */}
          <div className="mt-16">
            <iframe
              title="Google Map"
              className="w-full h-64 rounded-xl shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.743776138449!2d90.39122152608475!3d23.752702688769836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf53d94da7b7%3A0x6ff2b3e7b76b0df!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactUs;
