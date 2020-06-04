import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsLoading, selectProfile, selectError } from './selectors';
import { fetchProfile } from './actions';
import { Loader } from '../../components/Loader';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const profile = useSelector(selectProfile);
  const error = useSelector(selectError);

  const memberSince = profile?.memberSince
    ? new Date(profile.memberSince)
    : null;

  useEffect(() => {
    if (!profile && !isLoading) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isLoading, profile]);

  return (
    <>
      <h2 className="title is-2">Profile</h2>

      {isLoading && <Loader />}

      {!isLoading && error && <div>Something went wrong. Try again later.</div>}

      {!isLoading && profile && (
        <>
          <div style={{ marginBottom: '1.5rem' }}>
            <b>Name</b>
            <br />
            {profile?.username}
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <b>Email</b>
            <br />
            {profile?.email}
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <b>Member since</b>
            <br />
            {memberSince ? memberSince.toLocaleDateString('en-US') : ''}
          </div>{' '}
        </>
      )}
    </>
  );
};
