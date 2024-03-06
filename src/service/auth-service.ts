import { clientInfo } from './../middlewares/middlewares';
import { IClientInfo } from "../middlewares/middlewares";
import sessionModel from "../models/session-model";
import userModel, { IUserDocument } from "../models/user-model";
import bcrypt from 'bcryptjs'
import { v1 as uuidv1 } from 'uuid'
import { generateTokens } from "./token-service";

export interface IUserInput {
    email: string;
    password: string;
}
export interface IAuthenticatedUser {
    account: {
      id: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }

const getCredentials = (user: IUserDocument, client: IClientInfo) => {
    let device;

    if (client.id) device = client.id
    else device = uuidv1()

    const tokens = generateTokens(user)

    const session = new sessionModel({
        user: user._id,
        device,
        refreshToken: tokens.refreshToken,
        agents: [{ raw: client.agent }],
        hosts: [{ address: client.host }]
    })
    session.save()
    return {
        clientId: device,
        accessToken: tokens.accessToken,
        session: {
            refreshToken: session.refreshToken,
            expiresAt: session.expiresAt,
        }
    }
}
const authenticate = async (user: IUserDocument, password: string, client: IClientInfo) => {
    if (await bcrypt.compare(password, user.password)) {
        return getCredentials(user, client)
    } else throw new Error()
}



export const registerService = async (data: IUserInput, client: IClientInfo) => {
    console.log('first')
    try {
        const { email, password } = data
        const user = new userModel({
            email,
            password: await bcrypt.hash(password, 10)
        })
        await user.save()
        return getCredentials(user, client);
    } catch (error) {
        console.log(error)
        throw new Error()
    }
}

export const loginService = async (data: IUserInput, client: IClientInfo) => {
    try {
        const { email, password } = data

        const user = await userModel.findOne({ email })
        if (user) {
            return await authenticate(user, password, client)
        } else throw new Error()

    } catch (error) {
        console.log(error)
        throw new Error()
    }
}

export const refreshService = async (token: string, client:IClientInfo) =>{
    
}
export const logoutService = async (email: string, client:IClientInfo) =>{
    
}