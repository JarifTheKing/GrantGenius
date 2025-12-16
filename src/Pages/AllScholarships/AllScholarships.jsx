

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Bars } from "react-loader-spinner";

const ITEMS_PER_PAGE = 8;

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://grant-genius-server-one.vercel.app/all-scholarship"
        );

        const data = Array.isArray(res.data) ? res.data : [];
        setScholarships(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
        setScholarships([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = scholarships;

    if (searchQuery.trim()) {
      result = result.filter(
        (item) =>
          item.scholarshipName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.universityName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.degree?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCategory) {
      result = result.filter(
        (item) => item.scholarshipCategory === filterCategory
      );
    }

    if (filterSubject) {
      result = result.filter((item) => item.subjectCategory === filterSubject);
    }

    if (filterLocation) {
      result = result.filter(
        (item) =>
          item.universityCountry === filterLocation ||
          item.universityCity === filterLocation
      );
    }

    setFiltered(result);
    setCurrentPage(1); // 🔥 reset page when filter changes
  }, [
    searchQuery,
    filterCategory,
    filterSubject,
    filterLocation,
    scholarships,
  ]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ================= LOADER =================
  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Bars height="80" width="80" color="#d95022" visible />
      </div>
    );
  }

  return (
    <div className="px-5 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-10">
        All Scholarships
      </h1>

      {/* ================= FILTERS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <input
          type="text"
          placeholder="Search scholarship, university, degree..."
          className="input input-bordered w-full rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="select select-bordered w-full rounded-xl"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Funding Type</option>
          <option>Full fund</option>
          <option>Partial</option>
          <option>Self-fund</option>
        </select>

        <select
          className="select select-bordered w-full rounded-xl"
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="">Subject</option>
          <option>Engineering</option>
          <option>Computer Science</option>
          <option>Business</option>
          <option>Law</option>
        </select>

        <select
          className="select select-bordered w-full rounded-xl"
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">Country/City</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
          <option>Australia</option>
        </select>
      </div>

      {/* ================= SCHOLARSHIP CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {paginatedData.length === 0 && (
          <p className="text-center text-gray-600 col-span-4 text-lg">
            No scholarships found.
          </p>
        )}

        {paginatedData.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-primary/20 rounded-xl p-5 shadow-sm flex flex-col justify-between h-[420px]"
          >
            <div>
              <img
                src={item.universityImage}
                className="w-full h-36 object-cover rounded-lg"
                alt={item.universityName}
                loading="lazy"
              />

              <h3 className="text-lg font-semibold text-secondary mt-4 leading-tight">
                {item.scholarshipName}
              </h3>

              <p className="mt-1 text-gray-500 text-sm font-medium">
                {item.universityName}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="badge badge-primary text-xs">
                  {item.scholarshipCategory}
                </span>
                <span className="badge badge-outline text-xs">
                  {item.subjectCategory}
                </span>
                <span className="badge badge-secondary text-xs">
                  {item.universityCountry}
                </span>
              </div>

              <p className="mt-3 text-gray-700 text-sm">
                <b>Application Fees:</b>{" "}
                {item.applicationFees === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `$${item.applicationFees}`
                )}
              </p>
            </div>

            <Link to={`/details-scholarship/${item._id}`} className="mt-4">
              <button className="btn bg-primary text-white w-full rounded-full">
                View Details
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ================= PAGINATION UI ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`btn btn-sm ${
                currentPage === num + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setCurrentPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
