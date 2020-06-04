import { IMovieOverview } from 'flixstash-common/types';
import {
  IAddMovieToWatchlistSuccessAction,
  IAddMovieToSeenlistSuccessAction,
  IRemoveMovieFromWatchlistSuccessAction,
  IRemoveMovieFromSeenlistSuccessAction,
} from '../movies/types';
import { FilterOption } from './FilterOption';
import { SortOption } from './SortOption';

/**
 * Types string constants.
 */

export const FETCH_USER_MOVIES_REQUEST = 'FETCH_USER_MOVIES_REQUEST';
export const FETCH_USER_MOVIES_SUCCESS = 'FETCH_USER_MOVIES_SUCCESS';
export const FETCH_USER_MOVIES_FAILED = 'FETCH_USER_MOVIES_FAILED';

/**
 * Actions interface definitions.
 */

export interface IFetchUserMoviesRequestAction {
  type: typeof FETCH_USER_MOVIES_REQUEST;
}

export interface IFetchUserMoviesSuccessAction {
  type: typeof FETCH_USER_MOVIES_SUCCESS;
  page: number;
  filter: FilterOption;
  sort: SortOption;
  genres: number[];
  movies: IMovieOverview[];
  totalMovies: number;
  totalPages: number;
}

export interface IFetchUserMoviesFailedAction {
  type: typeof FETCH_USER_MOVIES_FAILED;
  error: string;
}

export type IFetchUserMoviesActionTypes =
  | IFetchUserMoviesRequestAction
  | IFetchUserMoviesSuccessAction
  | IFetchUserMoviesFailedAction
  | IAddMovieToWatchlistSuccessAction
  | IAddMovieToSeenlistSuccessAction
  | IRemoveMovieFromWatchlistSuccessAction
  | IRemoveMovieFromSeenlistSuccessAction;

/**
 * Reducer state interface definitions.
 */

export interface IUserMoviesState {
  inProgress: boolean;
  error: string | null;
  filter: FilterOption | null;
  sort: SortOption | null;
  genres: number[];
  movies: { [page: string]: IMovieOverview[] };
  totalMovies: number;
  totalPages: number;
}
