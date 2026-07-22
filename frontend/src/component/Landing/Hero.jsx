import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative h-[88vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 pt-16">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight max-w-3xl">
          Unlimited movies,
          <br />
          shows, and more
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white font-medium">
          Watch anywhere. Discover anytime.
        </p>

        <p className="mt-5 max-w-2xl text-gray-300 text-base md:text-lg leading-relaxed">
          Explore thousands of movies powered by TMDB. Search your favourites,
          discover trending titles, and build your own personal watchlist.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to="/movies"
            className="px-10 py-4 bg-red-600 hover:bg-red-700 transition rounded-lg text-white text-lg font-semibold shadow-lg"
          >
            🎬 Browse Movies
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;