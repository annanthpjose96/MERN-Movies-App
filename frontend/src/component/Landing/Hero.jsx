import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-[88vh] overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 pt-16">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight max-w-3xl"
        >
          Unlimited movies,
          <br />
          shows, and more
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="mt-6 text-lg md:text-xl text-white font-medium"
        >
          Watch anywhere. Discover anytime.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.9,
          }}
          className="mt-5 max-w-2xl text-gray-300 text-base md:text-lg leading-relaxed"
        >
          Explore thousands of movies powered by TMDB. Search your favourites,
          discover trending titles, and build your own personal watchlist.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
          }}
          className="mt-10 flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/movies"
              className="px-10 py-4 bg-red-600 hover:bg-red-700 rounded-lg text-white text-lg font-semibold shadow-lg transition-colors duration-300"
            >
              🎬 Browse Movies
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;