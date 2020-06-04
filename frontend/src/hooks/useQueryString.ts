import { useLocation } from 'react-router-dom';

/**
 * Get the query strings for the current URL.
 * @return An URLSearchParams object.
 */
export const useQueryString = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
