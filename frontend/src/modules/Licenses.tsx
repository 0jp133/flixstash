import React from 'react';

export const Licenses: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-2">Licenses</h1>
        <div>
          <div className="content">
            <h4 className="title is-4">Art</h4>
            <ul>
              <li>
                Landing page image:{' '}
                <a
                  href="https://www.freepik.com/free-photos-vectors/banner"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Banner vector created by vectorpouch - www.freepik.com
                </a>
              </li>
            </ul>
            <h4 className="title is-4">API</h4>
            <ul>
              <li>
                This product uses the{' '}
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TMDb API
                </a>{' '}
                but is not endorsed or certified by TMDb:
                <span style={{ marginLeft: '0.5em' }}>
                  <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
                      alt="TMDb logo"
                      width="150px"
                    />
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
