import express, { RequestHandler } from 'express';
import { IFlixstashApi } from 'flixstash-common/types';

import { toUserCredentials, toNewUserInformation } from '../utils/validators';
import { User, IUserModel } from '../models/user.model';
import {
  hashPassword,
  compareWithHash,
  createTokenForUser,
} from '../utils/crypto';
import { HttpStatusCode } from '../types/http';

const login: RequestHandler = async (req, res) => {
  let userCredentials: IFlixstashApi['/api/authentication/login']['post']['body'];
  try {
    userCredentials = toUserCredentials(req.body);
  } catch (error) {
    return res.status(HttpStatusCode.BadRequest).json({ error: error.message });
  }

  // Find the user with this email address.
  const user = await User.findOne({ email: userCredentials.email });

  // Check if the user exists and the password is valid.
  const passwordIsValid =
    user === null
      ? false
      : await compareWithHash(userCredentials.password, user.passwordHash);

  if (!(user && passwordIsValid)) {
    return res.status(HttpStatusCode.Unauthorized).json({
      error: 'Invalid email or password.',
    });
  }

  // Create and return the token and the user profile.
  const token = createTokenForUser(user);

  const payload: IFlixstashApi['/api/authentication/login']['post']['res'] = {
    token,
    profile: {
      username: user.username,
      email: user.email,
      memberSince: user.createdAt,
    },
  };

  return res.status(HttpStatusCode.Ok).send(payload);
};

const signup: RequestHandler = async (req, res, next) => {
  let newUserInformation: IFlixstashApi['/api/authentication/signup']['post']['body'];
  try {
    newUserInformation = toNewUserInformation(req.body);
  } catch (error) {
    return res.status(HttpStatusCode.BadRequest).json({ error: error.message });
  }

  // Check if a user with the same email address already exists.
  const existingUser = await User.findOne({ email: newUserInformation.email });

  if (existingUser) {
    return res.status(HttpStatusCode.BadRequest).json({
      error: 'A user with this email address already exists in the database.',
    });
  }

  // Create and try to save the new User object.
  const passwordHash = await hashPassword(newUserInformation.password);

  const user: IUserModel = new User({
    username: newUserInformation.username,
    email: newUserInformation.email,
    passwordHash,
  });

  try {
    await user.save();
    return res.status(HttpStatusCode.Created).end();
  } catch (error) {
    next(error);
  }
};

export const authenticationRouter = express.Router();
authenticationRouter.post('/login', login);
authenticationRouter.post('/signup', signup);
