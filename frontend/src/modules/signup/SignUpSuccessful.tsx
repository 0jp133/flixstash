import React from 'react';
import { Link } from 'react-router-dom';

export const SignUpSuccessful: React.FC = () => {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-head"></div>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered ">
            <div className="column is-half is-offset-one-quarter">
              <div
                className="container has-text-centered"
                style={{ marginBottom: '3em' }}
              >
                <h1 className="title is-3">Sign up complete!</h1>
                <h2 className="subtitle">Welcome to flixstash!</h2>
                <span className="icon" style={{ marginTop: '3em' }}>
                  <i className="fas fa-10x fa-check"></i>
                </span>
                <div>
                  <Link to="/login" className="button">
                    Log in to your account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
