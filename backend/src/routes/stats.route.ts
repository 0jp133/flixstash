import express, { RequestHandler } from 'express';
import { IFlixstashApi } from 'flixstash-common/types';

import { auth } from '../middlewares/auth';
import { tmdbConfig } from '../tmdbHelper/config';
import { HttpStatusCode } from '../types/http';

const getStats: RequestHandler = async (req, res) => {
  const userWithMovies = await req.user.populate('movies.movie').execPopulate();

  // Compute the following stats by iterating over the movies of the user:
  //  - The number of movies in the seen list.
  //  - The number of movies in the watch list.
  //  - Number of movies in seen list by genre.
  //  - Number of movies in watch list by genre.
  const [
    numberOfMoviesInSeenList,
    numberOfMoviesInWatchList,
    numberOfMoviesInSeenListByGenreMap,
    numberOfMoviesInWatchListByGenreMap,
  ] = userWithMovies.movies.reduce(
    (acc, cur) => {
      if (cur.userData.seen) {
        // Increment the number of movies for the seen list.
        acc[0] += 1;

        // Increment the corresponding genre(s) for this movie in the seen list map.
        cur.movie.genres.forEach((genreId) =>
          acc[2].set(genreId, (acc[2].get(genreId) as number) + 1)
        );
      }
      if (cur.userData.watchlist) {
        // Increment the number of movies for the watch list.
        acc[1] += 1;

        // Increment the corresponding genre(s) for this movie in the watch list map.
        cur.movie.genres.forEach((genreId) =>
          acc[3].set(genreId, (acc[3].get(genreId) as number) + 1)
        );
      }
      return acc;
    },
    [
      0,
      0,
      tmdbConfig.getGenreIdToDefaultMap(0),
      tmdbConfig.getGenreIdToDefaultMap(0),
    ]
  );

  // Convert the maps to objects. Use the genre name as a key, instead of the genre ID.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numberOfMoviesInSeenListByGenre: any = {};
  for (const key of numberOfMoviesInSeenListByGenreMap.keys()) {
    numberOfMoviesInSeenListByGenre[
      tmdbConfig.genreIdToNameMap.get(key) as string
    ] = numberOfMoviesInSeenListByGenreMap.get(key);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numberOfMoviesInWatchListByGenre: any = {};
  for (const key of numberOfMoviesInWatchListByGenreMap.keys()) {
    numberOfMoviesInWatchListByGenre[
      tmdbConfig.genreIdToNameMap.get(key) as string
    ] = numberOfMoviesInWatchListByGenreMap.get(key);
  }

  // Get the favorite genre of the user from its seen list.
  const [favoriteGenreId, numberOfMovies] = [
    ...numberOfMoviesInSeenListByGenreMap.entries(),
  ].reduce(
    (acc, [genreId, numberOfMovies]) => {
      if (numberOfMovies > acc[1]) {
        acc[0] = genreId;
        acc[1] = numberOfMovies;
      }
      return acc;
    },
    [0, 0]
  );

  // Create and return the user stats.
  const payload: IFlixstashApi['/api/stats']['get']['res'] = {
    numberOfMoviesInSeenList,
    numberOfMoviesInWatchList,
    numberOfMoviesInSeenListByGenre,
    numberOfMoviesInWatchListByGenre,
    favoriteGenre:
      numberOfMovies > 0
        ? (tmdbConfig.genreIdToNameMap.get(favoriteGenreId) as string)
        : null,
  };

  return res.status(HttpStatusCode.Ok).json(payload);
};

export const statsRouter = express.Router();
statsRouter.get('/', auth, getStats);
