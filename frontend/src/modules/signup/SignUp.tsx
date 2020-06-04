import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import cx from 'classnames';

import logo from '../../assets/logo.svg';
import { Input } from '../../components/Input';
import { signup } from './actions';
import { selectIsLoading, selectIsSuccessful, selectError } from './selectors';
import { useInputState } from '../../hooks/useInputState';
import { selectIsLoggedIn } from '../login/selectors';

export const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const [state, onChangeHandler] = useInputState({
    username: '',
    email: '',
    password: '',
  });

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const isSuccessful = useSelector(selectIsSuccessful);
  const error = useSelector(selectError);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      signup({
        username: state.username,
        email: state.email,
        password: state.password,
      })
    );
  };
  if (isLoggedIn) {
    return <Redirect to="/my-movies" />;
  } else if (isSuccessful) {
    return <Redirect to="/signup/success" />;
  } else {
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
                  <Link to="/">
                    <img
                      src={logo}
                      alt="flixstash logo"
                      style={{ marginBottom: '1em' }}
                    />
                  </Link>
                  <h1 className="title is-3">Create a new account</h1>
                  <h2 className="subtitle">
                    Start keeping track of movies you love
                  </h2>
                </div>

                {error && (
                  <div className="notification is-danger has-text-weight-bold">
                    {error}
                  </div>
                )}

                <div className="box">
                  <form onSubmit={handleSubmit}>
                    <fieldset disabled={isLoading}>
                      <Input
                        label="Username"
                        faIcon="fas fa-user"
                        type="text"
                        name="username"
                        placeholder=""
                        required={true}
                        value={state.username}
                        maxLength={50}
                        onChange={onChangeHandler}
                      />

                      <Input
                        label="Email"
                        faIcon="fas fa-envelope"
                        type="email"
                        name="email"
                        placeholder=""
                        required={true}
                        value={state.email}
                        maxLength={256}
                        onChange={onChangeHandler}
                      />

                      <Input
                        label="Password (6 or more characters)"
                        faIcon="fas fa-key"
                        type="password"
                        name="password"
                        placeholder=""
                        required={true}
                        minLength={6}
                        value={state.password}
                        onChange={onChangeHandler}
                      />

                      <div className="field">
                        <p className="is-size-7">
                          By clicking Join, you agree to our{' '}
                          <Link to="/terms" target="_blank">
                            Terms
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" target="_blank">
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </div>

                      <div className="field">
                        <div className="control">
                          <button
                            className={cx('button is-medium is-danger', {
                              'is-loading': isLoading,
                            })}
                          >
                            Join
                          </button>
                        </div>
                      </div>

                      <div className="field">
                        <p className="is-size-6 has-text-weight-semibold">
                          Already on flixstash? <Link to="/login">Log in</Link>
                        </p>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
