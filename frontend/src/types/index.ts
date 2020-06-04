import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { ISignupState } from '../modules/signup/types';
import { ILoginState } from '../modules/login/types';
import { IProfileState } from '../modules/profile/types';
import { ISearchState } from '../modules/search/types';
import { IMoviesState } from '../modules/movies/types';
import { IUserMoviesState } from '../modules/my-movies/types';
import { IStatsState } from '../modules/statistics/types';

export interface State {
  signup: ISignupState;
  login: ILoginState;
  profile: IProfileState;
  search: ISearchState;
  movies: IMoviesState;
  userMovies: IUserMoviesState;
  stats: IStatsState;
}

export type Dispatch = ThunkDispatch<State, undefined, Action<string>>;
export type ThunkResult<R> = ThunkAction<R, State, undefined, Action<string>>;
