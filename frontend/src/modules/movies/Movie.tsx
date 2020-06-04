import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectIsLoading, selectMovie, selectError } from './selectors';
import { fetchMovie } from './actions';
import { Details } from './Details';
import { Cast } from './Cast';
import { Keywords } from './Keywords';
import { Header } from './Header';
import { Links } from './Links';
import { Loader } from '../../components/Loader';
import { filterInt } from '../../helpers/miscHelper';

export const Movie: React.FC = () => {
  const dispatch = useDispatch();

  const params = useParams<{ id: string }>();
  const movieId = filterInt(params.id);

  const isLoading = useSelector(selectIsLoading);
  const movie = useSelector(selectMovie(movieId));
  const error = useSelector(selectError);

  useEffect(() => {
    if (!movie && movieId !== null) {
      dispatch(fetchMovie(movieId));
    }
  }, [dispatch, movie, movieId]);

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && error && <div>Something went wrong. Try again later.</div>}

      {!isLoading && movie && (
        <>
          <Header movie={movie} />
          <div className="columns">
            <div className="column is-two-thirds">
              <Cast movie={movie} maxNumberOfCastMembers={10} />
              <Keywords movie={movie} />
              <Links movie={movie} />
            </div>
            <div className="column">
              <Details movie={movie} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
