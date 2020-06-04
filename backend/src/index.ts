import http from 'http';
import mongoose from 'mongoose';

import { logger } from './utils/logger';
import { app } from './app';
import config from './utils/config';

const server = http.createServer(app);

const setupConnection = async () => {
  try {
    logger.info('Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI as string, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB');

    server.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error('Error:', error.message);
  }
};

setupConnection();
