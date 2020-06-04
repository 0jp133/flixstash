import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsLoading, selectStats, selectError } from './selectors';
import { fetchStats } from './actions';
import { Loader } from '../../components/Loader';

export const Statistics: React.FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const stats = useSelector(selectStats);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <>
      <h2 className="title is-2">Statistics</h2>

      {isLoading && <Loader />}

      {!isLoading && error && <div>Something went wrong. Try again later.</div>}

      {!isLoading && stats && (
        <>
          <div className="is-divider"></div>

          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <span className="icon is-large">
                  <i className="far fa-eye fa-2x"></i>
                </span>
                <p className="title has-text-danger">
                  {stats.numberOfMoviesInSeenList}
                </p>
                <p className="heading">Movies you've seen</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <span className="icon is-large">
                  <i className="far fa-bookmark fa-2x"></i>
                </span>
                <p className="title has-text-danger">
                  {stats.numberOfMoviesInWatchList}
                </p>
                <p className="heading">Movies you want to watch</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <span className="icon is-large">
                  <i className="fas fa-film fa-2x"></i>
                </span>
                <p className="title has-text-danger">
                  {stats.favoriteGenre ? stats.favoriteGenre : '-'}
                </p>
                <p className="heading">Favorite genre</p>
              </div>
            </div>
          </nav>

          <div className="is-divider"></div>

          <div className="columns">
            <div className="column">
              <h4 className="title is-4">Movies you've seen by genre</h4>
              <table className="table is-fullwidth">
                <tbody>
                  {Array.from(
                    Object.entries(stats.numberOfMoviesInSeenListByGenre)
                  ).map(([genreName, numberOfMovies]) => (
                    <tr key={genreName}>
                      <td className="has-text-weight-bold">{genreName}</td>
                      <td>{numberOfMovies as number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="column">
              <h4 className="title is-4">Movies in your watch list by genre</h4>
              <table className="table is-fullwidth">
                <tbody>
                  {Array.from(
                    Object.entries(stats.numberOfMoviesInWatchListByGenre)
                  ).map(([genreName, numberOfMovies]) => (
                    <tr key={genreName}>
                      <td className="has-text-weight-bold">{genreName}</td>
                      <td>{numberOfMovies as number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
