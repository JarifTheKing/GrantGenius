import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Globe2, Users, Award } from "lucide-react";
import { Bars } from "react-loader-spinner";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ================= LOADER ===================
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Bars
          height="80"
          width="80"
          color="#d95022"
          ariaLabel="bars-loading"
          visible={true}
        />
        <p className="mt-4 text-lg font-medium text-gray-700">
          Loading About Page...
        </p>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 md:px-10 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* ================= HERO SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
          About <span className="text-primary logo">GrantGenius</span>
        </h1>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Your trusted platform for discovering global scholarships, academic
          opportunities, and reliable funding — redesigned for the next
          generation of learners.
        </p>
      </motion.div>

      {/* ================= MISSION SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="bg-white shadow-xl hover:shadow-2xl rounded-3xl p-10 md:p-14 border border-gray-100 transition-all duration-300"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          ScholarStream was created with a single purpose — to simplify the
          overwhelming process of finding global scholarships. Every student
          deserves transparent, fast, and reliable access to international
          opportunities. Through GrantGenius, we connect ambitious learners with
          world-class universities, curated funding programs, and a clean,
          intuitive platform designed for their success.
        </p>
      </motion.div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-20">
        {[
          {
            icon: GraduationCap,
            title: "500+ Scholarships",
            desc: "Verified and updated academic opportunities.",
          },
          {
            icon: Globe2,
            title: "30+ Countries",
            desc: "Scholarships from top international universities.",
          },
          {
            icon: Users,
            title: "10,000+ Students",
            desc: "Guided to study abroad with trusted resources.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white p-10 rounded-3xl text-center shadow-xl border border-gray-100 hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
          >
            <item.icon className="w-14 h-14 mx-auto text-primary" />
            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-3 text-lg">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ================= TRUST SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-xl hover:shadow-2xl rounded-3xl p-10 md:p-14 border border-gray-100 transition-all duration-300"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
          Why Students Trust Us
        </h2>

        <ul className="space-y-5 text-lg text-gray-700">
          {[
            "Accurate and verified scholarship information",
            "Modern UI with intelligent search and filtering",
            "Fast, secure, and student-focused experience",
            "Dedicated support and real student reviews",
          ].map((text, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-3 items-start"
            >
              <Award className="text-primary w-6 h-6 flex-shrink-0" />
              <span>{text}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default About;
