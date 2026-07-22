import { apiSlice } from "./apiSlice";
import { MOVIE_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // MOVIE DETAILS
    // =========================

    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
    }),

    // =========================
    // TMDB CATEGORY ROUTES
    // =========================

    getTrendingMovies: builder.query({
      query: () => `${MOVIE_URL}/trending`,
    }),

    getPopularMovies: builder.query({
      query: () => `${MOVIE_URL}/popular`,
    }),

    getTopRatedMovies: builder.query({
      query: () => `${MOVIE_URL}/top-rated`,
    }),

    getUpcomingMovies: builder.query({
      query: () => `${MOVIE_URL}/upcoming`,
    }),

    // =========================
    // TMDB GENRES
    // =========================

    getGenres: builder.query({
      query: () => `${MOVIE_URL}/genres`,
    }),

    // =========================
    // DISCOVER MOVIES
    // =========================

    discoverMovies: builder.query({
      query: ({
        genre = "",
        sort = "popularity",
        year = "",
        language = "",
        page = 1,
      }) => ({
        url: `${MOVIE_URL}/discover`,
        params: {
          genre,
          sort,
          year,
          language,
          page,
        },
      }),
    }),

    // =========================
    // SEARCH
    // =========================

    searchMovies: builder.query({
      query: (keyword) => `${MOVIE_URL}/search/${keyword}`,
    }),
  }),
});

export const {
  useGetSpecificMovieQuery,

  useGetTrendingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,

  useGetGenresQuery,
  useDiscoverMoviesQuery,

  useSearchMoviesQuery,
} = moviesApiSlice;