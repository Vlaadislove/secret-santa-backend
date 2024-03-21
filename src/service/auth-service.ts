import { clientInfo } from './../middlewares/middlewares';
import { IClientInfo } from "../middlewares/middlewares";
import sessionModel, { ISessionDocument } from "../models/session-model";
import userModel, { IUserDocument } from "../models/user-model";
import bcrypt from 'bcryptjs'
import { v1 as uuidv1 } from 'uuid'
import { generateTokens, validateRefreshToken } from "./token-service";

export interface IUserInput {
    email: string;
    password: string;
}
export interface IAuthenticatedUser {
    account: {
        id: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    }
}

const getCredentials = (user: IUserDocument, client: IClientInfo) => {
    let device: string;

    if (client.id) device = client.id
    else device = uuidv1() + `-${new Date().getTime()}`

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

export const refreshService = async (token: string, client: IClientInfo) => {
    try {
        const user = validateRefreshToken(token) as IAuthenticatedUser
        let tokens;
        if (user) {
            const userId = await userModel.findById(user.account.id)
            console.log('User from refresh', userId)

            if (userId == null) return { error: { message: 'User not found' } }
            else tokens = generateTokens(userId)
        }
        else {
            return { error: { message: 'Token expired or invalid' } }
        }
        const session = await sessionModel.findOne({
            device: client.id,
            refreshToken: token,
            revokedAt: { $exists: false }
        })

        if (!session) return { error: { message: 'Session not found' } }

        const newExp = new Date();
        newExp.setDate(newExp.getDate() + 30);

        session.expiresAt = newExp;
        session.refreshToken = tokens.refreshToken

        if (session.hosts[session.hosts.length - 1].address !== client.host)
            session.hosts.push({ address: client.host });

        if (session.agents[session.agents.length - 1].raw !== client.agent)
            session.agents.push({ raw: client.agent });

        await session.save();

        return {
            clientId: session.device,
            accessToken: tokens.accessToken,
            session: {
                refreshToken: session.refreshToken,
                expiresAt: session.expiresAt,
            }
        }
    } catch (error) {
        console.log(error)
        throw new Error()
    }
}
export const logoutService = async (user: string, client: IClientInfo) => {
    try {
        const session = await sessionModel.find({
            device: client.id,
            user,
            revokedAt: { $exists: false }
        })
        session.forEach((s) => {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            s.refreshToken = ' '
            s.expiresAt = date;
            s.revokedAt = new Date();
            s.revokedReason = "logout";
            s.save()
        })
        return "Successfully logged out."
    } catch (error) {
        console.log(error)
        throw new Error()
    }

}