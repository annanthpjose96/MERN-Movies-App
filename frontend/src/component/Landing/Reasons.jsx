const reasons = [
  {
    icon: "🎬",
    title: "Massive Movie Collection",
    description:
      "Browse thousands of trending, popular, top-rated, and upcoming movies from around the world.",
  },
  {
    icon: "🔍",
    title: "Smart Movie Search",
    description:
      "Instantly search for your favorite movies with fast, accurate, and responsive search results.",
  },
  {
    icon: "❤️",
    title: "Personal Watchlist",
    description:
      "Save your favorite movies and access them anytime from your personal watchlist.",
  },
  {
    icon: "🤖",
    title: "AI Movie Assistant",
    description:
      "Need help deciding what to watch? Chat with our AI Movie Assistant to receive personalized movie recommendations, discover hidden gems, explore similar titles, get genre suggestions, and find the perfect movie based on your mood, preferences, or favorite actors.",
  },
  {
    icon: "⭐",
    title: "Detailed Movie Information",
    description:
      "Explore ratings, genres, cast, directors, runtime, release dates, trailers, and similar movie recommendations—all in one place.",
  },
  {
    icon: "📱",
    title: "Modern & Responsive Design",
    description:
      "Experience MovieFlix seamlessly across desktop, tablet, and mobile devices with a clean Netflix-inspired interface.",
  },
];

const Reasons = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        Why Choose MovieFlix?
      </h2>

      <p className="text-gray-400 text-center text-lg max-w-3xl mx-auto mb-14">
        MovieFlix is more than just a movie discovery platform. From AI-powered
        recommendations to personalized watchlists, everything is designed to
        help you discover your next favorite movie effortlessly.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-[#181818] border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-red-600 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
          >
            <div className="text-5xl mb-6">{reason.icon}</div>

            <h3 className="text-2xl font-bold text-white mb-4">
              {reason.title}
            </h3>

            <p className="text-gray-400 leading-7">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;