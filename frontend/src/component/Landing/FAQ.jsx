import { useState } from "react";

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

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
        Frequently Asked Questions
      </h2>

      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-14 text-lg">
        Everything you need to know about MovieFlix and its features.
      </p>

      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#181818] border border-gray-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left px-6 py-5 hover:bg-[#202020] transition"
            >
              <span className="text-lg md:text-xl font-semibold text-white">
                {faq.question}
              </span>

              <span className="text-red-500 text-3xl font-bold">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <div className="px-6 pb-6 text-gray-400 leading-8">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;