import React from 'react';
import { IMovie } from 'flixstash-common/types';

interface IComponentProps {
  /**
   * The movie.
   */
  movie: IMovie;
}

export const Keywords: React.FC<IComponentProps> = (props) => {
  const { movie } = props;

  return (
    <>
      <h3 className="title is-3">Keywords</h3>

      {movie.keywords.keywords.length === 0 ? (
        <div style={{ marginBottom: '1rem' }}>
          No keyword found for this movie.
        </div>
      ) : (
        <div className="tags are-medium">
          {movie.keywords.keywords.map((keyword) => (
            <span className="tag is-danger" key={keyword.id}>
              {keyword.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
};
