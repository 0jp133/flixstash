import { IMovieOverview } from 'flixstash-common/types';

import {
  IAddMovieToWatchlistSuccessAction,
  IAddMovieToSeenlistSuccessAction,
  IRemoveMovieFromWatchlistSuccessAction,
  IRemoveMovieFromSeenlistSuccessAction,
} from '../movies/types';

/**
 * Types string constants.
 */

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILED = 'SEARCH_FAILED';

/**
 * Actions interface definitions.
 */

export interface ISearchRequestAction {
  type: typeof SEARCH_REQUEST;
}

export interface ISearchSuccessAction {
  type: typeof SEARCH_SUCCESS;
  query: string;
  page: number;
  results: IMovieOverview[];
  totalResults: number;
  totalPages: number;
}

export interface ISearchFailedAction {
  type: typeof SEARCH_FAILED;
  error: string;
}

export type ISearchActionTypes =
  | ISearchRequestAction
  | ISearchSuccessAction
  | ISearchFailedAction
  | IAddMovieToWatchlistSuccessAction
  | IAddMovieToSeenlistSuccessAction
  | IRemoveMovieFromWatchlistSuccessAction
  | IRemoveMovieFromSeenlistSuccessAction;

/**
 * Reducer state interface definitions.
 */

export interface ISearchState {
  query: string | null;
  inProgress: boolean;
  error: string | null;
  results: { [page: string]: IMovieOverview[] };
  total_results: number;
  total_pages: number;
}
