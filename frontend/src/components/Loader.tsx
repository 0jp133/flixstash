import React from 'react';

export const Loader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <span className="icon is-large has-text-danger">
      <i className="fas fa-2x fa-spinner fa-pulse"></i>
    </span>
  </div>
);
