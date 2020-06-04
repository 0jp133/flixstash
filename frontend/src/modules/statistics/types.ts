import { IUserStats } from 'flixstash-common/types';

/**
 * Types string constants.
 */

export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILED = 'FETCH_STATS_FAILED';

/**
 * Actions interface definitions.
 */

export interface IFetchStatsRequestAction {
  type: typeof FETCH_STATS_REQUEST;
}

export interface IFetchStatsSuccessAction {
  type: typeof FETCH_STATS_SUCCESS;
  stats: IUserStats;
}

export interface IFetchStatsFailedAction {
  type: typeof FETCH_STATS_FAILED;
  error: string;
}

export type IFetchStatsActionTypes =
  | IFetchStatsRequestAction
  | IFetchStatsSuccessAction
  | IFetchStatsFailedAction;

/**
 * Reducer state interface definitions.
 */

export interface IStatsState {
  inProgress: boolean;
  error: string | null;
  stats: IUserStats | null;
}
