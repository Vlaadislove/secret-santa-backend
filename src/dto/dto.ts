import { IUserDocument } from "../models/user-model";

export const transformUser = (user:IUserDocument) => {
    return {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
}