import { ISearchQuery, ISearchResult } from 'flixstash-common/types';

import { apiHelper } from '../../helpers/apiHelper';
import { ThunkResult } from '../../types';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  ISearchRequestAction,
  ISearchSuccessAction,
  ISearchFailedAction,
} from './types';

export const searchInProgress = (): ISearchRequestAction => ({
  type: SEARCH_REQUEST,
});

export const searchSucceed = (
  searchReponse: ISearchResult
): ISearchSuccessAction => ({
  type: SEARCH_SUCCESS,
  query: searchReponse.query,
  page: searchReponse.page,
  results: searchReponse.results,
  totalPages: searchReponse.totalPages,
  totalResults: searchReponse.totalResults,
});

export const searchFailed = (error: string): ISearchFailedAction => ({
  type: SEARCH_FAILED,
  error,
});

export const search = (searchRequest: ISearchQuery): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(searchInProgress());

    try {
      const searchReponse = await apiHelper.search(searchRequest);

      dispatch(searchSucceed(searchReponse));
    } catch (error) {
      dispatch(searchFailed(error.message));
    }
  };
};
