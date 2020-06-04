import { IUserProfile } from 'flixstash-common/types';

import { apiHelper } from '../../helpers/apiHelper';
import { ThunkResult } from '../../types';
import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  IFetchProfileRequestAction,
  IFetchProfileSuccessAction,
  IFetchProfileFailedAction,
} from './types';

export const fetchProfileInProgress = (): IFetchProfileRequestAction => ({
  type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSucceed = (
  profile: IUserProfile
): IFetchProfileSuccessAction => ({
  type: FETCH_PROFILE_SUCCESS,
  profile,
});

export const fetchProfileFailed = (
  error: string
): IFetchProfileFailedAction => ({
  type: FETCH_PROFILE_FAILED,
  error,
});

export const fetchProfile = (): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch(fetchProfileInProgress());

    try {
      const profile = await apiHelper.getProfile();
      dispatch(fetchProfileSucceed(profile));
    } catch (error) {
      dispatch(fetchProfileFailed(error.message));
    }
  };
};
