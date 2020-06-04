import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectIsLoggedIn } from '../modules/login/selectors';

export const withAuthentication = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
};
