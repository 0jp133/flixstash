import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMovieModel extends Document {
  genres: number[];
  id: number;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const movieSchema: Schema = new Schema(
  {
    posterPath: { type: String, required: false },
    _id: { type: Number, required: true },
    title: { type: String, required: true },
    genres: [Number],
    releaseDate: { type: String, required: false },
  },
  {
    toJSON: {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.createdAt;
        delete returnedObject.updatedAt;
        delete returnedObject.__v;
      },
    },
    timestamps: true,
  }
);

export const Movie: Model<IMovieModel> = mongoose.model<IMovieModel>(
  'Movie',
  movieSchema
);
