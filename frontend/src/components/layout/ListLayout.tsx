import React from 'react';
import { IMovieOverview } from 'flixstash-common/types';

import { MovieListItem } from '../MovieListItem';

interface IComponentProps {
  /**
   * An array of movies overview to display in list form.
   */
  movies: IMovieOverview[];
}

export const ListLayout: React.FC<IComponentProps> = (props) => {
  const { movies } = props;

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
          <th>Release date</th>
          <th>Genre(s)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <MovieListItem key={movie.id} movie={movie} />
        ))}
      </tbody>
    </table>
  );
};
