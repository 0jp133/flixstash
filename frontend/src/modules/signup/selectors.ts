import { State } from '../../types';

export const selectIsLoading = (state: State) => state.signup.inProgress;

export const selectIsSuccessful = (state: State) => state.signup.isSuccessful;

export const selectError = (state: State) => state.signup.error;
