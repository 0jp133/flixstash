import React from 'react';
import { IMovieOverview } from 'flixstash-common/types';

import { MovieCard } from '../MovieCard';

interface IComponentProps {
  /**
   * An array of movies overview to display in grid form.
   */
  movies: IMovieOverview[];
}

export const GridLayout: React.FC<IComponentProps> = (props) => {
  const { movies } = props;

  return (
    <div className="columns is-multiline is-mobile">
      {movies.map((movie) => (
        <div
          className="column is-narrow"
          style={{ padding: '1.35em' }}
          key={movie.id}
        >
          <MovieCard
            movie={movie}
            posterWidthInPx={154}
            posterHeightInPx={231}
          />
        </div>
      ))}
    </div>
  );
};
