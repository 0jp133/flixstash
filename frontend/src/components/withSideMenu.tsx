import React from 'react';

import { Menu } from './Menu';

export const withSideMenu = (WrappedComponent: React.FC) => {
  return (props: any) => {
    return (
      <section className="section" style={{ minHeight: '65vh' }}>
        <div className="container">
          <div className="columns">
            <div className="column is-narrow">
              <Menu />
            </div>
            <div className="column">
              <WrappedComponent {...props} />
            </div>
          </div>
        </div>
      </section>
    );
  };
};
