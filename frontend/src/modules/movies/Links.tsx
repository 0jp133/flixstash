import React from 'react';

import { IMovie } from 'flixstash-common/types';

interface IComponentProps {
  /**
   * The movie.
   */
  movie: IMovie;
}

export const Links: React.FC<IComponentProps> = (props) => {
  const { movie } = props;

  return (
    <>
      <h3 className="title is-3">Links</h3>
      <ul>
        <li>
          <a
            href={`https://fanart.tv/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check for art on <b>fanart.tv</b>
          </a>
        </li>
        <li>
          <a
            href={`https://www.justwatch.com/ca/search?q=${movie.title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Want to stream this movie? Search on <b>justwatch.com</b>
          </a>
        </li>
        <li>
          <a
            href={`https://www.youtube.com/results?search_query=${movie.title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Search "{movie.title}" on <b>youtube.com</b>
          </a>
        </li>
      </ul>
    </>
  );
};
