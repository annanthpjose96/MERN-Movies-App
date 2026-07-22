import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
  searchTMDBMovies,
  getGenres,
  discoverMovies,
} from "../utils/tmdbService.js";

const getSpecificMovie = async (req, res) => {
  try {
    const movie = await getMovieDetails(req.params.id);

    const trailer = movie.videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

    const director = movie.credits?.crew?.find(
      (person) => person.job === "Director"
    );

    const formattedMovie = {
      _id: movie.id,

      name: movie.title,

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

      overview: movie.overview,

      releaseDate: movie.release_date,

      year: movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : null,

      runtime: movie.runtime,

      language: movie.original_language,

      status: movie.status,

      rating: movie.vote_average,

      genres: movie.genres || [],

      director: director?.name || "",

      trailer: trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : "",

      cast:
        movie.credits?.cast?.slice(0, 10).map((actor) => ({
          id: actor.id,
          name: actor.name,
          character: actor.character,
          image: actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : "",
        })) || [],

      similar:
        movie.similar?.results?.slice(0, 10).map((item) => ({
          id: item.id,
          name: item.title,
          poster: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "",
        })) || [],
    };

    res.json(formattedMovie);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

const getTrending = async (req, res) => {
  try {
    const movies = await getTrendingMovies();

    const formattedMovies = movies.map((movie) => ({
      _id: movie.id,

      name: movie.title,

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

      overview: movie.overview,

      releaseDate: movie.release_date,

      year: movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : null,

      rating: movie.vote_average,

      genres: movie.genre_ids || [],

      language: movie.original_language,
    }));

    res.json(formattedMovies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

const getPopular = async (req, res) => {
  try {
    const movies = await getPopularMovies();

    const formattedMovies = movies.map((movie) => ({
      _id: movie.id,

      name: movie.title,

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

      overview: movie.overview,

      releaseDate: movie.release_date,

      year: movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : null,

      rating: movie.vote_average,

      genres: movie.genre_ids || [],

      language: movie.original_language,
    }));

    res.json(formattedMovies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};
const getTopRated = async (req, res) => {
  try {
    const movies = await getTopRatedMovies();

    const formattedMovies = movies.map((movie) => ({
      _id: movie.id,

      name: movie.title,

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

      overview: movie.overview,

      releaseDate: movie.release_date,

      year: movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : null,

      rating: movie.vote_average,

      genres: movie.genre_ids || [],

      language: movie.original_language,
    }));

    res.json(formattedMovies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

const getUpcoming = async (req, res) => {
  try {
    const movies = await getUpcomingMovies();

    const formattedMovies = movies.map((movie) => ({
      _id: movie.id,

      name: movie.title,

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

      overview: movie.overview,

      releaseDate: movie.release_date,

      year: movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : null,

      rating: movie.vote_average,

      genres: movie.genre_ids || [],

      language: movie.original_language,
    }));

    res.json(formattedMovies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// =======================
// Movie Genres
// =======================

const getMovieGenres = async (req, res) => {
  try {
    const genres = await getGenres();

    res.json(genres);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// =======================
// Discover Movies
// =======================

const discoverMoviesController = async (req, res) => {
  try {
    const {
      genre,
      sort,
      year,
      language,
      page,
    } = req.query;

    const movies = await discoverMovies({
      genre,
      sort,
      year,
      language,
      page,
    });

    const formattedMovies = movies.map((movie) => ({
      _id: movie.id,

      name: movie.title,

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

      overview: movie.overview,

      releaseDate: movie.release_date,

      year: movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : null,

      rating: movie.vote_average,

      genres: movie.genre_ids || [],

      language: movie.original_language,
    }));

    res.json(formattedMovies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { keyword } = req.params;

    const movies = await searchTMDBMovies(keyword);

    const formattedMovies = movies.map((movie) => ({
      _id: movie.id,

      name: movie.title,

      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

      overview: movie.overview,

      releaseDate: movie.release_date,

      year: movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : null,

      rating: movie.vote_average,

      genres: movie.genre_ids || [],

      language: movie.original_language,
    }));

    res.json(formattedMovies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

export {
  getSpecificMovie,
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovieGenres,
  discoverMoviesController,
  searchMovies,
};