import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Bars } from "react-loader-spinner";
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          axiosSecure.get("/admin-stats"),
          axiosSecure.get("/applications-by-category"),
        ]);

        setStats(statsRes.data);
        setChartData(chartRes.data);
      } catch (error) {
        console.error("Analytics load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [axiosSecure]);

  /* 🔄 LOADING STATE */
  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Bars
          height="80"
          width="80"
          color="#d95022"
          ariaLabel="analytics-loading"
          visible
        />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12">
        <StatCard title="Users" value={stats.users} />
        <StatCard title="Scholarships" value={stats.scholarships} />
        <StatCard title="Applications" value={stats.applications} />
        <StatCard title="Revenue" value={`$${stats.revenue}`} />
      </div>

      {/* ================= COMPOSED CHART ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-6 text-center">
          Applications by Scholarship Category
        </h3>

        {chartData.length === 0 ? (
          <p className="text-center text-gray-500">
            No application data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />

              {/* Bar → total applications */}
              <Bar dataKey="count" barSize={30} fill="#4f46e5" />

              {/* Line → trend */}
              <Line
                type="monotone"
                dataKey="count"
                stroke="#16a34a"
                strokeWidth={2}
              />

              {/* Area → distribution */}
              <Area
                type="monotone"
                dataKey="count"
                fill="#bfdbfe"
                stroke="#2563eb"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ title, value }) => (
  <div className="p-6 bg-white rounded-xl shadow text-center">
    <h4 className="text-gray-500">{title}</h4>
    <p className="text-3xl font-bold text-primary mt-2">{value}</p>
  </div>
);

export default Analytics;
