import { State } from '../../types';

export const selectIsLoading = (state: State) => state.movies.inProgress;

export const selectMovie = (movieId: number | null) => (state: State) =>
  movieId === null ? null : state.movies.movies[movieId.toString()];

export const selectError = (state: State) => state.movies.error;
