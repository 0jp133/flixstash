import React from 'react';

import { FilterOption } from './FilterOption';

interface IComponentProps {
  /**
   * The filter that is currently selected.
   */
  selectedFilter: FilterOption;

  /**
   * The callback that is used when the user selects the filter "All".
   */
  selectAllCallback: () => void;

  /**
   * The callback that is used when the user selects the filter "Watch list".
   */
  selectWatchlistCallback: () => void;

  /**
   * The callback that is used when the user selects the filter "Seen list".
   */
  selectSeenlistCallback: () => void;
}

export const FilterPicker: React.FC<IComponentProps> = (props) => {
  const {
    selectedFilter,
    selectAllCallback,
    selectWatchlistCallback,
    selectSeenlistCallback,
  } = props;

  return (
    <>
      <span style={{ marginRight: '0.75em' }}>
        <b>Show</b>
      </span>
      <div className="control">
        <label className="radio">
          <input
            type="radio"
            name="filterPicker"
            style={{ marginRight: '0.35em' }}
            defaultChecked={selectedFilter === FilterOption.All}
            onClick={() => selectAllCallback()}
          />
          All
        </label>
        <label className="radio">
          <input
            type="radio"
            name="filterPicker"
            style={{ marginRight: '0.35em' }}
            defaultChecked={selectedFilter === FilterOption.Watchlist}
            onClick={() => selectWatchlistCallback()}
          />
          Watch list
        </label>
        <label className="radio">
          <input
            type="radio"
            name="filterPicker"
            style={{ marginRight: '0.35em' }}
            defaultChecked={selectedFilter === FilterOption.Seenlist}
            onClick={() => selectSeenlistCallback()}
          />
          Seen list
        </label>
      </div>
    </>
  );
};
