export interface IUserProfile {
  username: string;
  email: string;
  memberSince: Date;
}

export interface INewUserInformation {
  username: string;
  email: string;
  password: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface ITokenAndProfile {
  token: string;
  profile: IUserProfile;
}

export interface IUserMoviesQuery {
  page: number;
  filter: number;
  sort: number;
  genres: number[];
}

export interface IUserMoviesResult {
  movies: IMovieOverview[];
  filter: number;
  sort: number;
  genres: number[];
  page: number;
  totalMovies: number;
  totalPages: number;
}

export interface IUserMovieData {
  seen?: boolean;
  watchlist?: boolean;
}

export interface IUserStats {
  numberOfMoviesInSeenList: number;
  numberOfMoviesInWatchList: number;
  numberOfMoviesInSeenListByGenre: any;
  numberOfMoviesInWatchListByGenre: any;
  favoriteGenre: string | null;
}

export interface ISearchQuery {
  query: string;
  page: number;
}

export interface ISearchResult {
  query: string;
  page: number;
  results: IMovieOverview[];
  totalResults: number;
  totalPages: number;
}

export interface IMovieId {
  id: number;
}

export interface IMovieOverview {
  genres: string[];
  id: number;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  userData?: IUserMovieData;
}

export interface IMovie {
  backdropPath: string | null;
  budget: number;
  credits: { cast: IActor[]; crew: ICrewMember[] };
  genres: IGenre[];
  homepage: string | null;
  id: number;
  imdbId: string | null;
  keywords: { keywords: IKeyword[] };
  originalLanguage: string;
  originalTitle: string;
  overview: string | null;
  posterPath: string | null;
  productionCompanies: IProductionCompany[];
  releaseDate: string;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  title: string;
  userData?: IUserMovieData;
}

export interface IActor {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  name: string;
  order: number;
  profile_path: string | null;
}

export interface ICrewMember {
  credit_id: string;
  department: string;
  gender: number | null;
  id: number;
  job: string;
  name: string;
  profile_path: string | null;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IKeyword {
  id: number;
  name: string;
}

export interface IProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

/**
 * Full API interface.
 */

export interface IFlixstashApi {
  '/api/authentication/login': {
    post: { body: IUserCredentials; res: ITokenAndProfile };
  };
  '/api/authentication/signup': {
    post: { body: INewUserInformation };
  };
  '/api/profile': {
    get: { res: IUserProfile };
  };
  '/api/search': {
    get: { query: ISearchQuery; res: ISearchResult };
  };
  '/api/stats': {
    get: { res: IUserStats };
  };
  '/api/movie': {
    get: { query: IUserMoviesQuery; res: IUserMoviesResult };
  };
  '/api/movie/:id': {
    get: { params: IMovieId; res: IMovie };
  };
  '/api/movie/:id/seen': {
    post: { params: IMovieId; res: IUserMovieData };
    delete: { params: IMovieId; res: IUserMovieData };
  };
  '/api/movie/:id/watchlist': {
    post: { params: IMovieId; res: IUserMovieData };
    delete: { params: IMovieId; res: IUserMovieData };
  };
}
