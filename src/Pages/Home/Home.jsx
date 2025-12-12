import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLoaderData } from "react-router";
import Banner from "../Banner/Banner";
import { Bars } from "react-loader-spinner";
import useAxios from "../../Hooks/useAxios";
import img1 from "../../assets/Story/Boy-1.jpg";
import img2 from "../../assets/Story/Boy-2.jpg";
import img3 from "../../assets/Story/Girl.jpg";
import img4 from "../../assets/Story/girl-2.jpg";
import img5 from "../../assets/Story/girl-3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import Review from "./Review/Review";

const Home = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxios();
  // const reviewData = useLoaderData();

  useEffect(() => {
    axiosSecure
      .get("/all-scholarship")
      .then((res) => {
        const sorted = res.data
          .sort((a, b) => a.applicationFees - b.applicationFees)
          .slice(0, 6);

        setScholarships(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load scholarships");
        setLoading(false);
      });
  }, [axiosSecure]);

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <section className="my-8">
        <Banner />
      </section>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Bars height="80" width="80" color="#d95022" ariaLabel="loading" />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 font-bold py-10">{error}</p>
      )}

      {/* ======================= TOP SCHOLARSHIPS ======================= */}
      {!loading && !error && (
        <section className="max-w-7xl mx-auto py-16 px-6 my-8 bg-gradient-to-br from-[#5a1163] via-[#d3b6d0] to-[#d95022] rounded-3xl">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-white bg-clip-text text-transparent">
            🎓 Top Scholarships
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {scholarships.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden  hover:shadow-xl transition
                     flex flex-col h-full"
              >
                {/* Image */}
                <img
                  src={item.universityImage}
                  alt={item.scholarshipName}
                  className="w-full h-48 object-cover"
                />

                {/* Body */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.scholarshipName}
                    </h3>

                    <p className="text-gray-600 text-sm font-medium">
                      {item.universityName} — {item.universityCity},{" "}
                      {item.universityCountry}
                    </p>

                    <div className="text-gray-700 text-sm space-y-1">
                      <p>
                        <strong>Category:</strong> {item.scholarshipCategory}
                      </p>
                      <p>
                        <strong>Degree:</strong> {item.degree}
                      </p>
                      <p>
                        <strong>Fees:</strong> ${item.applicationFees}
                      </p>
                      <p>
                        <strong>Deadline:</strong> {item.applicationDeadline}
                      </p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Link to={`/details-scholarship/${item._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 mt-5 rounded-xl font-semibold text-white bg-[#d95022] hover:bg-[#b53f1b]"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ======================= SUCCESS STORIES ======================= */}

      <section className="relative py-24 px-6 my-16 bg-gradient-to-br from-[#d95022] via-[#d3b6d0] to-[#5a1163] md:rounded-3xl overflow-hidden">
        {/* Soft Background Shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#d95022]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#5a1163]/10 rounded-full blur-[120px]"></div>

        {/* Heading */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our Students{" "}
            <span className="text-transparent logo text-6xl bg-clip-text bg-gradient-to-r from-[#aa09e9] to-[#e96309]">
              Success Stories
            </span>
          </h2>
          <p className="text-gray-300 mt-3 text-lg max-w-2xl mx-auto">
            Real stories from students who achieved their dreams with the help
            of our platform.
          </p>
        </div>

        {/* Swiper Coverflow */}
        <div className="max-w-7xl mx-auto relative z-10">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            loop={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 30,
              stretch: "50%",
              depth: 200,
              modifier: 1,
              scale: 0.75,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {[
              {
                img: img1,
                text: "This platform made my Canada Master's scholarship journey so smooth. Highly trusted!",
                name: "Arif Mahmud",
              },
              {
                img: img2,
                text: "The smartest platform with updated scholarships. Helped me secure funding easily!",
                name: "Tasnim Jahan",
              },
              {
                img: img3,
                text: "Thanks to this website, I received a fully-funded scholarship in Turkey. Grateful!",
                name: "Rafiul Karim",
              },
              {
                img: img5,
                text: "Thanks to this website, I received a fully-funded scholarship in Turkey. Grateful!",
                name: "Asifa Alam",
              },
              {
                img: img4,
                text: "Thanks to this website, I received a fully-funded scholarship in Turkey. Grateful!",
                name: "Shushmita Roy",
              },
            ].map((story, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="p-7 rounded-2xl backdrop-blur-2xl bg-white/80 shadow-xl border border-gray-200"
                >
                  {/* Profile */}
                  <div className="flex items-center gap-4 mb-5">
                    <img
                      src={story.img}
                      alt={story.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#d95022]/40 shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-[#5a1163] text-lg">
                        {story.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Scholarship Recipient
                      </p>
                    </div>
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 leading-relaxed text-base">
                    {story.text}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ======================= WHY CHOOSE US ======================= */}
      <section className="py-20 px-6 my-16 bg-gradient-to-br from-[#5a1163] via-[#d3b6d0] to-[#d95022] md:rounded-3xl">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Why Choose{" "}
            <span className="text-transparent text-6xl bg-clip-text bg-gradient-to-r from-[#5a1163] to-[#d95022] logo">
              GrantGenius?
            </span>
          </motion.h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg">
            We make scholarship searching and applying easier, faster, and more
            reliable.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: "🎯",
                title: "Accurate Information",
                desc: "We provide verified and up-to-date scholarship details.",
              },
              {
                icon: "⚡",
                title: "Fast Processing",
                desc: "Get quick filtering and personalized recommendations.",
              },
              {
                icon: "📚",
                title: "All Scholarships in One Place",
                desc: "No need to search across dozens of websites.",
              },
              {
                icon: "🤝",
                title: "Student Support",
                desc: "We guide you through the entire application journey.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 
          hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== READY TO START YOUR JOURNEY =============== */}
      <section className="py-20 px-6 my-16 bg-gradient-to-br from-[#d95022] via-[#d3b6d0] to-[#5a1163] text-white md:rounded-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Ready to Start Your Journey?
          </motion.h2>

          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-10">
            Your scholarship journey begins here. Explore opportunities, apply
            confidently, and unlock your future with the right guidance.
          </p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/all-scholarships"
              className="inline-block px-10 py-3 rounded-xl text-lg font-semibold 
        bg-white text-[#d95022] shadow-xl hover:shadow-2xl hover:-translate-y-1 
        transition-all duration-300"
            >
              Explore Scholarships
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-br from-[#5a1163] via-[#d3b6d0] to-[#d95022] text-white py-20 px-6 md:rounded-3xl my-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          ❓ Frequently Asked Questions
        </h2>

        <p className="text-lg text-center text-gray-250  mb-10">
          Got questions? We've got answers.
        </p>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              q: "How do I apply for a scholarship?",
              a: "Click the 'View Details' button on any scholarship and follow the instructions.",
            },
            {
              q: "Is the platform free?",
              a: "Yes, browsing and searching scholarships is completely free.",
            },
            {
              q: "Are scholarships updated regularly?",
              a: "Yes, we frequently update information to ensure accuracy.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="collapse collapse-plus bg-base-100 border border-base-300 rounded-xl overflow-hidden shadow-md"
            >
              {/* RADIO → accordion behavior */}
              <input type="radio" name="faq-accordion" className="peer" />

              {/* Title color changes on open */}
              <div
                className="collapse-title bg-primary text-primary-content 
            peer-checked:bg-secondary peer-checked:text-secondary-content 
            text-lg font-semibold transition-colors duration-300"
              >
                {faq.q}
              </div>

              {/* Answer color changes on open */}
              <div
                className="collapse-content 
            bg-primary text-primary-content 
            peer-checked:bg-secondary peer-checked:text-secondary-content 
            text-sm leading-relaxed transition-colors duration-300"
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <Review reviewData={reviewData}></Review> */}
    </div>
  );
};

export default Home;
