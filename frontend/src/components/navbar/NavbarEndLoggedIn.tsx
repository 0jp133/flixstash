/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../modules/login/actions';
import {
  selectIsLoading,
  selectProfile,
} from '../../modules/profile/selectors';
import { fetchProfile } from '../../modules/profile/actions';

export const NavbarEndLoggedIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(selectIsLoading);
  const profile = useSelector(selectProfile);

  useEffect(() => {
    if (!profile && !isLoading) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isLoading, profile]);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
    window.location.reload();
  };

  return (
    <>
      <Link to="/my-movies" className="navbar-item">
        <span className="icon">
          <i className="fas fa-home"></i>
        </span>
        <span>My Movies</span>
      </Link>
      <Link to="/profile" className="navbar-item">
        <span className="icon">
          <i className="fas fa-user"></i>
        </span>
        <span>{profile ? profile.username : ''}</span>
      </Link>
      <a className="navbar-item" onClick={handleLogout}>
        <span className="icon">
          <i className="fas fa-sign-out-alt"></i>
        </span>
        <span>Logout</span>
      </a>
    </>
  );
};
