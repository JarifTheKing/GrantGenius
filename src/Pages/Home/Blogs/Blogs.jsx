import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bars } from "react-loader-spinner";

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setBlogs([
        {
          title: "How to Find the Best Scholarships in 2025",
          desc: "Learn how to search and apply for international scholarships efficiently.",
          img: "/blog1.jpg",
          link: "https://scholarshipamerica.org/blog/featured-scholarships-december-2025/",
        },
        {
          title: "Top Universities Offering Fully Funded Programs",
          desc: "Explore top institutions worldwide offering fully funded degrees.",
          img: "/blog2.jpg",
          link: "https://bold.org/blog/bold-vs-scholarships-com/",
        },
        {
          title: "How to Write a Winning SOP",
          desc: "A complete guide to creating a powerful Statement of Purpose.",
          img: "/blog3.jpg",
          link: "https://bold.org/blog/how-to-get-into-west-point/",
        },
        {
          title: "Undergraduate Scholarships You Shouldn’t Miss",
          desc: "A list of top bachelor-level scholarships available in 2025.",
          img: "/blog4.jpg",
          link: "https://bold.org/blog/tuition-reimbursement-jobs/",
        },
        {
          title: "Essential Documents for Scholarship Applications",
          desc: "Learn which documents are required before applying anywhere.",
          img: "/blog5.jpg",
          link: "https://bold.org/blog/top-minnesota-law-schools/",
        },
        {
          title: "How to Prepare for Scholarship Interviews",
          desc: "Interview tips and strategies to impress scholarship committees.",
          img: "/blog6.jpg",
          link: "https://bold.org/blog/fafsa-for-graduate-school/",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-32">
          <Bars
            height="80"
            width="80"
            color="#d95022"
            ariaLabel="bars-loading"
            visible={true}
          />
        </div>
      )}

      {!loading && (
        <>
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Explore Our Latest Blogs
            </h1>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Stay updated with the latest scholarship guides, admission tips,
              and study abroad insights.
            </p>
          </motion.div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 place-items-center gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all 
        duration-300 p-6 flex flex-col justify-between
        w-full max-w-3xl min-h-[180px] border border-primary/10"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{blog.desc}</p>
                </div>

                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline mt-6"
                >
                  Read More →
                </a>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Blogs;
