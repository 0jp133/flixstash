import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { Dispatch, State } from './types';
import { signupReducer } from './modules/signup/reducer';
import { loginReducer } from './modules/login/reducer';
import { profileReducer } from './modules/profile/reducer';
import { searchReducer } from './modules/search/reducer';
import { moviesReducer } from './modules/movies/reducer';
import { userMoviesReducer } from './modules/my-movies/reducer';
import { statsReducer } from './modules/statistics/reducer';

const reducer = combineReducers<State>({
  signup: signupReducer,
  login: loginReducer,
  profile: profileReducer,
  search: searchReducer,
  movies: moviesReducer,
  userMovies: userMoviesReducer,
  stats: statsReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware<Dispatch, State>(thunk))
);
