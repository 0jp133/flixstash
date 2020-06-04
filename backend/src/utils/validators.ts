/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from '@hapi/joi';
import {
  INewUserInformation,
  IUserCredentials,
  ISearchQuery,
  IUserMoviesQuery,
  IMovieId,
} from 'flixstash-common/types';

/**
 * Get a Typescript type validator that use the given Joi schema.
 * @param schema Joi schema for validation.
 */
const objectValidatorFromSchema = <T>(schema: Joi.Schema) => {
  return (obj: any): T => {
    const { error, value } = schema.validate(obj, {
      abortEarly: false,
    });

    if (error) {
      throw new Error(error.details.map((e) => e.message).toString());
    }

    return value as T;
  };
};

export const toNewUserInformation = objectValidatorFromSchema<INewUserInformation>(
  Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
);

export const toUserCredentials = objectValidatorFromSchema<IUserCredentials>(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
);

export const toSearchQuery = objectValidatorFromSchema<ISearchQuery>(
  Joi.object({
    query: Joi.string().required(),
    page: Joi.number().required().min(1).max(500).default(1),
  })
);

export const toMovieId = objectValidatorFromSchema<IMovieId>(
  Joi.object({
    id: Joi.number().required(),
  })
);

export const toUserMoviesQuery = objectValidatorFromSchema<IUserMoviesQuery>(
  Joi.object({
    page: Joi.number().min(1).max(500).default(1),
    filter: Joi.number().min(0).max(2).default(1),
    sort: Joi.number().min(0).max(1).default(0),
    genres: Joi.custom((value: string, helpers) => {
      if (value === '') {
        return [];
      }

      const genreIds = value.split(',').map((s) => parseInt(s));

      if (genreIds.some((id) => isNaN(id))) {
        return helpers.error('any.invalid');
      } else {
        return genreIds;
      }
    }),
  })
);
