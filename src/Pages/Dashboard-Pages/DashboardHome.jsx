import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { motion } from "framer-motion";
import { Bars } from "react-loader-spinner";
import { FileCheck2, Clock, Loader2, BadgeCheck } from "lucide-react";

// ================= GREETING =================
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const DashboardHome = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    approved: 0,
  });

  // ================= LOAD & CALCULATE =================
  useEffect(() => {
    setTimeout(() => {
      const courses = JSON.parse(localStorage.getItem("myCourses")) || [];

      setStats({
        total: courses.length,
        pending: courses.filter((c) => c.status === "Pending").length,
        processing: courses.filter((c) => c.status === "Processing").length,
        approved: courses.filter((c) => c.status === "Approved").length,
      });

      setLoading(false);
    }, 600);
  }, []);

  // ================= LOADER =================
  if (loading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <Bars height="80" width="80" color="#d95022" />
      </div>
    );
  }

  // ================= PROGRESS =================
  const progress =
    stats.total === 0 ? 0 : Math.round((stats.approved / stats.total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 my-8 md:mt-20 md:mb-20"
    >
      {/* ================= HERO ================= */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative  overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 to-secondary/90 p-10 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">
            {getGreeting()},{" "}
            <span className="logo">{user?.displayName || "Student"}</span>
          </h2>

          <p className="mt-2 max-w-2xl text-white/90">
            Here is your Today's dashboard. <br />
            Your scholarship journey is in progress. Track your applications,
            monitor approvals, and stay motivated.
          </p>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md">
            <p className="text-sm mb-1">Overall Progress: {progress}%</p>
            <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Decorative blur */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/20 rounded-full blur-3xl" />
      </motion.div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <StatCard
          title="Total Applied"
          count={stats.total}
          subtitle="Scholarships"
          icon={<FileCheck2 />}
          color="text-indigo-500"
        />

        <StatCard
          title="Pending"
          count={stats.pending}
          subtitle="Awaiting review"
          icon={<Clock />}
          color="text-yellow-500"
        />

        <StatCard
          title="Processing"
          count={stats.processing}
          subtitle="Under review"
          icon={<Loader2 />}
          color="text-blue-500"
        />

        <StatCard
          title="Approved"
          count={stats.approved}
          subtitle="Completed"
          icon={<BadgeCheck />}
          color="text-green-500"
        />
      </div>
    </motion.div>
  );
};

// ================= STAT CARD =================
const StatCard = ({ title, count, subtitle, icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-gray-200 flex items-center justify-between"
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold mt-1"
        >
          {count}
        </motion.h2>
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
      </div>

      <div className={`p-4 rounded-2xl bg-gray-100 ${color}`}>{icon}</div>
    </motion.div>
  );
};

export default DashboardHome;
