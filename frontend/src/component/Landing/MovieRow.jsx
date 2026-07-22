import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CARD_WIDTH = 240;

const MovieRow = ({ title, movies }) => {
  const sliderRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(6);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1536) setCardsPerView(6);
      else if (window.innerWidth >= 1280) setCardsPerView(5);
      else if (window.innerWidth >= 1024) setCardsPerView(4);
      else if (window.innerWidth >= 768) setCardsPerView(3);
      else setCardsPerView(2);
    };

    updateCardsPerView();

    window.addEventListener("resize", updateCardsPerView);

    return () =>
      window.removeEventListener(
        "resize",
        updateCardsPerView
      );
  }, []);

  const maxIndex = Math.max(
    0,
    movies.length - cardsPerView
  );

  const slideNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + cardsPerView, maxIndex)
    );
  };

  const slidePrev = () => {
    setCurrentIndex((prev) =>
      Math.max(prev - cardsPerView, 0)
    );
  };

  return (
    <section className="mb-16 group">
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-white">
          {title}
        </h2>

        <Link
          to="/movies"
          className="text-red-500 hover:text-red-400 font-semibold text-lg transition"
        >
          View All →
        </Link>
      </div>

      {/* Slider */}

      <div className="relative">
        {/* Left Button */}

        {currentIndex > 0 && (
          <button
            onClick={slidePrev}
            className="absolute left-0 top-0 bottom-0 z-40 w-16 bg-black/70 hover:bg-black/90 text-white text-5xl opacity-0 group-hover:opacity-100 transition duration-300"
          >
            ❮
          </button>
        )}

        {/* Right Button */}

        {currentIndex < maxIndex && (
          <button
            onClick={slideNext}
            className="absolute right-0 top-0 bottom-0 z-40 w-16 bg-black/70 hover:bg-black/90 text-white text-5xl opacity-0 group-hover:opacity-100 transition duration-300"
          >
            ❯
          </button>
        )}

        {/* Movie Container */}

        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-5 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * CARD_WIDTH
              }px)`,
            }}
          >
            {movies?.map((movie, index) => (
              <Link
                key={movie._id}
                to={`/movies/${movie._id}`}
                className="relative flex-shrink-0 group/movie"
              >
                {/* Rank */}

                <span className="absolute -left-6 bottom-0 text-[120px] font-black text-black opacity-90 [-webkit-text-stroke:2px_white] z-20 pointer-events-none">
                  {index + 1}
                </span>

                {/* Card */}

                <div className="relative w-[220px] h-[330px] rounded-xl overflow-hidden transition-all duration-300 group-hover/movie:scale-110 group-hover/movie:z-30 group-hover/movie:shadow-[0_0_35px_rgba(229,9,20,0.45)]">
                  <img
                    src={movie.poster}
                    alt={movie.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2">
                      {movie.name}
                    </h3>

                    <p className="text-gray-300 text-sm mt-1">
                      {movie.year}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieRow;