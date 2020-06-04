import { IUserProfile } from 'flixstash-common/types';

/**
 * Types string constants.
 */

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILED = 'FETCH_PROFILE_FAILED';

/**
 * Actions interface definitions.
 */

export interface IFetchProfileRequestAction {
  type: typeof FETCH_PROFILE_REQUEST;
}

export interface IFetchProfileSuccessAction {
  type: typeof FETCH_PROFILE_SUCCESS;
  profile: IUserProfile;
}

export interface IFetchProfileFailedAction {
  type: typeof FETCH_PROFILE_FAILED;
  error: string;
}

export type IFetchProfileActionTypes =
  | IFetchProfileRequestAction
  | IFetchProfileSuccessAction
  | IFetchProfileFailedAction;

/**
 * Reducer state interface definitions.
 */

export interface IProfileState {
  inProgress: boolean;
  error: string | null;
  profile: IUserProfile | null;
}
