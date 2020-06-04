import { Request, RequestHandler } from 'express';

import { verifyToken } from '../utils/crypto';
import { User } from '../models/user.model';
import { HttpStatusCode } from '../types/http';

const getTokenFrom = (req: Request) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  } else {
    throw new Error('Token is missing from request.');
  }
};

/**
 * Authentication middleware.
 * Validate the token and add the user object to the request.
 */
export const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const payload = verifyToken(token);

    const user = await User.findById(payload.id);

    if (user) {
      req.user = user;
    } else {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ error: 'Token is invalid.' });
    }

    return next();
  } catch (error) {
    res.status(HttpStatusCode.Unauthorized).json({ error: error.message });
  }
};
