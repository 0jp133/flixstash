![flixstash logo](https://raw.githubusercontent.com/0jp133/flixstash/master/frontend/src/assets/logo-inv.svg)

---

**Live demo: https://flixstash.herokuapp.com**  
( Note: since this app is simply a demo, the live database can be cleared at anytime, without prior notice.)

---

flixstash is a small demo app that I've built in early 2020 while learning **React** and **Redux**. It allows you to keep track of movies you've seen or want to watch. Behind the scene, the data comes from (and is owned by) _The Movie Database (TMDb) API_.

flixstash is built using the following software stack:

- Typescript
- React
- Redux
- Bulma
- Node.js
- Express.js
- MongoDB

## How to run locally

You will first need:

- MongoDB server running locally.
  - Go [here](https://www.mongodb.com/download-center/community) to download the *MongoDB Community Server* for your OS.
  - Start the MongoDB process by running this command:
    ```
    mongod --dbpath=/path/to/your/new/database
    ```
  - Take note of the port number.
- An API key from _The Movie Database (TMDb)_. Click [here](https://developers.themoviedb.org/3/getting-started/introduction) for details on how to register for an API key (it's free.)

### Start the backend server

Create an `.env` file in `/backend` with the following content:

```
MONGODB_URI={...}
PORT=3001
SECRET={...}
TMDB_API_KEY={...}
```

Where:  
- `MONGODB_URI` : the URI to connect to your local MongoDB database. Should look like this: `mongodb://127.0.0.1:[PORT NUMBER]/flixstash-dev`  
- `SECRET` : a random string, used as a secret key for signing JSON Web Tokens (JWT).
- `TMDB_API_KEY` : your TMDb API key.

And then:

```
cd backend/
npm install
npm run dev
```

### Start the frontend app

```
cd frontend/
npm install
npm run start
```

You should be able to view the app: http://localhost:3000

## Todos

- [ ] Add upcoming movies.
- [ ] Add new releases.
- [ ] Add better error handling on the backend.
- [ ] Switch to an auth provider, like Okta or Firebase Auth.
- [ ] Work on UI and theme colors.
