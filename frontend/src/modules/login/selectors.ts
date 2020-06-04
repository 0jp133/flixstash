import { State } from '../../types';

export const selectIsLoggedIn = (state: State) =>
  state.login.token ? true : false;

export const selectIsLoading = (state: State) => state.login.inProgress;

export const selectIsSuccessful = (state: State) => state.login.isSuccessful;

export const selectError = (state: State) => state.login.error;
