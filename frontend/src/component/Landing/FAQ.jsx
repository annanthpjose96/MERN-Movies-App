import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "What is MovieFlix?",
    answer:
      "MovieFlix is a modern movie discovery platform that lets you explore trending, popular, top-rated, and upcoming movies with detailed information, trailers, and personalized features.",
  },
  {
    question: "Can I watch movies on MovieFlix?",
    answer:
      "No. MovieFlix does not stream movies. It helps you discover movies, watch official trailers, and explore detailed information powered by TMDB.",
  },
  {
    question: "What is the AI Movie Assistant?",
    answer:
      "The AI Movie Assistant helps you discover movies through natural conversation. You can ask for recommendations based on your mood, favorite genres, actors, directors, or similar movies, making movie discovery faster and more personalized.",
  },
  {
    question: "Do I need an account to use MovieFlix?",
    answer:
      "No. You can browse and search movies without signing in. Creating an account allows you to maintain your personal watchlist and manage your profile.",
  },
  {
    question: "How does the Watchlist work?",
    answer:
      "Simply click the heart icon on any movie to add it to your watchlist. You can access all your saved movies anytime from the My Watchlist page.",
  },
  {
    question: "Where does MovieFlix get its movie data?",
    answer:
      "MovieFlix uses The Movie Database (TMDB) API to provide accurate and up-to-date movie information, ratings, posters, trailers, cast, genres, and recommendations.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-center text-gray-400 max-w-3xl mx-auto mb-14 text-lg"
      >
        Everything you need to know about MovieFlix and its features.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-5"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.01,
            }}
            className="bg-[#181818] border border-gray-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left px-6 py-5 hover:bg-[#202020] transition-colors duration-300"
            >
              <span className="text-lg md:text-xl font-semibold text-white">
                {faq.question}
              </span>

              <motion.span
                animate={{
                  rotate: activeIndex === index ? 45 : 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="text-red-500 text-3xl font-bold"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-400 leading-8">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FAQ;