import mongoose, { Schema, Document, Model, Types } from 'mongoose';

import { IMovieModel } from './movie.model';

export interface IUserMovieModel extends Types.Subdocument {
  id: number;
  movie: IMovieModel;
  userData: { seen?: boolean; watchlist?: boolean };
}

const userMovieSchema: Schema = new Schema(
  {
    _id: Number,
    userData: { seen: Boolean, watchlist: Boolean },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.createdAt;
        delete returnedObject.updatedAt;
      },
    },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userMovieSchema.virtual('movie', {
  ref: 'Movie',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
});

userMovieSchema.pre<IUserMovieModel & Document>('save', function (next) {
  if (!this.userData.seen && !this.userData.watchlist) {
    // If the movie is not in any of the list, we remove it.
    this.remove();
  }
  next();
});

export interface IUserModel extends Document {
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  movies: Types.DocumentArray<IUserMovieModel>;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    movies: [userMovieSchema],
  },
  {
    toJSON: {
      transform: (_document, returnedObject) => {
        delete returnedObject.updatedAt;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
      },
    },
    timestamps: true,
  }
);

export const User: Model<IUserModel> = mongoose.model<IUserModel>(
  'User',
  userSchema
);
