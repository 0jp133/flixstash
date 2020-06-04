/**
 * Types string constants.
 */

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

/**
 * Actions interface definitions.
 */

export interface ISignupRequestAction {
  type: typeof SIGNUP_REQUEST;
}

export interface ISignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
}

export interface ISignupFailedAction {
  type: typeof SIGNUP_FAILED;
  error: string;
}

export type ISignupActionTypes =
  | ISignupRequestAction
  | ISignupSuccessAction
  | ISignupFailedAction;

/**
 * Reducer state interface definitions.
 */

export interface ISignupState {
  inProgress: boolean;
  isSuccessful: boolean;
  error: string | null;
}
