import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  ISignupActionTypes,
  ISignupState,
} from './types';

const initialState: ISignupState = {
  inProgress: false,
  isSuccessful: false,
  error: null,
};

export const signupReducer = (
  state = initialState,
  action: ISignupActionTypes
): ISignupState => {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return { inProgress: true, isSuccessful: false, error: null };
    }

    case SIGNUP_SUCCESS: {
      return { inProgress: false, isSuccessful: true, error: null };
    }

    case SIGNUP_FAILED: {
      return {
        inProgress: false,
        isSuccessful: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};
