import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  IFetchProfileActionTypes,
  IProfileState,
} from './types';

const initialState: IProfileState = {
  inProgress: false,
  error: null,
  profile: null,
};

export const profileReducer = (
  state = initialState,
  action: IFetchProfileActionTypes
): IProfileState => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST: {
      return {
        inProgress: true,
        error: null,
        profile: null,
      };
    }

    case FETCH_PROFILE_SUCCESS: {
      return {
        inProgress: false,
        error: null,
        profile: action.profile,
      };
    }

    case FETCH_PROFILE_FAILED: {
      return {
        inProgress: false,
        error: action.error,
        profile: null,
      };
    }

    default:
      return state;
  }
};
