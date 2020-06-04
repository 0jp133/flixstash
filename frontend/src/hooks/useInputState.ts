import { useState } from 'react';
/**
 * Manages the state of one or more HTML input elements.
 * Note: the properties found in the state object must match the "name" attributes found in each input elements.
 * The returned values must be used like this:
 * ```
 * <input
    className="input"
    type="text"
    name="foo"
    value={state.foo}
    onChange={onChangeHandler}
  />
 * ```
 * @param initialState The initial state.
 * @return A stateful object and a event handler.
 */
export const useInputState = <T>(
  initialState: T
): [T, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [state, setState] = useState<T>(initialState);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return [state, onChangeHandler];
};
