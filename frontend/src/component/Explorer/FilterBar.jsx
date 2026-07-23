import { FaSearch, FaUndo } from "react-icons/fa";

const FilterBar = ({
  search,
  setSearch,
  onSearch,
  genre,
  setGenre,
  sort,
  setSort,
  genres = [],
  resetFilters,
}) => {
  return (
    <section className="bg-[#141414]/95 backdrop-blur-xl border border-zinc-700 rounded-3xl shadow-2xl p-6 md:p-7 mb-10">
      {/* Heading */}

      <div className="text-center mb-7">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Discover Movies
        </h2>

        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Search, filter and explore thousands of movies.
        </p>
      </div>

      {/* Search */}

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSearch();
              }
            }}
            className="w-full bg-[#1f1f1f] border border-zinc-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-red-500 transition duration-300"
          />
        </div>

        <button
          onClick={onSearch}
          className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold text-white transition duration-300 whitespace-nowrap"
        >
          Search
        </button>
      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Genre */}

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-[#1f1f1f] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition duration-300"
        >
          <option value="">🎭 All Genres</option>

          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#1f1f1f] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition duration-300"
        >
          <option value="popularity">🔥 Popularity</option>
          <option value="rating">⭐ Highest Rated</option>
          <option value="newest">📅 Newest</option>
          <option value="oldest">📽 Oldest</option>
          <option value="az">🔤 A-Z</option>
        </select>

        {/* Reset */}

        <button
          onClick={resetFilters}
          className="bg-zinc-800 hover:bg-red-600 border border-zinc-700 hover:border-red-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 py-3 transition duration-300"
        >
          <FaUndo className="text-sm" />
          Reset Filters
        </button>
      </div>
    </section>
  );
};

export default FilterBar;