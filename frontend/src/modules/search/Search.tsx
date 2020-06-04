import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { search } from './actions';
import {
  selectIsLoading,
  selectSearchQuery,
  selectResultsPage,
  selectTotalPages,
  selectTotalResults,
  selectError,
} from './selectors';
import { SearchForm } from './SearchForm';
import { Pagination } from '../../components/Pagination';
import { useQueryString } from '../../hooks/useQueryString';
import { LayoutOption } from '../../components/layout/LayoutOption';
import { LayoutPicker } from '../../components/layout/LayoutPicker';
import { Layout } from '../../components/layout/Layout';
import {
  parsePageNumber,
  parseLayoutOption,
} from '../../helpers/queryStringHelper';
import { Loader } from '../../components/Loader';

const getURL = (query: string, page: number, layout: LayoutOption) => {
  let layoutOptionString = '';
  if (layout === LayoutOption.Grid) {
    layoutOptionString = 'grid';
  } else if (layout === LayoutOption.List) {
    layoutOptionString = 'list';
  }

  return `/search?query=${query}&page=${page}&view=${layoutOptionString}`;
};

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(selectIsLoading);
  const previousSearchQuery = useSelector(selectSearchQuery);
  const totalPages = useSelector(selectTotalPages);
  const totalResults = useSelector(selectTotalResults);
  const error = useSelector(selectError);

  const searchParams = useQueryString();

  let newSearchQuery = searchParams.get('query');
  if (newSearchQuery === null) {
    newSearchQuery = previousSearchQuery;
  }

  let layoutOption = parseLayoutOption(searchParams.get('view'));
  if (layoutOption === null) {
    layoutOption = LayoutOption.Grid;
  }

  let pageNumber = parsePageNumber(searchParams.get('page'), 1, 500);
  if (pageNumber === null) {
    pageNumber = 1;
  }

  // Select the page. Can be null if it's not found in the state.
  const resultsPage = useSelector(
    selectResultsPage(newSearchQuery, pageNumber)
  );

  useEffect(() => {
    if (!resultsPage && !isLoading && newSearchQuery) {
      dispatch(
        search({
          query: newSearchQuery,
          page: pageNumber as number,
        })
      );
    }
    // We pass an empty dependency array to useEffect. This cause the effect to run only when the component mounts.
    // This is acceptable because this component will be re-rendered everytime we search or want to access a
    // specific page from the result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (newSearchQuery && totalPages > 0 && pageNumber > totalPages) {
    // If the user try to access a page number that is greater than the total number of pages,
    // redirect the user to the last page.
    return <Redirect to={getURL(newSearchQuery, totalPages, layoutOption)} />;
  } else {
    return (
      <>
        <h2 className="title is-2">Search</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <SearchForm inputValue={newSearchQuery ? newSearchQuery : ''} />
        </div>

        {!isLoading && isLoading && <Loader />}

        {error && <div>Something went wrong. Try again later.</div>}

        {!isLoading && newSearchQuery && resultsPage && (
          <h5 className="title is-5 is-marginless">
            {totalResults} Search results for "{newSearchQuery}"
          </h5>
        )}

        {!isLoading && newSearchQuery && resultsPage && totalResults > 0 && (
          <>
            <nav className="level">
              <div className="level-left">
                <h6 className="subtitle is-6">
                  Page {pageNumber} of {totalPages}
                </h6>
              </div>

              <div className="level-right">
                <LayoutPicker
                  selectedLayout={layoutOption}
                  selectGridCallback={() =>
                    history.push(
                      getURL(
                        newSearchQuery as string,
                        pageNumber as number,
                        LayoutOption.Grid
                      )
                    )
                  }
                  selectListCallback={() =>
                    history.push(
                      getURL(
                        newSearchQuery as string,
                        pageNumber as number,
                        LayoutOption.List
                      )
                    )
                  }
                />
              </div>
            </nav>

            <Layout movies={resultsPage} option={layoutOption} />
          </>
        )}

        {!isLoading && newSearchQuery && resultsPage && totalResults > 0 && (
          <Pagination
            currentPage={pageNumber}
            totalPages={totalPages}
            maxPageShown={8}
            range={1}
            goToPage={(targetPageNumber) => {
              history.push(
                getURL(
                  newSearchQuery as string,
                  targetPageNumber,
                  layoutOption as LayoutOption
                )
              );
            }}
          />
        )}
      </>
    );
  }
};
