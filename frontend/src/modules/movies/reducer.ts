import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILED,
  IFetchMovieActionTypes,
  IMoviesState,
  ADD_MOVIE_TO_WATCHLIST_SUCCESS,
  ADD_MOVIE_TO_SEENLIST_SUCCESS,
  REMOVE_MOVIE_FROM_SEENLIST_SUCCESS,
  REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS,
} from './types';

const initialState: IMoviesState = {
  inProgress: false,
  movies: {},
  error: null,
};

export const moviesReducer = (
  state = initialState,
  action: IFetchMovieActionTypes
): IMoviesState => {
  switch (action.type) {
    case FETCH_MOVIE_REQUEST: {
      return { ...state, inProgress: true };
    }

    case FETCH_MOVIE_SUCCESS: {
      return {
        inProgress: false,
        movies: { ...state.movies, [action.movie.id]: action.movie },
        error: null,
      };
    }

    case FETCH_MOVIE_FAILED: {
      return { ...state, inProgress: false, error: action.error };
    }

    case REMOVE_MOVIE_FROM_SEENLIST_SUCCESS:
    case REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS:
    case ADD_MOVIE_TO_SEENLIST_SUCCESS:
    case ADD_MOVIE_TO_WATCHLIST_SUCCESS: {
      if (!state.movies[action.movieId]) {
        // If the movie doesn't exists in the state, return the current state.
        return state;
      } else {
        return {
          ...state,
          movies: {
            ...state.movies,
            [action.movieId]: {
              ...state.movies[action.movieId],
              userData: action.userData,
            },
          },
        };
      }
    }

    default:
      return state;
  }
};
