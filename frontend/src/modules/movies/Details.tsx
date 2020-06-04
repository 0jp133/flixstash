import React from 'react';
import ISO6391 from 'iso-639-1';
import { IMovie } from 'flixstash-common/types';

interface IComponentProps {
  /**
   * The movie.
   */
  movie: IMovie;
}

export const Details: React.FC<IComponentProps> = (props) => {
  const { movie } = props;

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <>
      <h3 className="title is-3">Details</h3>
      <div className="is-details">
        <ul>
          <li>
            <b>Status</b>
            <br />
            {movie.status}
          </li>
          <li>
            <b>Original Title</b>
            <br />
            {movie.originalTitle}
          </li>
          <li>
            <b>Original Language</b>
            <br />
            {ISO6391.getName(movie.originalLanguage)}
          </li>
          <li>
            <b>Budget</b>
            <br />
            {movie.budget === 0 ? '-' : currencyFormatter.format(movie.budget)}
          </li>
          <li>
            <b>Revenue</b>
            <br />
            {movie.revenue === 0
              ? '-'
              : currencyFormatter.format(movie.revenue)}
          </li>
          <li>
            <b>Production companies</b>
            <br />
            <ul>
              {movie.productionCompanies.length === 0
                ? '-'
                : movie.productionCompanies.map((company) => (
                    <li key={company.id}>{company.name}</li>
                  ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};
