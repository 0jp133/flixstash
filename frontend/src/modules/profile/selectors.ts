import { State } from '../../types';

export const selectIsLoading = (state: State) => state.profile.inProgress;

export const selectProfile = (state: State) => state.profile.profile;

export const selectError = (state: State) => state.profile.error;
