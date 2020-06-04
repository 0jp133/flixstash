/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cx from 'classnames';

import { LayoutOption } from './LayoutOption';

interface IComponentProps {
  /**
   * The layout option that is currently selected.
   */
  selectedLayout: LayoutOption;

  /**
   * The callback that is used when the user selects the "Grid" option.
   */
  selectGridCallback: () => void;

  /**
   * The callback that is used when the user selects the "List" option.
   */
  selectListCallback: () => void;
}

export const LayoutPicker: React.FC<IComponentProps> = (props) => {
  const { selectedLayout, selectGridCallback, selectListCallback } = props;

  return (
    <div className="field has-addons">
      <p className="control">
        <a
          className={cx('button', {
            'is-dark': selectedLayout === LayoutOption.Grid,
          })}
          onClick={() => selectGridCallback()}
        >
          <span className="icon is-small">
            <i className="fas fa-th-large"></i>
          </span>
        </a>
      </p>
      <p className="control">
        <a
          className={cx('button', {
            'is-dark': selectedLayout === LayoutOption.List,
          })}
          onClick={() => selectListCallback()}
        >
          <span className="icon is-small">
            <i className="fas fa-list"></i>
          </span>
        </a>
      </p>
    </div>
  );
};
