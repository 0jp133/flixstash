export const genreIdToNameMap = new Map([
  [28, 'Action'],
  [12, 'Adventure'],
  [16, 'Animation'],
  [35, 'Comedy'],
  [80, 'Crime'],
  [99, 'Documentary'],
  [18, 'Drama'],
  [10751, 'Family'],
  [14, 'Fantasy'],
  [36, 'History'],
  [27, 'Horror'],
  [10402, 'Music'],
  [9648, 'Mystery'],
  [10749, 'Romance'],
  [878, 'Science Fiction'],
  [10770, 'TV Movie'],
  [53, 'Thriller'],
  [10752, 'War'],
  [37, 'Western'],
]);

/**
 * Return a map that associate all valid genre IDs to a default value.
 * @param defaultValue The default value to use in each entry.
 */
export const getGenreIdToDefaultMap = <T>(defaultValue: T) => {
  const newMap = new Map(genreIdToNameMap) as Map<number, any>;
  Array.from(newMap.keys()).map((id) => newMap.set(id, defaultValue));
  return newMap as Map<number, T>;
};
