import { tokenHelper } from '../../helpers/tokenHelper';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  ILoginActionTypes,
  ILoginState,
} from './types';

const initialState: ILoginState = {
  inProgress: false,
  isSuccessful: false,
  error: null,
  token: tokenHelper.getToken(), // Restore previous token, if possible.
};

export const loginReducer = (
  state = initialState,
  action: ILoginActionTypes
): ILoginState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        inProgress: true,
        isSuccessful: false,
        error: null,
        token: null,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        inProgress: false,
        isSuccessful: true,
        error: null,
        token: action.token,
      };
    }

    case LOGIN_FAILED: {
      return {
        inProgress: false,
        isSuccessful: false,
        error: action.error,
        token: null,
      };
    }

    case LOGOUT: {
      return {
        inProgress: false,
        isSuccessful: false,
        error: null,
        token: null,
      };
    }

    default:
      return state;
  }
};
