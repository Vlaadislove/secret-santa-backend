import mongoose, {Document} from 'mongoose'

interface IUser {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IUserDocument extends IUser, Document {}



const UserSchema = new mongoose.Schema(
    {
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