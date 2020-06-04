import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="content">
        <div className="container has-text-left">
          <nav className="navbar is-transparent">
            <div className="navbar-brand">
              <Link
                className="navbar-item has-text-weight-bold has-text-dark"
                to="/"
              >
                flixstash
              </Link>
            </div>
            <div className="navbar-menu is-active">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/terms">
                Terms and conditions
              </Link>
              <Link className="navbar-item" to="/privacy">
                Privacy policy
              </Link>
              <Link className="navbar-item" to="/licenses">
                Licenses
              </Link>
            </div>
          </nav>
          <div className="is-divider"></div>
          Created by JPB. This product uses the TMDb API but is not endorsed or
          certified by TMDb.
        </div>
      </div>
    </footer>
  );
};
