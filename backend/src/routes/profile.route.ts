import express, { RequestHandler } from 'express';
import { IFlixstashApi } from 'flixstash-common/types';

import { auth } from '../middlewares/auth';
import { HttpStatusCode } from '../types/http';

const getProfile: RequestHandler = (req, res) => {
  const payload: IFlixstashApi['/api/profile']['get']['res'] = {
    username: req.user.username,
    email: req.user.email,
    memberSince: req.user.createdAt,
  };

  return res.status(HttpStatusCode.Ok).json(payload);
};

export const profileRouter = express.Router();
profileRouter.get('/', auth, getProfile);
