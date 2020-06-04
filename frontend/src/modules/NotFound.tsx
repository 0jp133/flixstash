import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-head"></div>
      <div className="hero-body">
        <div className="container">
          <div className="container has-text-centered">
            <h1 className="title is-1">404</h1>
            <h2 className="subtitle">Page not found</h2>
            <span className="icon" style={{ marginTop: '4em', marginBottom: '6em' }}>
              <i className="far fa-10x fa-frown"></i>
            </span>
            <div>
              <Link to="/" className="button">
                Return to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
