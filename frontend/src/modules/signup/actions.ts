import { INewUserInformation } from 'flixstash-common/types';

import { apiHelper } from '../../helpers/apiHelper';
import { ThunkResult } from '../../types';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  ISignupRequestAction,
  ISignupSuccessAction,
  ISignupFailedAction,
} from './types';

export const signupInProgress = (): ISignupRequestAction => ({
  type: SIGNUP_REQUEST,
});

export const signupSucceed = (): ISignupSuccessAction => ({
  type: SIGNUP_SUCCESS,
});

export const signupFailed = (error: string): ISignupFailedAction => ({
  type: SIGNUP_FAILED,
  error,
});

export const signup = (userInfo: INewUserInformation): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(signupInProgress());

    try {
      await apiHelper.signup(userInfo);
      dispatch(signupSucceed());
    } catch (error) {
      dispatch(signupFailed(error.message));
    }
  };
};
