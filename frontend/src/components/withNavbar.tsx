import React from 'react';

import { Navbar } from './navbar/Navbar';

export const withNavbar = (WrappedComponent: React.FC) => {
  return (props: any) => {
    return (
      <>
        <Navbar />
        <WrappedComponent {...props} />
      </>
    );
  };
};
