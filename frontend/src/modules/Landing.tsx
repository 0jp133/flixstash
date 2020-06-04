import React from 'react';
import { Link } from 'react-router-dom';

import art_stack from '../assets/art_stack.svg';

export const Landing: React.FC = () => {
  return (
    <section className="hero is-info is-fullheight-with-navbar">
      <div className="hero-head"></div>
      <div className="hero-body">
        <div className="container has-text-left">
          <div className="columns is-vcentered reverse-column-order">
            <div className="column is-half">
              <p className="title is-1">
                Keep track of movies you've seen or want to watch
              </p>
              <p className="subtitle">Get recommendations, and more!</p>
              <Link
                to="/signup"
                className="button is-large is-danger is-rounded"
              >
                Try it now
              </Link>
            </div>
            <div className="column is-half has-text-centered">
              <img
                src={art_stack}
                alt="Stack of DVDs and other cinema related images"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
