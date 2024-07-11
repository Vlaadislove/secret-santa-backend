import { IUserDocument } from "../models/user-model";

export interface IUserReturn {
    username: string
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export const transformUser = (user: IUserDocument) => {
    return {
        username: user.username,
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
}