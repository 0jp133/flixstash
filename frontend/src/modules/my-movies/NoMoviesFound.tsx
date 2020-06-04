import React from 'react';
import { Link } from 'react-router-dom';

export const NoMoviesFound: React.FC = () => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
    }}
  >
    <span
      className="icon is-large has-text-grey-light"
      style={{ marginBottom: '1em' }}
    >
      <i className="far fa-4x fa-frown"></i>
    </span>
    <div>
      No movies found for the given criteria.
      <br /> <Link to="/search">Click here</Link> to search for movies.
    </div>
  </div>
);
