import {
  IUserMoviesResult,
  IUserMoviesQuery,
} from 'flixstash-common/types';

import { apiHelper } from '../../helpers/apiHelper';
import { ThunkResult } from '../../types';
import {
  FETCH_USER_MOVIES_REQUEST,
  FETCH_USER_MOVIES_SUCCESS,
  FETCH_USER_MOVIES_FAILED,
  IFetchUserMoviesRequestAction,
  IFetchUserMoviesSuccessAction,
  IFetchUserMoviesFailedAction,
} from './types';

export const fetchUserMoviesInProgress = (): IFetchUserMoviesRequestAction => ({
  type: FETCH_USER_MOVIES_REQUEST,
});

export const fetchUserMoviesSucceed = (
  userMoviesResponse: IUserMoviesResult
): IFetchUserMoviesSuccessAction => ({
  type: FETCH_USER_MOVIES_SUCCESS,
  page: userMoviesResponse.page,
  filter: userMoviesResponse.filter,
  sort: userMoviesResponse.sort,
  genres: userMoviesResponse.genres,
  movies: userMoviesResponse.movies,
  totalMovies: userMoviesResponse.totalMovies,
  totalPages: userMoviesResponse.totalPages,
});

export const fetchUserMoviesFailed = (
  error: string
): IFetchUserMoviesFailedAction => ({
  type: FETCH_USER_MOVIES_FAILED,
  error,
});

export const fetchUserMovies = (
  userMoviesQuery: IUserMoviesQuery
): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(fetchUserMoviesInProgress());

    try {
      const userMoviesResponse = await apiHelper.getUserMovies(userMoviesQuery);

      dispatch(fetchUserMoviesSucceed(userMoviesResponse));
    } catch (error) {
      dispatch(fetchUserMoviesFailed(error.message));
    }
  };
};
