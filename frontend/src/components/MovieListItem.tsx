import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMovieOverview } from 'flixstash-common/types';

import {
  addMovieToWatchlist,
  addMovieToSeenlist,
  removeMovieFromWatchlist,
  removeMovieFromSeenlist,
} from '../modules/movies/actions';

interface IComponentProps {
  /**
   * The movie's overview to display in the list item.
   */
  movie: IMovieOverview;
}

export const MovieListItem: React.FC<IComponentProps> = (props) => {
  const { movie } = props;

  const dispatch = useDispatch();

  const movieReleaseDate = movie.releaseDate
    ? new Date(movie.releaseDate)
    : null;

  const addToWatchlist = () => {
    dispatch(addMovieToWatchlist(movie.id));
  };

  const removeFromWatchlist = () => {
    dispatch(removeMovieFromWatchlist(movie.id));
  };

  const addToSeenlist = () => {
    dispatch(addMovieToSeenlist(movie.id));
  };

  const removeFromSeenlist = () => {
    dispatch(removeMovieFromSeenlist(movie.id));
  };

  return (
    <tr>
      <td>
        <Link className="has-text-weight-bold" to={`/movie/${movie.id}`}>
          {movie.title}
        </Link>
      </td>
      <td>
        {movieReleaseDate && movieReleaseDate.toLocaleDateString('en-US')}
      </td>
      <td>{movie.genres.join(', ')}</td>
      <td>
        <div className="buttons">
          <button
            className="button is-small is-danger"
            onClick={movie.userData?.seen ? removeFromSeenlist : addToSeenlist}
          >
            <span
              className="icon"
              title={movie.userData?.seen ? 'Remove from seen list' : 'Seen it'}
              key={movie.id + (movie.userData?.seen ? '_r' : '_a')}
            >
              <i
                className={
                  movie.userData?.seen ? 'fas fa-eye-slash' : 'far fa-eye'
                }
              ></i>
            </span>
          </button>
          <button
            className="button is-small is-danger"
            onClick={
              movie.userData?.watchlist ? removeFromWatchlist : addToWatchlist
            }
          >
            <span
              className="icon"
              title={
                movie.userData?.watchlist
                  ? 'Remove from watch list'
                  : 'Add to watch list'
              }
              key={movie.id + (movie.userData?.watchlist ? '_r' : '_a')}
            >
              <i
                className={
                  movie.userData?.watchlist
                    ? 'fas fa-bookmark'
                    : 'far fa-bookmark'
                }
              ></i>
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};
