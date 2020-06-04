import { IUserStats } from 'flixstash-common/types';

import { apiHelper } from '../../helpers/apiHelper';
import { ThunkResult } from '../../types';
import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILED,
  IFetchStatsRequestAction,
  IFetchStatsSuccessAction,
  IFetchStatsFailedAction,
} from './types';

export const fetchStatsInProgress = (): IFetchStatsRequestAction => ({
  type: FETCH_STATS_REQUEST,
});

export const fetchStatsSucceed = (
  stats: IUserStats
): IFetchStatsSuccessAction => ({
  type: FETCH_STATS_SUCCESS,
  stats,
});

export const fetchStatsFailed = (error: string): IFetchStatsFailedAction => ({
  type: FETCH_STATS_FAILED,
  error,
});

export const fetchStats = (): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(fetchStatsInProgress());

    try {
      const stats = await apiHelper.getStats();
      dispatch(fetchStatsSucceed(stats));
    } catch (error) {
      dispatch(fetchStatsFailed(error.message));
    }
  };
};
