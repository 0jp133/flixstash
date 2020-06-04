import { IMovieOverview } from 'flixstash-common/types';

import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  ISearchActionTypes,
  ISearchState,
} from './types';
import {
  ADD_MOVIE_TO_WATCHLIST_SUCCESS,
  ADD_MOVIE_TO_SEENLIST_SUCCESS,
  REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS,
  REMOVE_MOVIE_FROM_SEENLIST_SUCCESS,
} from '../movies/types';

const initialState: ISearchState = {
  query: null,
  inProgress: false,
  error: null,
  results: {},
  total_results: 0,
  total_pages: 0,
};

export const searchReducer = (
  state = initialState,
  action: ISearchActionTypes
): ISearchState => {
  switch (action.type) {
    case SEARCH_REQUEST: {
      return {
        ...state,
        inProgress: true,
      };
    }

    case SEARCH_SUCCESS: {
      let newResults: { [page: string]: IMovieOverview[] };
      if (state.query === action.query) {
        // The query is the same, we append the search results that we received to the "results" variable.
        newResults = { ...state.results, [action.page]: action.results };
      } else {
        // The query is different, we clear the "results" variable.
        newResults = { [action.page]: action.results };
      }

      return {
        ...state,
        query: action.query,
        inProgress: false,
        error: null,
        total_results: action.totalResults,
        results: newResults,
        total_pages: action.totalPages,
      };
    }

    case SEARCH_FAILED: {
      return {
        query: null,
        inProgress: false,
        error: action.error,
        results: {},
        total_results: 0,
        total_pages: 0,
      };
    }

    case REMOVE_MOVIE_FROM_SEENLIST_SUCCESS:
    case REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS:
    case ADD_MOVIE_TO_SEENLIST_SUCCESS:
    case ADD_MOVIE_TO_WATCHLIST_SUCCESS: {
      let movie: IMovieOverview | undefined;
      let moviePageNumber: string | null = null;

      // Search for the movie we need to update in the search results.
      for (let pageNumber in state.results) {
        movie = state.results[pageNumber].find((m) => m.id === action.movieId);
        if (movie) {
          moviePageNumber = pageNumber;
          break;
        }
      }

      // If the movie wasn't found in the search result, return the current state.
      if (moviePageNumber === null || !movie) {
        return state;
      }

      // The movie object is updated to include the user data.
      const newMovie = { ...movie, userData: action.userData };

      return {
        ...state,
        results: {
          ...state.results,
          [moviePageNumber]: state.results[moviePageNumber].map((m) =>
            m.id === action.movieId ? newMovie : m
          ),
        },
      };
    }

    default:
      return state;
  }
};
