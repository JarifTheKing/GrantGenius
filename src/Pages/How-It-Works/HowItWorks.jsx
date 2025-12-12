import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, ClipboardCheck, Send, CheckCircle2 } from "lucide-react";
import { Bars } from "react-loader-spinner";

const HowItWorks = () => {
  const [loading, setLoading] = useState(true);

  // Fake loading (2s). Replace with API loading logic.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      icon: <Lightbulb className="w-10 h-10 text-purple-500" />,
      title: "Discover Scholarships",
      desc: "Explore thousands of global scholarships tailored to your academic goals.",
    },
    {
      icon: <ClipboardCheck className="w-10 h-10 text-blue-500" />,
      title: "Check Eligibility",
      desc: "Review requirements and instantly see which opportunities match your profile.",
    },
    {
      icon: <Send className="w-10 h-10 text-orange-500" />,
      title: "Apply Easily",
      desc: "Submit your applications through our guided process with expert support.",
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-green-500" />,
      title: "Get Results",
      desc: "Track your progress and receive updates directly inside the dashboard.",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Bars
          height="80"
          width="80"
          color="#d95022"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
        >
          How It Works
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          A simple, guided process to help you find and secure the best
          scholarships.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl 
                border border-gray-100 transition-all duration-300 
                flex flex-col items-center text-center"
            >
              <div className="mb-4">{step.icon}</div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>

              <p className="text-gray-500 text-sm">{step.desc}</p>

              <span className="mt-4 px-4 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                Step {index + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
