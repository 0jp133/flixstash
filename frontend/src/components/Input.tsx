import React from 'react';
import cx from 'classnames';

interface IComponentProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * The label for the input.
   */
  label: string;
  /**
   * The icon to use on the left side of the input.
   */
  faIcon: string;
  /**
   * (Optional) The error message to display below the input.
   */
  errorMessage?: string;
}

export const Input: React.FC<IComponentProps> = (props) => {
  const { label, faIcon, errorMessage, ...rest } = props;

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={cx('input', { 'is-danger': errorMessage })}
          {...rest}
        />
        <span className="icon is-small is-left">
          <i className={faIcon}></i>
        </span>
      </div>
      {errorMessage && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
