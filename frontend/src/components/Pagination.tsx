/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cx from 'classnames';

interface IComponentProps {
  /**
   * The current page number.
   */
  currentPage: number;
  /**
   * Total number of pages of the pagination.
   */
  totalPages: number;
  /**
   * Maximum number of pages that we can show in the pagination before putting ellipsis ("...").
   */
  maxPageShown: number;
  /**
   * How many pages to show on each side of the current page.
   */
  range: number;
  /**
   * Callback when the user click on a page or on the previous/next buttons.
   */
  goToPage: (pageNumber: number) => void;
}

export const Pagination: React.FC<IComponentProps> = (props) => {
  const { currentPage, totalPages, maxPageShown, range, goToPage } = props;

  // Get the pages numbering.
  // This function return an array that look like this:
  // [ 1, "...", 4, 5, 6, "...", 9 ]
  const getPageNumbering = () => {
    let numbering: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      numbering.push(i);
    }

    if (totalPages > maxPageShown) {
      numbering = numbering.reduce<(number | string)[]>((acc, cur) => {
        if (
          cur === 1 ||
          cur === totalPages ||
          (cur >= currentPage - range && cur <= currentPage + range)
        ) {
          return acc.concat(cur);
        } else {
          if (acc[acc.length - 1] !== '...') {
            return acc.concat('...');
          } else {
            return acc;
          }
        }
      }, []);
    }

    return numbering;
  };

  // Get the pagination list.
  // This convert the page numbering into valid JSX code.
  const paginationList = () => {
    return getPageNumbering().map((page, idx) => {
      if (page === '...') {
        return (
          <li key={page + idx}>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        );
      } else {
        return (
          <li key={page}>
            <a
              className={cx('pagination-link', {
                'is-current': currentPage === page,
              })}
              aria-label={`Goto page ${page}`}
              onClick={(e) => goToPage(page as number)}
            >
              {page}
            </a>
          </li>
        );
      }
    });
  };

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      {currentPage > 1 ? (
        <a
          className="pagination-previous"
          onClick={(e) => goToPage(currentPage - 1)}
        >
          Previous page
        </a>
      ) : (
        <a className="pagination-previous" {...{ disabled: true }}>
          Previous page
        </a>
      )}
      {currentPage < totalPages ? (
        <a
          className="pagination-next"
          onClick={(e) => goToPage(currentPage + 1)}
        >
          Next page
        </a>
      ) : (
        <a className="pagination-next" {...{ disabled: true }}>
          Next page
        </a>
      )}
      <ul className="pagination-list">{paginationList()}</ul>
    </nav>
  );
};
