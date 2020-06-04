/**
 * Functions for managing the user's token found in the local storage.
 */

const TOKEN_KEY = 'fs_token';

let userToken: string | null = null;

/**
 * Store a token in local storage.
 * @param token The token.
 */
const storeToken = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
  userToken = token;
};

/**
 * Get a previously saved token.
 */
const getToken = () => {
  if (!userToken) {
    userToken = window.localStorage.getItem(TOKEN_KEY);
  }

  return userToken;
};

/**
 * Delete the token from local storage.
 */
const deleteToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  userToken = null;
};

export const tokenHelper = {
  storeToken,
  getToken,
  deleteToken,
};
