import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Banner from "../Banner/Banner";

const Home = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch("/scholarships.json") // Update this with your API or local file
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a, b) => a.applicationFee - b.applicationFee) // Top lowest fee
          .slice(0, 6);
        setScholarships(sorted);
      });
  }, []);

  return (
    <div className="bg-gray-50 ">
      {/* ======================= HERO SECTION ======================= */}

      {/* <section className="relative text-center py-32 px-6 bg-gradient-to-r from-[#5a1163] to-[#d95022] text-white rounded-b-[40px] shadow-lg overflow-hidden rounded-3xl my-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold"
        >
          Find the Perfect Scholarship for You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg mt-4 max-w-2xl mx-auto"
        >
          Explore thousands of national & international scholarships to support
          your academic journey.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            to="/scholarships"
            className="btn bg-white text-[#d95022] font-bold px-8 py-3 mt-6 rounded-full shadow hover:bg-gray-100"
          >
            Search Scholarship
          </Link>
        </motion.div>
      </section> */}
      <section className="my-8">
        <Banner></Banner>
      </section>

      {/* ======================= TOP SCHOLARSHIPS ======================= */}
      <section className="max-w-7xl mx-auto py-16 px-6 md:rounded-3xl my-8 bg-secondary text-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          🎓 Top Scholarships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-[#d95022]">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.university}</p>

              <p className="mt-4 text-gray-700 font-semibold">
                Fee: ${item.applicationFee}
              </p>

              <Link to={`/scholarship/${item.id}`}>
                <button className="btn bg-[#d95022] text-white rounded-full w-full mt-5 hover:bg-[#b73c1a]">
                  View Details
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================= SUCCESS STORIES ======================= */}
      <section className="bg-primary/60 py-20 px-6 md:rounded-3xl my-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          🌟 Success Stories
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-100 rounded-xl shadow"
          >
            <p className="text-gray-700">
              “This platform helped me find the best scholarship for my Master’s
              degree in Canada!”
            </p>
            <h4 className="mt-3 font-bold text-[#d95022]">— Arif Mahmud</h4>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 bg-gray-100 rounded-xl shadow"
          >
            <p className="text-gray-700">
              “Easy to use and updated scholarship information. Really helped my
              journey!”
            </p>
            <h4 className="mt-3 font-bold text-[#d95022]">— Tasnim Jahan</h4>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="p-6 bg-gray-100 rounded-xl shadow"
          >
            <p className="text-gray-700">
              “Because of this site, I applied & got a full-funded scholarship
              in Turkey!”
            </p>
            <h4 className="mt-3 font-bold text-[#d95022]">— Rafiul Karim</h4>
          </motion.div>
        </div>
      </section>

      {/* ======================= FAQ SECTION ======================= */}
      <section className="bg-secondary/60 text-white py-20 px-6 md:rounded-3xl my-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          ❓ Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-primary/70 p-5 rounded-xl">
            <h3 className="font-bold text-lg">
              How do I apply for a scholarship?
            </h3>
            <p className="text-gray-300 mt-1">
              Click on "View Details" for your desired scholarship and follow
              the given requirements.
            </p>
          </div>

          <div className="bg-primary/70 p-5 rounded-xl">
            <h3 className="font-bold text-lg">Is the platform free to use?</h3>
            <p className="text-gray-300 mt-1">
              Yes! Searching scholarships is 100% free.
            </p>
          </div>

          <div className="bg-primary/70 p-5 rounded-xl">
            <h3 className="font-bold text-lg">Are all scholarships updated?</h3>
            <p className="text-gray-300 mt-1">
              We update scholarship information regularly so every student gets
              accurate info.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
