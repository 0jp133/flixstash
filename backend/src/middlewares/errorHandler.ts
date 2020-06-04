import { ErrorRequestHandler } from 'express';

import { HttpStatusCode } from '../types/http';

interface JSONParseError extends SyntaxError {
  status: number;
}

/**
 * Global error handler middleware.
 */
export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  // Handle malformed JSON.
  if (
    (err as JSONParseError) instanceof SyntaxError &&
    err.statusCode === HttpStatusCode.BadRequest &&
    'body' in err
  ) {
    return res.status(HttpStatusCode.BadRequest).send({ error: err.message });
  }

  return next(err);
};
