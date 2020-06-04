import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import cx from 'classnames';

import logo from '../../assets/logo-inv.svg';
import { Input } from '../../components/Input';
import { login } from './actions';
import { selectIsLoading, selectIsSuccessful, selectError } from './selectors';
import { useInputState } from '../../hooks/useInputState';

export const LogIn: React.FC = () => {
  const dispatch = useDispatch();

  const [state, onChangeHandler] = useInputState({ email: '', password: '' });

  const isLoading = useSelector(selectIsLoading);
  const isSuccessful = useSelector(selectIsSuccessful);
  const error = useSelector(selectError);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      login({
        email: state.email,
        password: state.password,
      })
    );
  };

  if (isSuccessful) {
    return <Redirect to="/my-movies" />;
  } else {
    return (
      <section className="hero is-light is-fullheight">
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
                  <h1 className="title is-3">Welcome back</h1>
                  <h2 className="subtitle">What have you watched recently?</h2>
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
                        label="Password"
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
                        <div className="control">
                          <button
                            className={cx('button is-medium is-info', {
                              'is-loading': isLoading,
                            })}
                          >
                            Log in
                          </button>
                        </div>
                      </div>

                      <div className="field">
                        <p className="is-size-6 has-text-weight-semibold">
                          New to flixstash? <Link to="/signup">Sign up</Link>
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
