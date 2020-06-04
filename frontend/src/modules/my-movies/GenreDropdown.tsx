import React from 'react';
import cx from 'classnames';

import { genreIdToNameMap } from './genres';
import { useDropdown } from '../../hooks/useDropdown';

interface IComponentProps {
  /**
   * A map between genre IDs and boolean values that specifies if the corresponding genre is selected.
   */
  selectedGenres: Map<number, boolean>;

  /**
   * The callback that is used when the user toggles the "all" checkbox to select all genres.
   */
  selectAllCallback: () => void;

  /**
   * The callback that is used when the user toggles the "all" checkbox to unselect all genres.
   */
  selectNoneCallback: () => void;

  /**
   * The callback that is used when the user selects a genre.
   */
  selectGenreCallback: (genreId: number) => void;

  /**
   * The callback that is used when the user unselects a genre.
   */
  unselectGenreCallback: (genreId: number) => void;
}

export const GenreDropdown: React.FC<IComponentProps> = (props) => {
  const {
    selectedGenres,
    selectAllCallback,
    selectNoneCallback,
    selectGenreCallback,
    unselectGenreCallback,
  } = props;

  const [isOpen, setIsOpen, ref] = useDropdown();

  return (
    <>
      <span style={{ marginRight: '0.75em' }}>
        <b>Genres</b>
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
              <span>
                Selected (
                {
                  Array.from(selectedGenres.values()).filter(
                    (isSelected) => isSelected
                  ).length
                }
                )
              </span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <label key={'genres_all'} className="checkbox">
                  <input
                    type="checkbox"
                    style={{ marginRight: '0.35em' }}
                    defaultChecked={Array.from(selectedGenres.values()).every(
                      (isSelected) => isSelected
                    )}
                    ref={(el) =>
                      el &&
                      (el.indeterminate =
                        Array.from(selectedGenres.values()).includes(true) &&
                        Array.from(selectedGenres.values()).includes(false))
                    }
                    onChange={(e) =>
                      e.target.checked
                        ? selectAllCallback()
                        : selectNoneCallback()
                    }
                  />
                  All
                </label>
              </div>
              <hr className="dropdown-divider"></hr>
              {Array.from(genreIdToNameMap.entries()).map(
                ([genreId, genreName]) => (
                  <div key={genreId} className="dropdown-item">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        style={{ marginRight: '0.35em' }}
                        defaultChecked={selectedGenres.get(genreId)}
                        onChange={(e) =>
                          e.target.checked
                            ? selectGenreCallback(genreId)
                            : unselectGenreCallback(genreId)
                        }
                      />
                      {genreName}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
