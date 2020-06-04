import { LayoutOption } from '../components/layout/LayoutOption';
import { genreIdToNameMap } from '../modules/my-movies/genres';
import { FilterOption } from '../modules/my-movies/FilterOption';
import { SortOption } from '../modules/my-movies/SortOption';

/**
 * Functions for parsing parameters found in query strings.
 */

/**
 * Parse a string as a layout option. Can be "grid" or "list".
 * Can return null if the given string is not a valid layout option.
 * @param option The string to parse.
 */
export const parseLayoutOption = (
  option: string | null
): LayoutOption | null => {
  if (!option) {
    return null;
  }

  if (option && option.toLowerCase() === 'grid') {
    return LayoutOption.Grid;
  } else if (option && option.toLowerCase() === 'list') {
    return LayoutOption.List;
  } else {
    return null;
  }
};

/**
 * Parse a string as a page number.
 * Can return null if the given string is not a valid page number.
 * @param page The string to parse.
 * @param min The lowest acceptable page number.
 * @param max The highest acceptable page number.
 */
export const parsePageNumber = (
  page: string | null,
  min: number,
  max: number
): number | null => {
  if (!page) {
    return null;
  }

  const parsedPageNumber = parseInt(page);

  if (
    isNaN(parsedPageNumber) ||
    parsedPageNumber < min ||
    parsedPageNumber > max
  ) {
    return null;
  } else {
    return parsedPageNumber;
  }
};

/**
 * Parse a string as a filter option. Can be "all", "watch" or "seen".
 * Can return null if the given string is not a valid filter option.
 * @param filter The string to parse.
 */
export const parseFilter = (filter: string | null): FilterOption | null => {
  if (!filter) {
    return null;
  }

  if (filter.toLowerCase() === 'all') {
    return FilterOption.All;
  } else if (filter.toLowerCase() === 'watch') {
    return FilterOption.Watchlist;
  } else if (filter.toLowerCase() === 'seen') {
    return FilterOption.Seenlist;
  } else {
    return null;
  }
};

/**
 * Parse a string as a sort option. Can be "title" or "release_date".
 * Can return null if the given string is not a valid sort option.
 * @param sort The string to parse.
 */
export const parseSort = (sort: string | null): SortOption | null => {
  if (!sort) {
    return null;
  }

  if (sort.toLowerCase() === 'title') {
    return SortOption.Title;
  } else if (sort.toLowerCase() === 'release_date') {
    return SortOption.ReleaseDate;
  } else {
    return null;
  }
};

/**
 * Parse a string as a comma separated list of movie genre IDs.
 * This function ignores any invalid or unknown genre IDs.
 * Can return null if the given string is not a valid genre list.
 * @param genres The string to parse. Can be empty.
 */
export const parseGenres = (genres: string | null): number[] | null => {
  if (genres === null || genres === undefined) {
    return null;
  }

  return genres
    .split(',')
    .map((s) => parseInt(s))
    .filter((id) => !isNaN(id))
    .filter((id) => genreIdToNameMap.has(id));
};
