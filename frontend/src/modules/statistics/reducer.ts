import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILED,
  IFetchStatsActionTypes,
  IStatsState,
} from './types';

const initialState: IStatsState = {
  inProgress: false,
  error: null,
  stats: null,
};

export const statsReducer = (
  state = initialState,
  action: IFetchStatsActionTypes
): IStatsState => {
  switch (action.type) {
    case FETCH_STATS_REQUEST: {
      return {
        inProgress: true,
        error: null,
        stats: null,
      };
    }

    case FETCH_STATS_SUCCESS: {
      return {
        inProgress: false,
        error: null,
        stats: action.stats,
      };
    }

    case FETCH_STATS_FAILED: {
      return {
        inProgress: false,
        error: action.error,
        stats: null,
      };
    }

    default:
      return state;
  }
};
