import { State } from '../../types';

export const selectIsLoading = (state: State) => state.stats.inProgress;

export const selectStats = (state: State) => state.stats.stats;

export const selectError = (state: State) => state.stats.error;
