import mongoose, { Document } from 'mongoose'

interface IUser {
  username: string
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IUserDocument extends IUser, Document { }



const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "users" }
);

export default mongoose.model<IUserDocument>('User', UserSchema)