import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">About</h1>
        <div className="content">
          <p>
            flixstash is a small demo app that I've built in early 2020 while
            learning <b>React</b> and <b>Redux</b>. It allows you to keep track
            of movies you've seen or want to watch. Behind the scene, the data
            comes from (and is owned by){' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Movie Database (TMDb) API.
            </a>
          </p>
          <p>flixstash is built using the following software stack:</p>
          <ul>
            <li>
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Typescript
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
            </li>
            <li>
              <a
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux
              </a>
            </li>
            <li>
              <a
                href="https://bulma.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bulma
              </a>
            </li>
            <li>
              <a
                href="https://nodejs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Node.js
              </a>
            </li>
            <li>
              <a
                href="https://expressjs.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Express.js
              </a>
            </li>
            <li>
              <a
                href="https://www.mongodb.com//"
                target="_blank"
                rel="noopener noreferrer"
              >
                MongoDB
              </a>
            </li>
          </ul>
          <p>
            Work is still being done on the app to add new features and to fix
            bugs. I also use this app as a codebase to test new libraries, new
            ideas, etc.
          </p>
          <p>
            The source code can be find on GitHub : <b>coming soon</b>
          </p>
          <p>
            Note: since this app is simply a demo, the live database can be
            cleared at anytime, without prior notice.
          </p>
        </div>
      </div>
    </section>
  );
};
