import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/admin-stats").then((res) => {
      setStats(res.data);
    });
  }, [axiosSecure]);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4  gap-6 my-12">
      <StatCard title="Users" value={stats.users} />
      <StatCard title="Scholarships" value={stats.scholarships} />
      <StatCard title="Applications" value={stats.applications} />
      <StatCard title="Revenue" value={`$${stats.revenue}`} />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="p-6 bg-white rounded-xl shadow">
    <h4 className="text-gray-500">{title}</h4>
    <p className="text-3xl font-bold text-primary">{value}</p>
  </div>
);

export default Analytics;
