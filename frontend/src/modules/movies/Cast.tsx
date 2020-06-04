import React from 'react';
import { IMovie } from 'flixstash-common/types';

interface IComponentProps {
  /**
   * The movie.
   */
  movie: IMovie;
  /**
   * The maximum number of cast members to display in the table.
   */
  maxNumberOfCastMembers: number;
}

export const Cast: React.FC<IComponentProps> = (props) => {
  const { movie, maxNumberOfCastMembers } = props;

  return (
    <>
      <h3 className="title is-3">Top Billed Cast</h3>

      {movie.credits.cast.length === 0 ? (
        <div style={{ marginBottom: '1.5rem' }}>
          No cast found for this movie.
        </div>
      ) : (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Actor</th>
              <th>Character</th>
            </tr>
          </thead>
          <tbody>
            {movie.credits.cast
              .slice(0, maxNumberOfCastMembers)
              .map((actor) => (
                <tr key={actor.id}>
                  <td className="has-text-weight-bold">{actor.name}</td>
                  <td>{actor.character}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};
