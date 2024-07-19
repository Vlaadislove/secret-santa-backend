import mongoose, { Document, ObjectId, Schema } from 'mongoose'

interface IUser {
  username: string
  email: string;
  password: string;
  boxes: ObjectId[];
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
    boxes: [{
      type: Schema.Types.ObjectId,
      ref: 'Box'
    }],
  },
  { timestamps: true, collection: "users" }
);

export default mongoose.model<IUserDocument>('User', UserSchema)