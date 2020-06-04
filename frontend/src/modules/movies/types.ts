import { IMovie, IUserMovieData } from 'flixstash-common/types';

/**
 * Types string constants.
 */

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILED = 'FETCH_MOVIE_FAILED';

export const ADD_MOVIE_TO_WATCHLIST_REQUEST = 'ADD_MOVIE_TO_WATCHLIST_REQUEST';
export const ADD_MOVIE_TO_WATCHLIST_SUCCESS = 'ADD_MOVIE_TO_WATCHLIST_SUCCESS';
export const ADD_MOVIE_TO_WATCHLIST_FAILED = 'ADD_MOVIE_TO_WATCHLIST_FAILED';

export const ADD_MOVIE_TO_SEENLIST_REQUEST = 'ADD_MOVIE_TO_SEENLIST_REQUEST';
export const ADD_MOVIE_TO_SEENLIST_SUCCESS = 'ADD_MOVIE_TO_SEENLIST_SUCCESS';
export const ADD_MOVIE_TO_SEENLIST_FAILED = 'ADD_MOVIE_TO_SEENLIST_FAILED';

export const REMOVE_MOVIE_FROM_WATCHLIST_REQUEST =
  'REMOVE_MOVIE_FROM_WATCHLIST_REQUEST';
export const REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS =
  'REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS';
export const REMOVE_MOVIE_FROM_WATCHLIST_FAILED =
  'REMOVE_MOVIE_FROM_WATCHLIST_FAILED';

export const REMOVE_MOVIE_FROM_SEENLIST_REQUEST =
  'REMOVE_MOVIE_FROM_SEENLIST_REQUEST';
export const REMOVE_MOVIE_FROM_SEENLIST_SUCCESS =
  'REMOVE_MOVIE_FROM_SEENLIST_SUCCESS';
export const REMOVE_MOVIE_FROM_SEENLIST_FAILED =
  'REMOVE_MOVIE_FROM_SEENLIST_FAILED';

/**
 * Actions interface definitions.
 */

export interface IFetchMovieRequestAction {
  type: typeof FETCH_MOVIE_REQUEST;
}

export interface IFetchMovieSuccessAction {
  type: typeof FETCH_MOVIE_SUCCESS;
  movie: IMovie;
}

export interface IFetchMovieFailedAction {
  type: typeof FETCH_MOVIE_FAILED;
  error: string;
}

//

export interface IAddMovieToWatchlistRequestAction {
  type: typeof ADD_MOVIE_TO_WATCHLIST_REQUEST;
}

export interface IAddMovieToWatchlistSuccessAction {
  type: typeof ADD_MOVIE_TO_WATCHLIST_SUCCESS;
  userData: IUserMovieData;
  movieId: number;
}

export interface IAddMovieToWatchlistFailedAction {
  type: typeof ADD_MOVIE_TO_WATCHLIST_FAILED;
  error: string;
}

//

export interface IAddMovieToSeenlistRequestAction {
  type: typeof ADD_MOVIE_TO_SEENLIST_REQUEST;
}

export interface IAddMovieToSeenlistSuccessAction {
  type: typeof ADD_MOVIE_TO_SEENLIST_SUCCESS;
  userData: IUserMovieData;
  movieId: number;
}

export interface IAddMovieToSeenlistFailedAction {
  type: typeof ADD_MOVIE_TO_SEENLIST_FAILED;
  error: string;
}

//

export interface IRemoveMovieFromWatchlistRequestAction {
  type: typeof REMOVE_MOVIE_FROM_WATCHLIST_REQUEST;
}

export interface IRemoveMovieFromWatchlistSuccessAction {
  type: typeof REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS;
  userData: IUserMovieData;
  movieId: number;
}

export interface IRemoveMovieFromWatchlistFailedAction {
  type: typeof REMOVE_MOVIE_FROM_WATCHLIST_FAILED;
  error: string;
}

//

export interface IRemoveMovieFromSeenlistRequestAction {
  type: typeof REMOVE_MOVIE_FROM_SEENLIST_REQUEST;
}

export interface IRemoveMovieFromSeenlistSuccessAction {
  type: typeof REMOVE_MOVIE_FROM_SEENLIST_SUCCESS;
  userData: IUserMovieData;
  movieId: number;
}

export interface IRemoveMovieFromSeenlistFailedAction {
  type: typeof REMOVE_MOVIE_FROM_SEENLIST_FAILED;
  error: string;
}

//

export type IFetchMovieActionTypes =
  | IFetchMovieRequestAction
  | IFetchMovieSuccessAction
  | IFetchMovieFailedAction
  | IAddMovieToWatchlistRequestAction
  | IAddMovieToWatchlistSuccessAction
  | IAddMovieToWatchlistFailedAction
  | IAddMovieToSeenlistRequestAction
  | IAddMovieToSeenlistSuccessAction
  | IAddMovieToSeenlistFailedAction
  | IRemoveMovieFromWatchlistRequestAction
  | IRemoveMovieFromWatchlistSuccessAction
  | IRemoveMovieFromWatchlistFailedAction
  | IRemoveMovieFromSeenlistRequestAction
  | IRemoveMovieFromSeenlistSuccessAction
  | IRemoveMovieFromSeenlistFailedAction;

/**
 * Reducer state interface definitions.
 */

export interface IMoviesState {
  inProgress: boolean;
  movies: { [id: string]: IMovie };
  error: string | null;
}
