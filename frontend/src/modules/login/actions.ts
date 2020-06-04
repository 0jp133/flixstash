import { IUserCredentials } from 'flixstash-common/types';

import { apiHelper } from '../../helpers/apiHelper';
import { ThunkResult } from '../../types';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  ILoginRequestAction,
  ILoginSuccessAction,
  ILoginFailedAction,
  ILogoutAction,
} from './types';
import { fetchProfileSucceed } from '../profile/actions';

export const loginInProgress = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const loginSucceed = (token: string): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  token,
});

export const loginFailed = (error: string): ILoginFailedAction => ({
  type: LOGIN_FAILED,
  error,
});

export const login = (userInfo: IUserCredentials): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(loginInProgress());

    try {
      const { profile, token } = await apiHelper.login(userInfo);

      dispatch(fetchProfileSucceed(profile));
      dispatch(loginSucceed(token));
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
};

export const logout = (): ThunkResult<void> => {
  return (dispatch, getState) => {
    apiHelper.logout();
    dispatch<ILogoutAction>({
      type: LOGOUT,
    });
    window.location.reload();
  };
};
