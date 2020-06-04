import { RequestHandler } from 'express';

import { HttpStatusCode } from '../types/http';

/**
 * Unknown endpoint middleware.
 * Handle request to unknown endpoint.
 */
export const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(HttpStatusCode.NotFound).send({ error: 'unknown endpoint' });
};
