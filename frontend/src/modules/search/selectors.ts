import { State } from '../../types';

export const selectIsLoading = (state: State) => state.search.inProgress;

export const selectSearchQuery = (state: State) => state.search.query;

export const selectResultsPage = (query: string | null, page: number) => (
  state: State
) => {
  if (!query || state.search.query !== query) {
    return null;
  } else {
    return state.search.results[page];
  }
};

export const selectTotalPages = (state: State) => state.search.total_pages;

export const selectTotalResults = (state: State) => state.search.total_results;

export const selectError = (state: State) => state.search.error;
