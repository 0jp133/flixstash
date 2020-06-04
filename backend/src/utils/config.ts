import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SECRET: process.env.SECRET,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
