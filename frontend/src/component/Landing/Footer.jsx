import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        {/* Top */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <div>
            <motion.h2
              whileHover={{ scale: 1.05 }}
              className="text-red-600 text-4xl font-extrabold"
            >
              MovieFlix
            </motion.h2>

            <p className="text-gray-400 mt-4 leading-7">
              A Netflix-inspired movie streaming platform built using React,
              Redux Toolkit, Node.js, Express, MongoDB and TMDB API.
            </p>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
              Browse
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              {[
                { name: "Home", path: "/" },
                { name: "Trending", path: "/" },
                { name: "Popular", path: "/" },
                { name: "Top Rated", path: "/" },
                { name: "Upcoming", path: "/" },
              ].map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.path}
                    className="hover:text-red-500 transition"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
              Account
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/watchlist"
                  className="hover:text-red-500 transition"
                >
                  Watchlist
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/login"
                  className="hover:text-red-500 transition"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Creator */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <h3 className="text-white text-xl font-semibold">
            Designed & Developed by Annanth P Jose
          </h3>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="https://github.com/annanthpjose96/MERN-Movies-App"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-red-500 hover:text-red-400 transition font-medium"
          >
            View Project on GitHub
          </motion.a>
        </motion.div>

        {/* Copyright */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-gray-800 mt-8 pt-6 text-center"
        >
          <p className="text-gray-500">
            © {new Date().getFullYear()} MovieFlix. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;