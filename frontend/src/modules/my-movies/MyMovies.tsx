import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { fetchUserMovies } from './actions';
import {
  selectIsLoading,
  selectUserMoviesPage,
  selectTotalPages,
  selectTotalMovies,
  selectError,
} from './selectors';
import { useQueryString } from '../../hooks/useQueryString';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { getGenreIdToDefaultMap } from './genres';
import { LayoutPicker } from '../../components/layout/LayoutPicker';
import { FilterPicker } from './FilterPicker';
import { SortDropdown } from './SortDropdown';
import { GenreDropdown } from './GenreDropdown';
import { LayoutOption } from '../../components/layout/LayoutOption';
import { Layout } from '../../components/layout/Layout';
import {
  parseLayoutOption,
  parsePageNumber,
  parseFilter,
  parseSort,
  parseGenres,
} from '../../helpers/queryStringHelper';
import { FilterOption } from './FilterOption';
import { SortOption } from './SortOption';
import { NoMoviesFound } from './NoMoviesFound';

const getURL = (
  page: number,
  layout: LayoutOption,
  filter: FilterOption,
  sort: SortOption,
  genres: Map<number, boolean>
) => {
  let layoutOptionString = '';
  if (layout === LayoutOption.Grid) {
    layoutOptionString = 'grid';
  } else if (layout === LayoutOption.List) {
    layoutOptionString = 'list';
  }

  let filterOptionString = '';
  if (filter === FilterOption.All) {
    filterOptionString = 'all';
  } else if (filter === FilterOption.Watchlist) {
    filterOptionString = 'watch';
  } else if (filter === FilterOption.Seenlist) {
    filterOptionString = 'seen';
  }

  let sortOptionString = '';
  if (sort === SortOption.Title) {
    sortOptionString = 'title';
  } else if (sort === SortOption.ReleaseDate) {
    sortOptionString = 'release_date';
  }

  const genresId = Array.from(genres.entries()).reduce<number[]>(
    (acc, [id, isSelected]) => (isSelected ? acc.concat(id) : acc),
    []
  );

  return `/my-movies?page=${page}&view=${layoutOptionString}&filter=${filterOptionString}&sort=${sortOptionString}&genres=${genresId.join(
    ','
  )}`;
};

export const MyMovies: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(selectIsLoading);
  const totalPages = useSelector(selectTotalPages);
  const totalMovies = useSelector(selectTotalMovies);
  const error = useSelector(selectError);

  const searchParams = useQueryString();

  let layoutOption = parseLayoutOption(searchParams.get('view'));
  if (layoutOption === null) {
    layoutOption = LayoutOption.Grid;
  }

  let pageNumber = parsePageNumber(searchParams.get('page'), 1, 1000);
  if (pageNumber === null) {
    pageNumber = 1;
  }

  let filterOption = parseFilter(searchParams.get('filter'));
  if (filterOption === null) {
    filterOption = FilterOption.All;
  }

  let sortOption = parseSort(searchParams.get('sort'));
  if (sortOption === null) {
    sortOption = SortOption.Title;
  }

  let genresList = parseGenres(searchParams.get('genres'));
  let genres = getGenreIdToDefaultMap(false);
  if (!genresList) {
    genres = getGenreIdToDefaultMap(true);
  } else {
    genresList.forEach((id) => genres.set(id, true));
  }

  // Select the page. Can be null if it's not found in the state.
  const moviesPage = useSelector(
    selectUserMoviesPage(
      pageNumber,
      filterOption,
      sortOption,
      Array.from(genres.entries()).reduce<number[]>(
        (acc, [id, isSelected]) => (isSelected ? acc.concat(id) : acc),
        []
      )
    )
  );

  useEffect(() => {
    // Even though the page is found in the state, we should fetch it again
    // since the user could have added new movies in his lists.
    if (/*!moviesPage &&*/ !isLoading) {
      dispatch(
        fetchUserMovies({
          page: pageNumber as number,
          filter: filterOption as FilterOption,
          sort: sortOption as SortOption,
          genres: Array.from(genres.entries())
            .filter(([id, value]) => value)
            .map(([id, value]) => id),
        })
      );
    }
    // We pass an empty dependency array to useEffect. This cause the effect to run only when the component mounts.
    // This is acceptable because this component will be re-rendered everytime we consult our movies or want to access a
    // specific page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (totalPages > 0 && pageNumber > totalPages) {
    // If the user try to access a page number that is greater than the total number of pages,
    // redirect the user to the last page.
    return (
      <Redirect
        to={getURL(
          totalPages,
          layoutOption,
          filterOption as FilterOption,
          sortOption as SortOption,
          genres
        )}
      />
    );
  } else {
    return (
      <>
        <h2 className="title is-2">My Movies</h2>

        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <FilterPicker
                selectedFilter={filterOption}
                selectAllCallback={() =>
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      FilterOption.All,
                      sortOption as SortOption,
                      genres
                    )
                  )
                }
                selectWatchlistCallback={() =>
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      FilterOption.Watchlist,
                      sortOption as SortOption,
                      genres
                    )
                  )
                }
                selectSeenlistCallback={() =>
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      FilterOption.Seenlist,
                      sortOption as SortOption,
                      genres
                    )
                  )
                }
              />
            </div>
            <div className="level-item"></div>
            <div className="level-item">
              <SortDropdown
                selectedSortOption={sortOption}
                selectTitleCallback={() =>
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      filterOption as FilterOption,
                      SortOption.Title,
                      genres
                    )
                  )
                }
                selectReleaseDateCallback={() =>
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      filterOption as FilterOption,
                      SortOption.ReleaseDate,
                      genres
                    )
                  )
                }
              />
            </div>
            <div className="level-item"></div>
            <div className="level-item">
              <GenreDropdown
                selectedGenres={genres}
                selectAllCallback={() =>
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      filterOption as FilterOption,
                      sortOption as SortOption,
                      getGenreIdToDefaultMap(true)
                    )
                  )
                }
                selectNoneCallback={() =>
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      filterOption as FilterOption,
                      sortOption as SortOption,
                      getGenreIdToDefaultMap(false)
                    )
                  )
                }
                selectGenreCallback={(id) => {
                  genres.set(id, true);
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      filterOption as FilterOption,
                      sortOption as SortOption,
                      genres
                    )
                  );
                }}
                unselectGenreCallback={(id) => {
                  genres.set(id, false);
                  history.push(
                    getURL(
                      1,
                      layoutOption as LayoutOption,
                      filterOption as FilterOption,
                      sortOption as SortOption,
                      genres
                    )
                  );
                }}
              />
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <LayoutPicker
                selectedLayout={layoutOption}
                selectGridCallback={() =>
                  history.push(
                    getURL(
                      pageNumber as number,
                      LayoutOption.Grid,
                      filterOption as FilterOption,
                      sortOption as SortOption,
                      genres
                    )
                  )
                }
                selectListCallback={() =>
                  history.push(
                    getURL(
                      pageNumber as number,
                      LayoutOption.List,
                      filterOption as FilterOption,
                      sortOption as SortOption,
                      genres
                    )
                  )
                }
              />
            </div>
          </div>
        </nav>

        {isLoading && <Loader />}

        {!isLoading && error && (
          <div>Something went wrong. Try again later.</div>
        )}

        {!isLoading && moviesPage && moviesPage.length === 0 && (
          <NoMoviesFound />
        )}

        {!isLoading && moviesPage && moviesPage.length > 0 && (
          <Layout movies={moviesPage} option={layoutOption} />
        )}

        {!isLoading && moviesPage && totalMovies > 0 && (
          <Pagination
            currentPage={pageNumber}
            totalPages={totalPages}
            maxPageShown={8}
            range={1}
            goToPage={(targetPageNumber) => {
              history.push(
                getURL(
                  targetPageNumber,
                  layoutOption as LayoutOption,
                  filterOption as FilterOption,
                  sortOption as SortOption,
                  genres
                )
              );
            }}
          />
        )}
      </>
    );
  }
};
