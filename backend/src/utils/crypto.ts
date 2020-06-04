import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from './config';
import { IUserModel } from '../models/user.model';

const SALT_ROUNDS = 10;
const ALGO = 'HS256';
const EXPIRES_IN = '4h';

/**
 * Hash the given password using bcrypt.
 * @param password The password to hash.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a password with a hash.
 * @param password The password to compare.
 * @param hash The hash.
 */
export const compareWithHash = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/**
 * Create a token payload for the given user.
 * @param user The user.
 */
export const createPayloadForUser = (user: IUserModel): { id: string } => {
  return {
    id: user._id,
  };
};

/**
 * Create a token for the given user.
 * @param user The user.
 */
export const createTokenForUser = (user: IUserModel): string => {
  const payload = createPayloadForUser(user);

  return jwt.sign(payload, config.SECRET as string, {
    algorithm: ALGO,
    expiresIn: EXPIRES_IN,
  });
};

/**
 * Verify the validity of a token.
 * @param token The token to verify.
 */
export const verifyToken = (token: string): { id: string } => {
  return jwt.verify(token, config.SECRET as string, {
    algorithms: [ALGO],
  }) as { id: string };
};
