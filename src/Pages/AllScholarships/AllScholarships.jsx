import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";

const AllScholarships = () => {
  const loadedData = useLoaderData();
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  // Load data dynamically
  useEffect(() => {
    setScholarships(loadedData);
    setFiltered(loadedData);
  }, [loadedData]);

  // Filters
  useEffect(() => {
    let result = scholarships;

    if (searchQuery.trim()) {
      result = result.filter(
        (item) =>
          item.scholarshipName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.universityName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.degree.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCategory)
      result = result.filter(
        (item) => item.scholarshipCategory === filterCategory
      );

    if (filterSubject)
      result = result.filter((item) => item.subjectCategory === filterSubject);

    if (filterLocation) {
      result = result.filter(
        (item) =>
          item.universityCountry === filterLocation ||
          item.universityCity === filterLocation
      );
    }

    setFiltered(result);
  }, [
    searchQuery,
    filterCategory,
    filterSubject,
    filterLocation,
    scholarships,
  ]);

  return (
    <div className="  py-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-10">
        All Scholarships
      </h1>

      {/* Search & Filters */}
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
          <option value="">Filter by Funding</option>
          <option>Full fund</option>
          <option>Partial</option>
          <option>Self-fund</option>
        </select>

        <select
          className="select select-bordered w-full rounded-xl"
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="">Filter by Subject</option>
          <option>Computer Science</option>
          <option>Engineering</option>
          <option>Business</option>
          <option>Law</option>
        </select>

        <select
          className="select select-bordered w-full rounded-xl"
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">Filter by Country/City</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
          <option>Australia</option>
        </select>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {filtered.length === 0 && (
          <p className="text-center text-gray-600 col-span-4 text-lg">
            No scholarships found.
          </p>
        )}

        {filtered.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-primary/20 rounded-xl p-5 shadow-sm flex flex-col justify-between h-[420px]"
          >
            <div>
              {/* Image */}
              <img
                src={item.universityImage}
                className="w-full h-36 object-cover rounded-lg"
                alt={item.universityName}
              />

              {/* Text */}
              <h3 className="text-lg font-semibold text-secondary mt-4 leading-tight">
                {item.scholarshipName}
              </h3>

              <p className="mt-1 text-gray-500 text-sm font-medium leading-tight">
                {item.universityName}
              </p>

              {/* Tags */}
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

            {/* Button - ALWAYS AT BOTTOM */}
            <Link
              to={`/details-scholarship/${item.id}`}
              className="mt-4 w-full"
            >
              <button className="btn bg-primary text-white w-full rounded-full">
                View Details
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
