import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Activates scroll restoration when location changes.
 */
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
};
