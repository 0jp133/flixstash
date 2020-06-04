import { IMovie, IUserMovieData } from 'flixstash-common/types';

import { apiHelper } from '../../helpers/apiHelper';
import { ThunkResult } from '../../types';
import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILED,
  IFetchMovieRequestAction,
  IFetchMovieSuccessAction,
  IFetchMovieFailedAction,
  ADD_MOVIE_TO_WATCHLIST_REQUEST,
  ADD_MOVIE_TO_WATCHLIST_SUCCESS,
  ADD_MOVIE_TO_WATCHLIST_FAILED,
  IAddMovieToWatchlistRequestAction,
  IAddMovieToWatchlistSuccessAction,
  IAddMovieToWatchlistFailedAction,
  ADD_MOVIE_TO_SEENLIST_REQUEST,
  ADD_MOVIE_TO_SEENLIST_SUCCESS,
  ADD_MOVIE_TO_SEENLIST_FAILED,
  IAddMovieToSeenlistRequestAction,
  IAddMovieToSeenlistSuccessAction,
  IAddMovieToSeenlistFailedAction,
  REMOVE_MOVIE_FROM_WATCHLIST_REQUEST,
  REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS,
  REMOVE_MOVIE_FROM_WATCHLIST_FAILED,
  IRemoveMovieFromWatchlistRequestAction,
  IRemoveMovieFromWatchlistSuccessAction,
  IRemoveMovieFromWatchlistFailedAction,
  REMOVE_MOVIE_FROM_SEENLIST_REQUEST,
  REMOVE_MOVIE_FROM_SEENLIST_SUCCESS,
  REMOVE_MOVIE_FROM_SEENLIST_FAILED,
  IRemoveMovieFromSeenlistRequestAction,
  IRemoveMovieFromSeenlistSuccessAction,
  IRemoveMovieFromSeenlistFailedAction,
} from './types';

export const fetchMovieInProgress = (): IFetchMovieRequestAction => ({
  type: FETCH_MOVIE_REQUEST,
});

export const fetchMovieSucceed = (
  movie: IMovie
): IFetchMovieSuccessAction => ({
  type: FETCH_MOVIE_SUCCESS,
  movie,
});

export const fetchMovieFailed = (error: string): IFetchMovieFailedAction => ({
  type: FETCH_MOVIE_FAILED,
  error,
});

export const fetchMovie = (movieId: number): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(fetchMovieInProgress());

    try {
      const movie = await apiHelper.getMovie(movieId);
      dispatch(fetchMovieSucceed(movie));
    } catch (error) {
      dispatch(fetchMovieFailed(error.message));
    }
  };
};

/**
 * Add to watch list actions.
 */

export const addMovieToWatchlistInProgress = (): IAddMovieToWatchlistRequestAction => ({
  type: ADD_MOVIE_TO_WATCHLIST_REQUEST,
});

export const addMovieToWatchlistSucceed = (
  userData: IUserMovieData,
  movieId: number
): IAddMovieToWatchlistSuccessAction => ({
  type: ADD_MOVIE_TO_WATCHLIST_SUCCESS,
  userData,
  movieId,
});

export const addMovieToWatchlistFailed = (
  error: string
): IAddMovieToWatchlistFailedAction => ({
  type: ADD_MOVIE_TO_WATCHLIST_FAILED,
  error,
});

export const addMovieToWatchlist = (movieId: number): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(addMovieToWatchlistInProgress());

    try {
      const userData = await apiHelper.addToWatchlist(movieId);
      dispatch(addMovieToWatchlistSucceed(userData, movieId));
    } catch (error) {
      dispatch(addMovieToWatchlistFailed(error.message));
    }
  };
};

/**
 * Add to seen list actions.
 */

export const addMovieToSeenlistInProgress = (): IAddMovieToSeenlistRequestAction => ({
  type: ADD_MOVIE_TO_SEENLIST_REQUEST,
});

export const addMovieToSeenlistSucceed = (
  userData: IUserMovieData,
  movieId: number
): IAddMovieToSeenlistSuccessAction => ({
  type: ADD_MOVIE_TO_SEENLIST_SUCCESS,
  userData,
  movieId,
});

export const addMovieToSeenlistFailed = (
  error: string
): IAddMovieToSeenlistFailedAction => ({
  type: ADD_MOVIE_TO_SEENLIST_FAILED,
  error,
});

export const addMovieToSeenlist = (movieId: number): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(addMovieToSeenlistInProgress());

    try {
      const userData = await apiHelper.addToSeenlist(movieId);
      dispatch(addMovieToSeenlistSucceed(userData, movieId));
    } catch (error) {
      dispatch(addMovieToSeenlistFailed(error.message));
    }
  };
};

/**
 * Remove from watch list actions.
 */

export const removeMovieFromWatchlistInProgress = (): IRemoveMovieFromWatchlistRequestAction => ({
  type: REMOVE_MOVIE_FROM_WATCHLIST_REQUEST,
});

export const removeMovieFromWatchlistSucceed = (
  userData: IUserMovieData,
  movieId: number
): IRemoveMovieFromWatchlistSuccessAction => ({
  type: REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS,
  userData,
  movieId,
});

export const removeMovieFromWatchlistFailed = (
  error: string
): IRemoveMovieFromWatchlistFailedAction => ({
  type: REMOVE_MOVIE_FROM_WATCHLIST_FAILED,
  error,
});

export const removeMovieFromWatchlist = (
  movieId: number
): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(removeMovieFromWatchlistInProgress());

    try {
      const userData = await apiHelper.removeFromWatchlist(movieId);
      dispatch(removeMovieFromWatchlistSucceed(userData, movieId));
    } catch (error) {
      dispatch(removeMovieFromWatchlistFailed(error.message));
    }
  };
};

/**
 * Remove from seen list actions.
 */

export const removeMovieFromSeenlistInProgress = (): IRemoveMovieFromSeenlistRequestAction => ({
  type: REMOVE_MOVIE_FROM_SEENLIST_REQUEST,
});

export const removeMovieFromSeenlistSucceed = (
  userData: IUserMovieData,
  movieId: number
): IRemoveMovieFromSeenlistSuccessAction => ({
  type: REMOVE_MOVIE_FROM_SEENLIST_SUCCESS,
  userData,
  movieId,
});

export const removeMovieFromSeenlistFailed = (
  error: string
): IRemoveMovieFromSeenlistFailedAction => ({
  type: REMOVE_MOVIE_FROM_SEENLIST_FAILED,
  error,
});

export const removeMovieFromSeenlist = (movieId: number): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(removeMovieFromSeenlistInProgress());

    try {
      const userData = await apiHelper.removeFromSeenlist(movieId);
      dispatch(removeMovieFromSeenlistSucceed(userData, movieId));
    } catch (error) {
      dispatch(removeMovieFromSeenlistFailed(error.message));
    }
  };
};
