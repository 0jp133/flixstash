/**
 * Types string constants.
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

/**
 * Actions interface definitions.
 */

export interface ILoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  token: string;
}

export interface ILoginFailedAction {
  type: typeof LOGIN_FAILED;
  error: string;
}

export interface ILogoutAction {
  type: typeof LOGOUT;
}

export type ILoginActionTypes =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutAction;

/**
 * Reducer state interface definitions.
 */

export interface ILoginState {
  inProgress: boolean;
  isSuccessful: boolean;
  error: string | null;
  token: string | null;
}
