import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../../component/Landing/Navbar";
import HeroBanner from "../../component/Landing/HeroBanner";
import MovieGrid from "./MovieGrid";
import FilterBar from "../../component/Explorer/FilterBar";

import {
  useDiscoverMoviesQuery,
  useGetGenresQuery,
  useSearchMoviesQuery,
} from "../../redux/api/movies";

const AllMovies = () => {
  // ==========================
  // Filter States
  // ==========================

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("popularity");

  const [page, setPage] = useState(1);

  // ==========================
  // Fetch Genres
  // ==========================

  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();

  // ==========================
  // Discover Movies
  // ==========================

  const { data: discoverMovies = [], isLoading: discoverLoading } =
    useDiscoverMoviesQuery({
      genre,
      sort,
      page,
    });

  // ==========================
  // Search Movies
  // ==========================

  const { data: searchedMovies = [], isLoading: searchLoading } =
    useSearchMoviesQuery(search, {
      skip: search.trim() === "",
    });

  // ==========================
  // Display Movies
  // ==========================

  const filteredMovies =
    search.trim() !== "" ? searchedMovies : discoverMovies;

  const isLoading =
    search.trim() !== "" ? searchLoading : discoverLoading;

  // ==========================
  // Search
  // ==========================

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  // ==========================
  // Reset
  // ==========================

  const resetFilters = () => {
    setSearch("");
    setSearchInput("");
    setGenre("");
    setSort("popularity");
    setPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-black text-white"
    >
      <Navbar />

      <HeroBanner movie={filteredMovies[0]} />

      <div className="relative z-20 -mt-20 max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FilterBar
            search={searchInput}
            setSearch={setSearchInput}
            onSearch={handleSearch}
            genre={genre}
            setGenre={setGenre}
            sort={sort}
            setSort={setSort}
            genres={genres}
            resetFilters={resetFilters}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 mb-6"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Discover Movies
          </h2>

          <p className="text-gray-400 mt-2 text-base">
            Search, filter and discover thousands of movies from every genre.
          </p>
        </motion.div>

        {isLoading || genresLoading ? (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <h2 className="text-4xl font-bold">No Movies Found</h2>

            <p className="text-gray-400 mt-4">
              Try changing your search or filters.
            </p>

            <button
              onClick={resetFilters}
              className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold transition"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <>
            <MovieGrid movies={filteredMovies} isLoading={false} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center mt-14 mb-8"
            >
              <p className="text-gray-400 text-center mb-6">
                Showing{" "}
                <span className="text-white font-semibold">
                  {filteredMovies.length}
                </span>{" "}
                movies.
                <br />
                Load more to discover even more amazing titles.
              </p>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-10 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition duration-300"
              >
                Load More Movies
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AllMovies;