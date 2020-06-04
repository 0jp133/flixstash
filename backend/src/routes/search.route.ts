import express, { RequestHandler } from 'express';
import { IFlixstashApi } from 'flixstash-common/types';

import { auth } from '../middlewares/auth';
import { ITMDbSearchMovieResult } from '../tmdbHelper/type';
import { toSearchQuery } from '../utils/validators';
import { tmdbConfig } from '../tmdbHelper/config';
import { tmdbHelper } from '../tmdbHelper/helper';
import { HttpStatusCode } from '../types/http';

const searchMovie: RequestHandler = async (req, res) => {
  let searchQuery: IFlixstashApi['/api/search']['get']['query'];
  try {
    searchQuery = toSearchQuery(req.query);
  } catch (error) {
    return res.status(HttpStatusCode.BadRequest).json({ error: error.message });
  }

  try {
    const searchResponse = await tmdbHelper.search(searchQuery);

    // Create and return the search result.
    const payload: IFlixstashApi['/api/search']['get']['res'] = {
      query: searchQuery.query,
      page: searchResponse.page,
      totalResults: searchResponse.total_results,
      totalPages: searchResponse.total_pages,
      results: searchResponse.results.map((movie: ITMDbSearchMovieResult) => {
        const userMovie = req.user.movies.id(movie.id);
        return {
          posterPath: movie.poster_path
            ? tmdbConfig.secureBaseUrl +
              tmdbConfig.posterSize +
              movie.poster_path
            : null,
          id: movie.id,
          genres: movie.genre_ids.map(
            (genreId) => tmdbConfig.genreIdToNameMap.get(genreId) as string
          ),
          title: movie.title,
          releaseDate: movie.release_date,
          userData: userMovie ? userMovie.userData : undefined,
        };
      }),
    };

    return res.status(HttpStatusCode.Ok).json(payload);
  } catch (error) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: 'Remote movie API error.' });
  }
};

export const searchRouter = express.Router();
searchRouter.get('/', auth, searchMovie);
