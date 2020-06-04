import React from 'react';
import { useDispatch } from 'react-redux';
import { IMovie } from 'flixstash-common/types';

import {
  addMovieToWatchlist,
  addMovieToSeenlist,
  removeMovieFromWatchlist,
  removeMovieFromSeenlist,
} from './actions';

interface IComponentProps {
  /**
   * The movie details to display in the header.
   */
  movie: IMovie;
}

export const Header: React.FC<IComponentProps> = (props) => {
  const { movie } = props;

  const movieReleaseDate = movie.releaseDate
    ? new Date(movie.releaseDate)
    : null;

  const dispatch = useDispatch();

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

  const showPoster = () => {
    if (movie.posterPath) {
      return (
        <img
          src={`${movie.posterPath}`}
          alt={`Poster for ${movie.title}`}
          width="300"
          style={{
            borderWidth: '1px',
            borderColor: 'white',
            borderStyle: 'solid',
          }}
        />
      );
    } else {
      return (
        <div
          className="is-placeholder"
          style={{
            width: 300,
            height: 450,
            borderWidth: '1px',
            borderColor: 'white',
            borderStyle: 'solid',
          }}
        >
          <h3 className="title is-3 has-text-white-ter is-unselectable">
            {movie.title}
          </h3>
        </div>
      );
    }
  };

  const showTitle = () => (
    <h3 className="title is-3 has-text-white">
      {movie.title}{' '}
      <span className="is-size-5 has-text-weight-light">
        {movieReleaseDate && <>({movieReleaseDate.getFullYear()})</>}
      </span>
    </h3>
  );

  const showReleaseGenresRuntime = () => {
    const releaseDate = () =>
      movieReleaseDate && movieReleaseDate.toLocaleDateString('en-US');

    const genres = () =>
      movie.genres.length !== 0 ? (
        <span>
          {' '}
          <span className="icon is-small">
            <i className="far fa-dot-circle fa-xs"></i>
          </span>{' '}
          {movie.genres.map((g: any) => g.name).join(', ')}
        </span>
      ) : null;

    const runtime = () =>
      movie.runtime ? (
        <span>
          {' '}
          <span className="icon is-small">
            <i className="far fa-dot-circle fa-xs"></i>
          </span>{' '}
          {movie.runtime} min
        </span>
      ) : null;

    return (
      <h6 className="subtitle is-6 has-text-white has-text-weight-light">
        {releaseDate()} {genres()} {runtime()}
      </h6>
    );
  };

  const showTagline = () =>
    movie.tagline ? (
      <h6 className="subtitle is-6 has-text-white is-italic has-text-weight-bold">
        {movie.tagline}
      </h6>
    ) : null;

  const showOverview = () => (
    <div className="has-text-white has-text-weight-light">
      <h5 className="title is-5 has-text-white">Overview</h5>
      {movie.overview ? movie.overview : 'No overview found for this movie.'}
    </div>
  );

  const showButtons = () => (
    <div className="buttons">
      <button
        className="button is-danger"
        onClick={movie.userData?.seen ? removeFromSeenlist : addToSeenlist}
      >
        <span
          className="icon"
          title={movie.userData?.seen ? 'Remove from seen list' : 'Seen it'}
          key={movie.id + (movie.userData?.seen ? '_r' : '_a')}
        >
          <i
            className={movie.userData?.seen ? 'fas fa-eye-slash' : 'far fa-eye'}
          ></i>
        </span>
      </button>
      <button
        className="button is-danger"
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
              movie.userData?.watchlist ? 'fas fa-bookmark' : 'far fa-bookmark'
            }
          ></i>
        </span>
      </button>
    </div>
  );

  const showLinks = () => {
    if (!movie.homepage && !movie.imdbId) {
      return null;
    } else {
      return (
        <>
          <div
            className="is-divider"
            style={{ marginTop: '0em', marginBottom: '1em' }}
          ></div>
          <div className="buttons">
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="button is-small is-danger is-inverted is-outlined"
                style={{ border: '0' }}
              >
                <span className="icon is-medium" style={{ marginRight: '1em' }}>
                  <i className="fas fa-2x fa-home"></i>
                </span>
                <span>Go to homepage</span>
              </a>
            )}

            {movie.imdbId && (
              <a
                href={`https://www.imdb.com/title/${movie.imdbId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button is-small is-danger is-inverted is-outlined"
                style={{ border: '0' }}
              >
                <span className="icon is-medium" style={{ marginRight: '1em' }}>
                  <i className="fab fa-2x fa-imdb"></i>
                </span>
                <span>Go to IMDB</span>
              </a>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <div
      className="box is-radiusless"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(10,10,10,0.80) 100%), url('${movie.backdropPath}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2em',
      }}
    >
      <div className="columns">
        <div className="column is-narrow">{showPoster()}</div>
        <div className="column">
          {showTitle()}
          {showReleaseGenresRuntime()}
          {showTagline()}
          {showOverview()}
          <br />
          {showButtons()}
          {showLinks()}
        </div>
      </div>
    </div>
  );
};
