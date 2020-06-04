import { IMovieOverview } from 'flixstash-common/types';

import {
  FETCH_USER_MOVIES_REQUEST,
  FETCH_USER_MOVIES_SUCCESS,
  FETCH_USER_MOVIES_FAILED,
  IUserMoviesState,
  IFetchUserMoviesActionTypes,
} from './types';
import {
  ADD_MOVIE_TO_WATCHLIST_SUCCESS,
  ADD_MOVIE_TO_SEENLIST_SUCCESS,
  REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS,
  REMOVE_MOVIE_FROM_SEENLIST_SUCCESS,
} from '../movies/types';

const initialState: IUserMoviesState = {
  inProgress: false,
  error: null,
  filter: null,
  sort: null,
  genres: [],
  movies: {},
  totalMovies: 0,
  totalPages: 0,
};

export const userMoviesReducer = (
  state = initialState,
  action: IFetchUserMoviesActionTypes
): IUserMoviesState => {
  switch (action.type) {
    case FETCH_USER_MOVIES_REQUEST: {
      return {
        ...state,
        inProgress: true,
      };
    }

    case FETCH_USER_MOVIES_SUCCESS: {
      let newMovies: { [page: string]: IMovieOverview[] };
      if (
        state.filter === action.filter &&
        state.sort === action.sort &&
        state.genres.length === action.genres.length &&
        state.genres.every((id) => action.genres.includes(id))
      ) {
        // The filter, sort option and selected genres are the same, we append the movies that we received to the state..
        newMovies = { ...state.movies, [action.page]: action.movies };
      } else {
        // The options are different, we clear the state.
        newMovies = { [action.page]: action.movies };
      }

      return {
        ...state,
        inProgress: false,
        error: null,
        filter: action.filter,
        sort: action.sort,
        genres: action.genres,
        totalMovies: action.totalMovies,
        movies: newMovies,
        totalPages: action.totalPages,
      };
    }

    case FETCH_USER_MOVIES_FAILED: {
      return {
        inProgress: false,
        error: action.error,
        filter: null,
        sort: null,
        genres: [],
        movies: {},
        totalMovies: 0,
        totalPages: 0,
      };
    }

    case REMOVE_MOVIE_FROM_SEENLIST_SUCCESS:
    case REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS:
    case ADD_MOVIE_TO_SEENLIST_SUCCESS:
    case ADD_MOVIE_TO_WATCHLIST_SUCCESS: {
      let movie: IMovieOverview | undefined;
      let moviePageNumber: string | null = null;

      // Search for the movie we need to update in the user's movies
      for (let pageNumber in state.movies) {
        movie = state.movies[pageNumber].find((m) => m.id === action.movieId);
        if (movie) {
          moviePageNumber = pageNumber;
          break;
        }
      }

      // If the movie wasn't found in the user's movies, return the current state.
      if (moviePageNumber === null || !movie) {
        return state;
      }

      // The movie object is updated to include the user data.
      const newMovie = { ...movie, userData: action.userData };

      return {
        ...state,
        movies: {
          ...state.movies,
          [moviePageNumber]: state.movies[moviePageNumber].map((m) =>
            m.id === action.movieId ? newMovie : m
          ),
        },
      };
    }

    default:
      return state;
  }
};
