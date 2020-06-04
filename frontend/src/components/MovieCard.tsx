/* eslint-disable jsx-a11y/anchor-is-valid */
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
   * The movie's overview to display in the card.
   */
  movie: IMovieOverview;

  /**
   * The width (in pixel) of the movie's poster.
   */
  posterWidthInPx: number;

  /**
   * The height (in pixel) of the movie's poster.
   */
  posterHeightInPx: number;
}

export const MovieCard: React.FC<IComponentProps> = (props) => {
  const { movie, posterWidthInPx, posterHeightInPx } = props;

  const dispatch = useDispatch();

  const posterWidth = posterWidthInPx.toString() + 'px';
  const posterHeight = posterHeightInPx.toString() + 'px';

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

  const poster = () => {
    if (movie.posterPath) {
      return (
        <div
          className="card-image is-poster"
          style={{
            width: posterWidth,
            height: posterHeight,
            overflow: 'hidden',
          }}
        >
          <img src={movie.posterPath} alt={`Poster for ${movie.title}`} />
        </div>
      );
    } else {
      return (
        <div
          className="card-image is-poster is-placeholder"
          style={{ width: posterWidth, height: posterHeight }}
        >
          <h5 className="title is-5 has-text-white-ter is-unselectable">
            {movie.title}
          </h5>
        </div>
      );
    }
  };

  return (
    <div className="card card-equal-height" style={{ width: posterWidth }}>
      <Link to={`/movie/${movie.id}`}>{poster()}</Link>

      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-6">
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </p>
            <p className="subtitle is-7">
              {movieReleaseDate && movieReleaseDate.toLocaleDateString('en-US')}
            </p>
          </div>
        </div>
      </div>

      <footer className="card-footer">
        <a
          className="card-footer-item"
          onClick={movie.userData?.seen ? removeFromSeenlist : addToSeenlist}
        >
          <span
            className="icon has-text-danger link"
            title={movie.userData?.seen ? 'Remove from seen list' : 'Seen it'}
            key={movie.id + (movie.userData?.seen ? '_r' : '_a')}
          >
            <i
              className={
                movie.userData?.seen ? 'fas fa-eye-slash' : 'far fa-eye'
              }
            ></i>
          </span>
        </a>
        <a
          className="card-footer-item"
          onClick={
            movie.userData?.watchlist ? removeFromWatchlist : addToWatchlist
          }
        >
          <span
            className="icon has-text-danger link"
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
        </a>
      </footer>
    </div>
  );
};
