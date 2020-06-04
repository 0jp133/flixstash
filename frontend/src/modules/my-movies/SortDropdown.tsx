/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cx from 'classnames';

import { useDropdown } from '../../hooks/useDropdown';
import { SortOption } from './SortOption';

interface IComponentProps {
  /**
   * The sort option that is currently selected.
   */
  selectedSortOption: SortOption;

  /**
   * The callback that is used when the user selects the "Title" option.
   */
  selectTitleCallback: () => void;

  /**
   * The callback that is used when the user selects the "Release date" option.
   */
  selectReleaseDateCallback: () => void;
}

export const SortDropdown: React.FC<IComponentProps> = (props) => {
  const {
    selectedSortOption,
    selectTitleCallback,
    selectReleaseDateCallback,
  } = props;

  const [isOpen, setIsOpen, ref] = useDropdown();

  const showSelectedSortOption = () => {
    if (selectedSortOption === SortOption.Title) {
      return 'Title';
    } else if (selectedSortOption === SortOption.ReleaseDate) {
      return 'Release date';
    }
  };

  return (
    <>
      <span style={{ marginRight: '0.75em' }}>
        <b>Sort by</b>
      </span>
      <div className="control">
        <div
          className={cx('dropdown', {
            'is-active': isOpen,
          })}
          ref={ref}
        >
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{showSelectedSortOption()}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a
                className={cx('dropdown-item', {
                  'is-active': selectedSortOption === SortOption.Title,
                })}
                onClick={() => selectTitleCallback()}
              >
                Title
              </a>
              <a
                className={cx('dropdown-item', {
                  'is-active': selectedSortOption === SortOption.ReleaseDate,
                })}
                onClick={() => selectReleaseDateCallback()}
              >
                Release date
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
