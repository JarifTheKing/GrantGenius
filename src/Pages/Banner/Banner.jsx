import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { Bars } from "react-loader-spinner";

import bannerImg1 from "../../assets/New-Banner/img-1.jpg";
import bannerImg2 from "../../assets/New-Banner/img-2.jpg";
import bannerImg3 from "../../assets/New-Banner/img-3.jpg";

const Banner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const handleImageLoad = () => {
    setLoadedCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) setIsLoading(false); // All 3 images loaded
      return newCount;
    });
  };

  return (
    <div className="relative md:rounded-3xl overflow-hidden shadow-lg">
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <Bars height="80" width="80" color="#ffffff" ariaLabel="loading" />
        </div>
      )}

      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={4000}
        swipeable={true}
      >
        {/* Slide 1 */}
        <div className="relative">
          <img
            src={bannerImg1}
            alt="slide-1"
            onLoad={handleImageLoad}
            className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover"
          />
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center px-6 md:px-16 text-white">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-xl text-center"
            >
              Find the Best Scholarships
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.9 }}
              className="mt-3 text-sm md:text-lg max-w-xl opacity-90 text-center"
            >
              Explore thousands of local & international scholarship
              opportunities.
            </motion.p>
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-md"
            >
              Search Scholarship
            </motion.button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img
            src={bannerImg2}
            alt="slide-2"
            onLoad={handleImageLoad}
            className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover"
          />
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center px-6 md:px-16 text-white">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-xl text-center"
            >
              Start Your Academic Journey
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.9 }}
              className="mt-3 text-sm md:text-lg max-w-xl opacity-90 text-center"
            >
              Get access to top universities with professional guidance.
            </motion.p>
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-md"
            >
              Search Scholarship
            </motion.button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img
            src={bannerImg3}
            alt="slide-3"
            onLoad={handleImageLoad}
            className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover"
          />
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center px-6 md:px-16 text-white">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-xl text-center"
            >
              Your Future Starts Here
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.9 }}
              className="mt-3 text-sm md:text-lg max-w-xl opacity-90 text-center"
            >
              Discover scholarships that match your goals.
            </motion.p>
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-md"
            >
              Search Scholarship
            </motion.button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
