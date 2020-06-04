import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  IUserCredentials,
  ITokenAndProfile,
  ISearchQuery,
  ISearchResult,
  IUserProfile,
  IUserMovieData,
  INewUserInformation,
  IMovie,
  IUserMoviesResult,
  IUserMoviesQuery,
  IUserStats,
} from 'flixstash-common/types';

import { store } from '../store';
import { logout as logoutAction } from '../modules/login/actions';
import { tokenHelper } from './tokenHelper';
import { State } from '../types';

/**
 * Functions for interacting with the API.
 */

enum HttpCodes {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
}

const DEFAULT_ERROR_MSG = 'Oups! Something went wrong. Try again later.';

// Add an interceptor that will handle 401 Unauthorized errors.
const responseHandler = (response: AxiosResponse<any>) => response;
const errorHandler = (error: any) => {
  if (error.response.status === HttpCodes.Unauthorized) {
    // If we receive an 401 Unauthorized error code, we log out the user.
    store.dispatch(logoutAction());
  }
  return Promise.reject(error);
};
axios.interceptors.response.use(responseHandler, errorHandler);

const getAuthHeader = () => {
  const state: State = store.getState();
  const token = state.login.token;

  if (token) {
    return { Authorization: `bearer ${token}` };
  } else {
    return {};
  }
};

/**
 * Sign up a new user.
 * @param newUserInformation The new user informations.
 */
const signup = async (newUserInformation: INewUserInformation): Promise<void> => {
  const config: AxiosRequestConfig = {
    validateStatus: (status) => status === HttpCodes.Created,
  };

  try {
    await axios.post('/api/authentication/signup', newUserInformation, config);
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Log in a returning user.
 * @param userCredentials The user credentials.
 */
const login = async (userCredentials: IUserCredentials): Promise<ITokenAndProfile> => {
  const config: AxiosRequestConfig = {
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.post<ITokenAndProfile>(
      '/api/authentication/login',
      userCredentials,
      config
    );

    tokenHelper.storeToken(response.data.token);

    return { profile: response.data.profile, token: response.data.token };
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Log out a user.
 */
const logout = () => {
  tokenHelper.deleteToken();
};

/**
 * Get the user profile informations.
 */
const getProfile = async (): Promise<IUserProfile> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.get<IUserProfile>('/api/profile', config);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Search for movies.
 * @param searchQuery The search request.
 */
const search = async (
  searchQuery: ISearchQuery
): Promise<ISearchResult> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    params: {
      query: searchQuery.query,
      page: searchQuery.page,
    },
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.get<ISearchResult>(
      '/api/search',
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Get all the informations for a movie.
 * @param movieId The movie ID.
 */
const getMovie = async (movieId: number): Promise<IMovie> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.get<IMovie>(
      `/api/movie/${movieId}`,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Get all the movies that the user has saved in his watch list or seen list.
 * @param userMoviesQuery The query.
 */
const getUserMovies = async (
  userMoviesQuery: IUserMoviesQuery
): Promise<IUserMoviesResult> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    params: {
      page: userMoviesQuery.page ? userMoviesQuery.page : 1,
      filter: userMoviesQuery.filter ? userMoviesQuery.filter : 0,
      sort: userMoviesQuery.sort ? userMoviesQuery.sort : 0,
      genres: userMoviesQuery.genres.join(','),
    },
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.get<IUserMoviesResult>(
      `/api/movie`,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Add a movie to the user watch list.
 * @param movieId The movie ID.
 */
const addToWatchlist = async (movieId: number): Promise<IUserMovieData> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.post<IUserMovieData>(
      `/api/movie/${movieId}/watchlist`,
      {},
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Remove a movie from the user watch list.
 * @param movieId The movie ID.
 */
const removeFromWatchlist = async (
  movieId: number
): Promise<IUserMovieData> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.delete<IUserMovieData>(
      `/api/movie/${movieId}/watchlist`,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Add a movie to the user seen list.
 * @param movieId The movie ID.
 */
const addToSeenlist = async (movieId: number): Promise<IUserMovieData> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.post<IUserMovieData>(
      `/api/movie/${movieId}/seen`,
      {},
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Remove a movie from the user seen list.
 * @param movieId The movie ID.
 */
const removeFromSeenlist = async (movieId: number): Promise<IUserMovieData> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.delete<IUserMovieData>(
      `/api/movie/${movieId}/seen`,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

/**
 * Get various statistics about the user.
 */
const getStats = async (): Promise<IUserStats> => {
  const config: AxiosRequestConfig = {
    headers: getAuthHeader(),
    validateStatus: (status) => status === HttpCodes.Ok,
  };

  try {
    const response = await axios.get<IUserStats>(`/api/stats`, config);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || DEFAULT_ERROR_MSG);
  }
};

export const apiHelper = {
  signup,
  login,
  logout,
  getProfile,
  search,
  getMovie,
  getUserMovies,
  addToWatchlist,
  removeFromWatchlist,
  addToSeenlist,
  removeFromSeenlist,
  getStats,
};
