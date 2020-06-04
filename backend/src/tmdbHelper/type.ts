/**
 * Types for The Movie Database (TMDb) API.
 */

/**
 * Response to "GET /search/movie".
 * https://developers.themoviedb.org/3/search/search-movies
 */
export interface ITMDbSearchResults {
  page: number;
  total_results: number;
  results: ITMDbSearchMovieResult[];
  total_pages: number;
}

export interface ITMDbSearchMovieResult {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

/**
 * Response to "GET /movie/{movie_id}" with option "append_to_response=keywords,credits".
 * https://developers.themoviedb.org/3/movies/get-movie-details
 */
export interface ITMDbMovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  credits: { cast: ITMDbActor[]; crew: ITMDbCrewMember[] };
  genres: ITMDbGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  keywords: { keywords: ITMDbKeyword[] };
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ITMDbProductionCompany[];
  production_countries: ITMDbProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: ITMDbSpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITMDbActor {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  name: string;
  order: number;
  profile_path: string | null;
}

export interface ITMDbCrewMember {
  credit_id: string;
  department: string;
  gender: number | null;
  id: number;
  job: string;
  name: string;
  profile_path: string | null;
}

export interface ITMDbGenre {
  id: number;
  name: string;
}

export interface ITMDbKeyword {
  id: number;
  name: string;
}

export interface ITMDbProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface ITMDbProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ITMDbSpokenLanguage {
  iso_639_1: string;
  name: string;
}
