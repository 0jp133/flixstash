import { State } from '../../types';
import { FilterOption } from './FilterOption';
import { SortOption } from './SortOption';

export const selectIsLoading = (state: State) => state.userMovies.inProgress;

export const selectUserMoviesPage = (
  page: number,
  filter: FilterOption,
  sort: SortOption,
  genres: number[]
) => (state: State) => {
  if (
    state.userMovies.filter !== filter ||
    state.userMovies.sort !== sort ||
    state.userMovies.genres.length !== genres.length ||
    state.userMovies.genres.some((id) => !genres.includes(id))
  ) {
    return null;
  } else {
    return state.userMovies.movies[page];
  }
};

export const selectTotalPages = (state: State) => state.userMovies.totalPages;

export const selectTotalMovies = (state: State) => state.userMovies.totalMovies;

export const selectError = (state: State) => state.userMovies.error;
