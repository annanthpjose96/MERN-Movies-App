import express from "express";
const router = express.Router();

// Controllers
import {
  getSpecificMovie,
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovieGenres,
  discoverMoviesController,
  searchMovies,
} from "../controllers/movieController.js";

// ================= TMDB MOVIE DETAILS =================

router.get("/specific-movie/:id", getSpecificMovie);

// ================= TMDB CATEGORY ROUTES =================

router.get("/trending", getTrending);

router.get("/popular", getPopular);

router.get("/top-rated", getTopRated);

router.get("/upcoming", getUpcoming);

// ================= TMDB GENRES =================

router.get("/genres", getMovieGenres);

// ================= DISCOVER MOVIES =================

router.get("/discover", discoverMoviesController);

// ================= SEARCH =================

router.get("/search/:keyword", searchMovies);

export default router;