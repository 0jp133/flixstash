import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarEndLoggedOut: React.FC = () => {
  return (
    <div className="navbar-item">
      <div className="buttons">
        <Link to="/signup" className="button is-light">
          Sign up
        </Link>
        <Link to="/login" className="button is-light">
          Log in
        </Link>
      </div>
    </div>
  );
};
