import express, { RequestHandler } from 'express';
import { IMovieOverview, IFlixstashApi } from 'flixstash-common/types';

import { auth } from '../middlewares/auth';
import { toMovieId, toUserMoviesQuery } from '../utils/validators';
import { tmdbConfig } from '../tmdbHelper/config';
import { IUserMovieModel } from '../models/user.model';
import { Movie } from '../models/movie.model';
import { tmdbHelper } from '../tmdbHelper/helper';
import { HttpStatusCode } from '../types/http';

const sortByTitle = (
  userMovieA: IUserMovieModel,
  userMovieB: IUserMovieModel
) => userMovieA.movie.title.localeCompare(userMovieB.movie.title);

const sortByReleaseDate = (
  userMovieA: IUserMovieModel,
  userMovieB: IUserMovieModel
) => {
  const a = new Date(userMovieA.movie.releaseDate);
  const b = new Date(userMovieB.movie.releaseDate);
  return a.getTime() - b.getTime();
};

const NUMBER_OF_MOVIES_PER_PAGE = 20;
const MAX_MOVIE_AGE_IN_MS = 86400000 * 3; // 3 days in ms

const getUserMovies: RequestHandler = async (req, res) => {
  let userMoviesQuery: IFlixstashApi['/api/movie']['get']['query'];

  try {
    userMoviesQuery = toUserMoviesQuery(req.query);
  } catch (error) {
    return res.status(HttpStatusCode.BadRequest).json({ error: error.message });
  }

  const userWithMovies = await req.user.populate('movies.movie').execPopulate();

  const pageNumber = userMoviesQuery.page;
  const userMovies = userWithMovies.movies;
  const genres = userMoviesQuery.genres;
  const allGenresAreSelected = [
    ...tmdbConfig.genreIdToNameMap.keys(),
  ].every((genreId) => genres.includes(genreId));
  const filter = userMoviesQuery.filter;
  const sort = userMoviesQuery.sort;

  // TODO: Try to sort and select results using mongodb "aggregation".
  /*
  const t = await req.user
    .model('User')
    .aggregate([
      { $match: { _id: req.user._id } },
      { $project: { movies: 1 } },
      //{ $unwind: '$movies' },
      {
        $lookup: {
          from: 'movies',
          localField: 'movies._id',
          foreignField: '_id',
          as: 'movieSummary',
        },
      },
    ])
    .exec();
  */

  // Sort the movies.
  let sortedUserMovies;
  if (sort === 1) {
    // ReleaseDate = 1
    sortedUserMovies = userMovies.sort(sortByReleaseDate);
  } else {
    // Title = 0
    sortedUserMovies = userMovies.sort(sortByTitle);
  }

  // Filter the movies.
  let filteredUserMovies;
  if (filter === 1) {
    // Watchlist = 1
    filteredUserMovies = filteredUserMovies = sortedUserMovies.filter(
      (userMovie) => userMovie.userData.watchlist === true
    );
  } else if (filter === 2) {
    // Seenlist = 2
    filteredUserMovies = filteredUserMovies = sortedUserMovies.filter(
      (userMovie) => userMovie.userData.seen === true
    );
  } else {
    // All = 0
    filteredUserMovies = sortedUserMovies;
  }

  // Filter by genres.
  const filteredByGenresUserMovies = allGenresAreSelected
    ? filteredUserMovies
    : filteredUserMovies.filter((userMovie) =>
        userMovie.movie.genres.some((id) => genres.includes(id))
      );

  const numberOfMovies = filteredByGenresUserMovies.length;
  const numberOfPages = Math.ceil(numberOfMovies / NUMBER_OF_MOVIES_PER_PAGE);

  // Slice the list of movies.
  const lowerBound = (pageNumber - 1) * NUMBER_OF_MOVIES_PER_PAGE;
  const higherBound = pageNumber * NUMBER_OF_MOVIES_PER_PAGE;
  const selectedUserMovies = filteredByGenresUserMovies.slice(
    lowerBound,
    higherBound
  );

  // Check if the data from each movies found in our database is outdated, and update it if necessary.
  const currentDate = new Date();
  const idsOfMoviesWithOutdatedInfos = selectedUserMovies
    .filter(
      (userMovie) =>
        currentDate.getTime() - userMovie.movie.updatedAt.getTime() >
        MAX_MOVIE_AGE_IN_MS
    )
    .map((userMovie) => userMovie.id);

  const updatedMoviesInfos = await tmdbHelper.getMoviesDetails(
    idsOfMoviesWithOutdatedInfos
  );

  // Update our database.
  const updatedAndSavedMoviesInfos = await Promise.all(
    updatedMoviesInfos.map((movie) =>
      Movie.findByIdAndUpdate(
        movie.id,
        {
          genres: movie.genres.map((genre) => genre.id),
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
          title: movie.title,
        },
        {
          new: true,
        }
      )
    )
  );

  // Update the list of movies that we will return to the user.
  const selectedAndUpdatedUserMovies = selectedUserMovies.map((userMovie) => {
    const updatedMovieInfos = updatedAndSavedMoviesInfos.find(
      (movie) => movie?.id === userMovie.id
    );
    return updatedMovieInfos
      ? { ...userMovie.toObject(), movie: updatedMovieInfos }
      : userMovie;
  });

  const movies: IMovieOverview[] = selectedAndUpdatedUserMovies.map(
    (userMovie) => ({
      id: userMovie._id,
      genres: userMovie.movie.genres.map(
        (genreId: number) => tmdbConfig.genreIdToNameMap.get(genreId) as string
      ),
      posterPath: userMovie.movie.posterPath
        ? tmdbConfig.secureBaseUrl +
          tmdbConfig.posterSize +
          userMovie.movie.posterPath
        : null,
      releaseDate: userMovie.movie.releaseDate,
      title: userMovie.movie.title,
      userData: userMovie.userData,
    })
  );

  const payload: IFlixstashApi['/api/movie']['get']['res'] = {
    page: pageNumber,
    filter: filter,
    sort: sort,
    genres: genres,
    movies: movies,
    totalPages: numberOfPages,
    totalMovies: numberOfMovies,
  };

  return res.status(HttpStatusCode.Ok).json(payload);
};

const getMovie: RequestHandler = async (req, res) => {
  let movieId: IFlixstashApi['/api/movie/:id']['get']['params'];

  try {
    movieId = toMovieId(req.params);
  } catch (error) {
    return res.status(HttpStatusCode.BadRequest).json({ error: error.message });
  }

  try {
    const movieDetails = await tmdbHelper.getMovieDetails(movieId.id);

    const userMovie = req.user.movies.id(movieId.id);

    // Create and return the movie details.
    const payload: IFlixstashApi['/api/movie/:id']['get']['res'] = {
      backdropPath: movieDetails.backdrop_path
        ? tmdbConfig.secureBaseUrl +
          tmdbConfig.backdropSize +
          movieDetails.backdrop_path
        : null,
      budget: movieDetails.budget,
      credits: movieDetails.credits,
      genres: movieDetails.genres,
      homepage: movieDetails.homepage,
      id: movieDetails.id,
      imdbId: movieDetails.imdb_id,
      keywords: movieDetails.keywords,
      originalLanguage: movieDetails.original_language,
      originalTitle: movieDetails.original_title,
      overview: movieDetails.overview,
      posterPath: movieDetails.poster_path
        ? tmdbConfig.secureBaseUrl +
          tmdbConfig.largePosterSize +
          movieDetails.poster_path
        : null,
      productionCompanies: movieDetails.production_companies,
      releaseDate: movieDetails.release_date,
      revenue: movieDetails.revenue,
      runtime: movieDetails.runtime,
      status: movieDetails.status,
      tagline: movieDetails.tagline,
      title: movieDetails.title,
      userData: userMovie ? userMovie.userData : undefined,
    };

    return res.status(HttpStatusCode.Ok).json(payload);
  } catch (error) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: 'Remote movie API error.' });
  }
};

const addMovieToList = (type: 'seen' | 'watch'): RequestHandler => async (
  req,
  res
) => {
  let movieId: IFlixstashApi['/api/movie/:id/seen']['post']['params'];
  try {
    movieId = toMovieId(req.params);
  } catch (error) {
    return res.status(HttpStatusCode.BadRequest).json({ error: error.message });
  }

  const movie = await Movie.findById(movieId.id);

  if (!movie) {
    // The movie is missing from our database. Fetch the movie details from the API
    // and save part of the information.

    try {
      const movieDetails = await tmdbHelper.getMovieDetails(movieId.id);

      const newMovie = new Movie({
        posterPath: movieDetails.poster_path,
        _id: movieDetails.id,
        title: movieDetails.title,
        genres: movieDetails.genres.map((genre) => genre.id),
        releaseDate: movieDetails.release_date,
      });

      await newMovie.save();
    } catch (error) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: error.message });
    }
  }

  let payload: IFlixstashApi['/api/movie/:id/seen']['post']['res'];

  // Check if the movie is already found in the user movies list.
  const userMovie = req.user.movies.id(movieId.id);

  if (userMovie) {
    // The movie exists. Simply set the variable to true.
    if (type === 'seen') {
      userMovie.userData.seen = true;
    } else if (type === 'watch') {
      userMovie.userData.watchlist = true;
    }

    await req.user.save();
    payload = userMovie.userData;
  } else {
    // The movie doesn't exists in the list. Add it to the list.
    let newUserData = {};
    if (type === 'seen') {
      newUserData = { seen: true };
    } else if (type === 'watch') {
      newUserData = { watchlist: true };
    }

    const newUserMovie = req.user.movies.create({
      _id: movieId.id,
      userData: newUserData,
    });
    req.user.movies.push(newUserMovie);

    await req.user.save();
    payload = newUserMovie.userData;
  }

  return res.status(HttpStatusCode.Ok).json(payload);
};

const removeMovieFromList = (type: 'seen' | 'watch'): RequestHandler => async (
  req,
  res
) => {
  let movieId: IFlixstashApi['/api/movie/:id/seen']['delete']['params'];
  try {
    movieId = toMovieId(req.params);
  } catch (error) {
    return res.status(HttpStatusCode.BadRequest).json({ error: error.message });
  }

  let payload: IFlixstashApi['/api/movie/:id/seen']['delete']['res'];

  // Search for the movie in the user movies list.
  const movie = req.user.movies.id(movieId.id);

  if (movie) {
    // Update and save the user data about this movie.
    if (type === 'seen') {
      movie.userData.seen = undefined;
    } else if (type === 'watch') {
      movie.userData.watchlist = undefined;
    }

    await req.user.save();
    payload = movie.userData;
  } else {
    payload = {};
  }

  return res.status(HttpStatusCode.Ok).json(payload);
};

export const movieRouter = express.Router();
movieRouter.get('/', auth, getUserMovies);
movieRouter.get('/:id', auth, getMovie);
movieRouter.post('/:id/seen', auth, addMovieToList('seen'));
movieRouter.delete('/:id/seen', auth, removeMovieFromList('seen'));
movieRouter.post('/:id/watchlist', auth, addMovieToList('watch'));
movieRouter.delete('/:id/watchlist', auth, removeMovieFromList('watch'));
