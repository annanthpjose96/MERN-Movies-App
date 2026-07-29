import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaSearch, FaUndo, FaChevronDown, FaCheck } from "react-icons/fa";

const sortOptions = [
  { value: "popularity", label: "🔥 Popularity" },
  { value: "rating", label: "⭐ Highest Rated" },
  { value: "newest", label: "📅 Newest" },
  { value: "oldest", label: "📽 Oldest" },
  { value: "az", label: "🔤 A-Z" },
];

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
  const selectedGenre =
    genre === ""
      ? { id: "", name: "🎭 All Genres" }
      : genres.find((g) => String(g.id) === String(genre)) || {
          id: "",
          name: "🎭 All Genres",
        };

  const selectedSort =
    sortOptions.find((item) => item.value === sort) || sortOptions[0];

  return (
    // relative + z-40 lifts this ENTIRE section into its own stacking
    // context above the movie grid below (which can otherwise paint on
    // top of the dropdown even though the dropdown has its own z-50).
    <section className="relative z-40 bg-[#141414]/95 backdrop-blur-xl border border-zinc-700 rounded-3xl shadow-2xl p-6 md:p-7 mb-10">
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
        {/* Genre Dropdown */}

        <Listbox value={genre} onChange={setGenre}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-zinc-700 bg-[#1f1f1f] py-3 pl-4 pr-10 text-left text-white transition duration-300 hover:border-zinc-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30">
              <span className="block truncate">{selectedGenre.name}</span>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <FaChevronDown className="text-gray-400 text-sm transition-transform duration-300 ui-open:rotate-180" />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition duration-150 ease-out"
              enterFrom="opacity-0 -translate-y-2 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition duration-100 ease-in"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 -translate-y-2 scale-95"
            >
              <Listbox.Options className="dropdown-scroll absolute z-[999] mt-2 max-h-72 w-full overflow-auto rounded-xl border border-zinc-700 bg-[#1b1b1b]/98 backdrop-blur-xl py-2 shadow-2xl ring-1 ring-black/50 focus:outline-none">
                <Listbox.Option value="">
                  {({ active, selected }) => (
                    <div
                      className={`flex items-center justify-between mx-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                        active
                          ? "bg-red-600 text-white"
                          : selected
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    >
                      <span>🎭 All Genres</span>

                      {selected && <FaCheck className="text-sm" />}
                    </div>
                  )}
                </Listbox.Option>

                {genres.map((g) => (
                  <Listbox.Option key={g.id} value={String(g.id)}>
                    {({ active, selected }) => (
                      <div
                        className={`flex items-center justify-between mx-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                          active
                            ? "bg-red-600 text-white"
                            : selected
                            ? "text-red-500"
                            : "text-white"
                        }`}
                      >
                        <span>{g.name}</span>

                        {selected && <FaCheck className="text-sm" />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {/* Sort Dropdown */}

        <Listbox value={sort} onChange={setSort}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-zinc-700 bg-[#1f1f1f] py-3 pl-4 pr-10 text-left text-white transition duration-300 hover:border-zinc-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30">
              <span className="block truncate">{selectedSort.label}</span>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <FaChevronDown className="text-gray-400 text-sm transition-transform duration-300 ui-open:rotate-180" />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition duration-150 ease-out"
              enterFrom="opacity-0 -translate-y-2 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition duration-100 ease-in"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 -translate-y-2 scale-95"
            >
              <Listbox.Options className="dropdown-scroll absolute z-[999] mt-2 max-h-72 w-full overflow-auto rounded-xl border border-zinc-700 bg-[#1b1b1b]/98 backdrop-blur-xl py-2 shadow-2xl ring-1 ring-black/50 focus:outline-none">
                {sortOptions.map((item) => (
                  <Listbox.Option key={item.value} value={item.value}>
                    {({ active, selected }) => (
                      <div
                        className={`flex items-center justify-between mx-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                          active
                            ? "bg-red-600 text-white"
                            : selected
                            ? "text-red-500"
                            : "text-white"
                        }`}
                      >
                        <span>{item.label}</span>

                        {selected && <FaCheck className="text-sm" />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* Reset */}

        <button
          onClick={resetFilters}
          className="bg-zinc-800 hover:bg-red-600 border border-zinc-700 hover:border-red-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 py-3 transition duration-300"
        >
          <FaUndo className="text-sm" />
          Reset Filters
        </button>
      </div>

      {/* Custom scrollbar for dropdowns */}
      <style>
        {`
          .dropdown-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .dropdown-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .dropdown-scroll::-webkit-scrollbar-thumb {
            background-color: #dc2626;
            border-radius: 9999px;
          }
          .dropdown-scroll {
            scrollbar-width: thin;
            scrollbar-color: #dc2626 transparent;
          }
        `}
      </style>
    </section>
  );
};

export default FilterBar;
