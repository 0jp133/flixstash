import express from 'express';
import helmet from 'helmet';
import enforce from 'express-sslify';
import path from 'path';

import { authenticationRouter } from './routes/authentication.route';
import { profileRouter } from './routes/profile.route';
import { searchRouter } from './routes/search.route';
import { movieRouter } from './routes/movie.route';
import { statsRouter } from './routes/stats.route';
import { errorHandler } from './middlewares/errorHandler';

export const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api/authentication', authenticationRouter);
app.use('/api/profile', profileRouter);
app.use('/api/search', searchRouter);
app.use('/api/movie', movieRouter);
app.use('/api/stats', statsRouter);
app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.use(errorHandler);
