import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useGetSpecificMovieQuery } from "../../redux/api/movies";

import TrailerModal from "../../component/TrailerModal";

import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../redux/features/watchlist/watchlistSlice";

/* ================= ANIMATION VARIANTS ================= */

const pageFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const posterVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const contentVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.25 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const genreContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.5,
    },
  },
};

const genreItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const overviewVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const rowContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const rowItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ================= LOADING SKELETON ================= */

const shimmer =
  "relative overflow-hidden bg-[#1a1a1a] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-black">
      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      {/* ================= HERO SKELETON ================= */}

      <section className="relative min-h-[80vh] w-full overflow-hidden bg-[#0d0d0d]">
        <div className={`absolute inset-0 ${shimmer}`} />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-10">
          {/* Poster skeleton */}

          <div
            className={`w-[280px] lg:w-[300px] h-[420px] rounded-2xl flex-shrink-0 ${shimmer}`}
          />

          {/* Right side skeleton */}

          <div className="ml-10 lg:ml-12 max-w-4xl w-full">
            {/* Title */}
            <div className={`h-16 w-3/4 rounded-lg ${shimmer}`} />

            {/* Meta row */}
            <div className="flex gap-4 mt-8">
              <div className={`h-6 w-16 rounded ${shimmer}`} />
              <div className={`h-6 w-12 rounded ${shimmer}`} />
              <div className={`h-6 w-20 rounded ${shimmer}`} />
              <div className={`h-6 w-14 rounded ${shimmer}`} />
            </div>

            {/* Genre chips */}
            <div className="flex gap-4 mt-8">
              <div className={`h-10 w-24 rounded-full ${shimmer}`} />
              <div className={`h-10 w-28 rounded-full ${shimmer}`} />
              <div className={`h-10 w-20 rounded-full ${shimmer}`} />
            </div>

            {/* Buttons */}
            <div className="flex gap-5 mt-10">
              <div className={`h-16 w-48 rounded-xl ${shimmer}`} />
              <div className={`h-16 w-56 rounded-xl ${shimmer}`} />
            </div>

            {/* Overview */}
            <div className="mt-12 space-y-3">
              <div className={`h-6 w-32 rounded ${shimmer}`} />
              <div className={`h-4 w-full rounded ${shimmer}`} />
              <div className={`h-4 w-full rounded ${shimmer}`} />
              <div className={`h-4 w-2/3 rounded ${shimmer}`} />
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-24 rounded-2xl ${shimmer}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAST SKELETON ================= */}

      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-10">
          <div className={`h-9 w-40 rounded mb-10 ${shimmer}`} />

          <div className="flex gap-6 overflow-x-hidden pb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-[180px] flex-shrink-0">
                <div className={`h-[270px] w-full rounded-2xl ${shimmer}`} />
                <div className={`h-4 w-3/4 rounded mt-4 ${shimmer}`} />
                <div className={`h-3 w-1/2 rounded mt-2 ${shimmer}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SIMILAR MOVIES SKELETON ================= */}

      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-10">
          <div className={`h-9 w-56 rounded mb-10 ${shimmer}`} />

          <div className="flex gap-6 overflow-x-hidden pb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-[180px] flex-shrink-0">
                <div className={`h-[270px] w-full rounded-2xl ${shimmer}`} />
                <div className={`h-4 w-3/4 rounded mt-4 ${shimmer}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ================= SCROLL ROW (CAROUSEL) ================= */

const ScrollRow = ({ children }) => {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateArrows = () => {
    const el = rowRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 8);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  // Custom eased scroll animation — slower and smoother than native
  // "behavior: smooth", which is fast and not time-adjustable.
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const scrollBy = (direction) => {
    const el = rowRef.current;
    if (!el) return;

    const distance = el.clientWidth * 0.85 * direction;
    const start = el.scrollLeft;
    const target = start + distance;
    const duration = 900; // ms — slow, deliberate slide
    let startTime = null;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      el.scrollLeft = start + (target - start) * eased;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    updateArrows();
  }, [children]);

  return (
    <div className="relative group/row">
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* Left fade */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-6 w-24 z-10 bg-gradient-to-r from-black via-black/70 to-transparent transition-opacity duration-500 ${
          showLeft ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Right fade */}
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-6 w-24 z-10 bg-gradient-to-l from-black via-black/70 to-transparent transition-opacity duration-500 ${
          showRight ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Left arrow — plain icon over the fade, no circle background */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className={`absolute left-2 top-0 bottom-6 z-20 flex items-center justify-center px-3 text-white/90 transition-all duration-300 hover:text-white hover:scale-110 ${
          showLeft
            ? "opacity-0 group-hover/row:opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <FaChevronLeft className="text-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]" />
      </button>

      {/* Right arrow — plain icon over the fade, no circle background */}
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className={`absolute right-2 top-0 bottom-6 z-20 flex items-center justify-center px-3 text-white/90 transition-all duration-300 hover:text-white hover:scale-110 ${
          showRight
            ? "opacity-0 group-hover/row:opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <FaChevronRight className="text-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]" />
      </button>

      <motion.div
        ref={rowRef}
        onScroll={updateArrows}
        className="no-scrollbar flex gap-6 overflow-x-auto pb-6"
        variants={rowContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const MovieDetails = () => {
  const { id: movieId } = useParams();

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Scroll to top whenever the movie changes (e.g. clicking a similar movie)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [movieId]);

  const { data: movie } = useGetSpecificMovieQuery(movieId);

  const dispatch = useDispatch();

  const watchlist = useSelector((state) => state.watchlist.movies);

  const isInWatchlist = watchlist.some((item) => item._id === movie?._id);

  const watchlistHandler = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie._id));
      toast.success("Removed from Watchlist");
    } else {
      dispatch(addToWatchlist(movie));
      toast.success("Added to Watchlist");
    }
  };

  if (!movie) {
    return <MovieDetailsSkeleton />;
  }

  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
    >
      {/* ================= HERO ================= */}

      <section className="relative min-h-[80vh] w-full overflow-hidden">
        <motion.img
          src={movie.backdrop}
          alt={movie.name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Back Button */}

        <motion.div
          className="absolute top-8 left-8 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105 px-6 py-3 rounded-lg font-semibold text-white shadow-xl"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Hero Content */}

        <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-10">
          {/* Poster */}

          <motion.img
            src={movie.poster}
            alt={movie.name}
            className="w-[280px] lg:w-[300px] rounded-2xl shadow-2xl"
            variants={posterVariant}
            initial="hidden"
            animate="visible"
          />

          {/* Right Side */}

          <motion.div
            className="ml-10 lg:ml-12 max-w-4xl"
            variants={contentVariant}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-white text-5xl lg:text-6xl font-black leading-tight max-w-2xl"
              variants={titleVariant}
              initial="hidden"
              animate="visible"
            >
              {movie.name}
            </motion.h1>

            {/* Movie Meta */}

            <motion.div
              className="flex flex-wrap items-center gap-3 mt-8 text-xl text-gray-300"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={staggerItem}
                className="text-yellow-400 font-bold"
              >
                ⭐ {movie.rating?.toFixed(1)}
              </motion.span>

              <motion.span variants={staggerItem}>•</motion.span>

              <motion.span variants={staggerItem}>{movie.year}</motion.span>

              <motion.span variants={staggerItem}>•</motion.span>

              <motion.span variants={staggerItem}>
                {movie.runtime} min
              </motion.span>

              <motion.span variants={staggerItem}>•</motion.span>

              <motion.span variants={staggerItem}>
                {movie.language?.toUpperCase()}
              </motion.span>
            </motion.div>

            {/* Genres */}

            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              variants={genreContainer}
              initial="hidden"
              animate="visible"
            >
              {movie.genres?.map((genre) => (
                <motion.span
                  key={genre.id}
                  variants={genreItem}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 px-5 py-2 rounded-full text-white font-medium"
                >
                  {genre.name}
                </motion.span>
              ))}
            </motion.div>

            {/* Buttons */}

            <motion.div
              className="flex gap-5 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            >
              {movie.trailer && (
                <motion.button
                  onClick={() => setIsTrailerOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 transition-colors duration-300 px-8 py-3 rounded-xl text-base font-bold shadow-xl"
                >
                  ▶ Play Trailer
                </motion.button>
              )}

              <motion.button
                onClick={watchlistHandler}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-xl text-base font-bold transition-colors duration-300 shadow-xl ${
                  isInWatchlist
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {isInWatchlist ? "✓ In Watchlist" : "♡ Add to Watchlist"}
              </motion.button>
            </motion.div>

            {/* Overview */}

            <motion.div
              className="mt-12"
              variants={overviewVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-white text-3xl font-bold mb-6">Overview</h2>

              <p className="text-gray-300 text-lg leading-8">
                {movie.overview}
              </p>
            </motion.div>

            {/* Movie Information */}

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
              variants={cardsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                variants={cardItem}
                whileHover={{ y: -6 }}
                className="bg-[#151515]/90 backdrop-blur-md p-5 rounded-2xl"
              >
                <p className="text-gray-400 text-sm">Director</p>

                <h3 className="text-white text-xl mt-2">
                  {movie.director || "Unknown"}
                </h3>
              </motion.div>

              <motion.div
                variants={cardItem}
                whileHover={{ y: -6 }}
                className="bg-[#151515]/90 backdrop-blur-md p-5 rounded-2xl"
              >
                <p className="text-gray-400 text-sm">Language</p>

                <h3 className="text-white text-xl mt-2 uppercase">
                  {movie.language}
                </h3>
              </motion.div>

              <motion.div
                variants={cardItem}
                whileHover={{ y: -6 }}
                className="bg-[#151515]/90 backdrop-blur-md p-5 rounded-2xl"
              >
                <p className="text-gray-400 text-sm">Release Date</p>

                <h3 className="text-white text-xl mt-2">{movie.releaseDate}</h3>
              </motion.div>

              <motion.div
                variants={cardItem}
                whileHover={{ y: -6 }}
                className="bg-[#151515]/90 backdrop-blur-md p-5 rounded-2xl"
              >
                <p className="text-gray-400 text-sm">Status</p>

                <h3 className="text-white text-xl mt-2">{movie.status}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= CAST ================= */}

      <motion.section
        className="bg-black py-16"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-white text-4xl font-bold mb-10">Top Cast</h2>

          <ScrollRow>
            {movie.cast?.map((actor) => (
              <motion.div
                key={actor.id}
                variants={rowItem}
                whileHover={{ y: -8 }}
                className="w-[180px] flex-shrink-0 group"
              >
                <img
                  src={
                    actor.image || "https://placehold.co/185x278?text=No+Image"
                  }
                  alt={actor.name}
                  className="h-[270px] w-full object-cover rounded-2xl transition duration-300 group-hover:scale-105"
                />

                <h3 className="text-white font-bold mt-4">{actor.name}</h3>

                <p className="text-gray-400 text-sm">{actor.character}</p>
              </motion.div>
            ))}
          </ScrollRow>
        </div>
      </motion.section>

      {/* ================= SIMILAR MOVIES ================= */}

      <motion.section
        className="bg-black py-10"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-white text-4xl font-bold mb-10">
            Similar Movies
          </h2>

          <ScrollRow>
            {movie.similar?.map((item) => (
              <motion.div
                key={item.id}
                variants={rowItem}
                whileHover={{ y: -8 }}
                className="w-[180px] flex-shrink-0"
              >
                <Link to={`/movies/${item.id}`} className="group block">
                  <img
                    src={item.poster}
                    alt={item.name}
                    className="rounded-2xl transition duration-300 group-hover:scale-105"
                  />

                  <h3 className="text-white mt-4 font-semibold group-hover:text-red-500 transition">
                    {item.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </ScrollRow>
        </div>
      </motion.section>

      {/* ================= TRAILER MODAL ================= */}

      <TrailerModal
        trailer={movie.trailer}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </motion.div>
  );
};

export default MovieDetails;
