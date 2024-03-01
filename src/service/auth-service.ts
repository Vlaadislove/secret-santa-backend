import { IClientInfo } from "../middlewares/middlewares";
import userModel from "../models/user-model";
import bcrypt from 'bcryptjs'

export interface IUserInput {
    email: string;
    password: string;
}
export const registerService = async (data: IUserInput, client: IClientInfo | undefined) => {
    try {
        const { email, password } = data
        const user = new userModel({
            email,
            password: await bcrypt.hash(password, 10)
        })

        user.save()
    } catch (error) {

    }

}