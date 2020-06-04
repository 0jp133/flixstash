import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import { selectIsLoading } from './selectors';
import { useInputState } from '../../hooks/useInputState';

interface IComponentProps {
  /**
   * The value to show in the input field.
   */
  inputValue: string;
}

export const SearchForm: React.FC<IComponentProps> = (props) => {
  const { inputValue } = props;

  const [state, onChangeHandler] = useInputState({ query: inputValue });
  const history = useHistory();

  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push(`/search?query=${state.query}&page=${1}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            name="query"
            placeholder="Find a movie"
            required={true}
            value={state.query}
            onChange={onChangeHandler}
          />
        </div>
        <div className="control">
          <button
            className={cx('button is-link', {
              'is-loading': isLoading,
            })}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
