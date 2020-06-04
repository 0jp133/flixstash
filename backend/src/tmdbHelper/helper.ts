/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ISearchQuery } from 'flixstash-common/types';

import { ITMDbSearchResults, ITMDbMovieDetails } from '../tmdbHelper/type';
import config from '../utils/config';
import { HttpStatusCode } from '../types/http';

const DEFAULT_ERROR_MSG = 'Remote movie API error.';

/**
 * Functions for interacting with The Movie Database (TMDb) API.
 */

const search = async (searchRequest: ISearchQuery) => {
  const queryConfig: AxiosRequestConfig = {
    params: {
      api_key: config.TMDB_API_KEY,
      query: searchRequest.query,
      page: searchRequest.page,
      include_adult: false,
    },
    validateStatus: (status) => status === HttpStatusCode.Ok,
  };

  try {
    const response = await axios.get<ITMDbSearchResults>(
      'https://api.themoviedb.org/3/search/movie',
      queryConfig
    );

    return response.data;
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MSG);
  }
};

const getMovieDetails = async (movieId: number) => {
  const queryConfig: AxiosRequestConfig = {
    params: {
      api_key: config.TMDB_API_KEY,
      append_to_response: 'keywords,credits',
    },
    validateStatus: (status) => status === HttpStatusCode.Ok,
  };

  try {
    const response = await axios.get<ITMDbMovieDetails>(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      queryConfig
    );

    return response.data;
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MSG);
  }
};

const getMoviesDetails = async (movieIds: number[]) => {
  const queryConfig: AxiosRequestConfig = {
    params: {
      api_key: config.TMDB_API_KEY,
      append_to_response: 'keywords,credits',
    },
    validateStatus: (status) => status === HttpStatusCode.Ok,
  };

  const moviesRequests: Promise<AxiosResponse<ITMDbMovieDetails>>[] = [];

  movieIds.forEach((id) => {
    moviesRequests.push(
      axios.get<ITMDbMovieDetails>(
        `https://api.themoviedb.org/3/movie/${id}`,
        queryConfig
      )
    );
  });

  try {
    const responses = await Promise.all(moviesRequests);

    return responses.map((response) => response.data);
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MSG);
  }
};

export const tmdbHelper = {
  search,
  getMovieDetails,
  getMoviesDetails,
};
