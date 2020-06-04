/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../modules/login/actions';

export const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
    window.location.reload();
  };

  return (
    <aside className="menu">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <Link to="/my-movies">My Movies</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/recommendations">Recommendations</Link>
        </li>
        <li>
          <Link to="/statistics">Statistics</Link>
        </li>
      </ul>
      <p className="menu-label">Administration</p>
      <ul className="menu-list">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </aside>
  );
};
