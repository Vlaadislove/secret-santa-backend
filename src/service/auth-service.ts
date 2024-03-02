import { IClientInfo } from "../middlewares/middlewares";
import sessionModel from "../models/session-model";
import userModel, { IUserDocument } from "../models/user-model";
import bcrypt from 'bcryptjs'
import { v1 as uuidv1 } from 'uuid'

export interface IUserInput {
    email: string;
    password: string;
}

const getCredentials = (user: IUserDocument, client: IClientInfo) => {
    let device;

    if (client.id) device = client.id
    else device = uuidv1()

    const session = new sessionModel({
        user: user._id,
        device,
        token: 'Тут Refresh Token',
        agents: [{ raw: client.agent }],
        hosts: [{ address: client.host }]
    })
    session.save()
    return {
        clientId: device,
        // accessToken: await this.signToken(user),
        accessToken: 'Тут Access Token',
        session: {
            token: session.token,
            expiresAt: session.expiresAt,
        }
    }
}




    export const registerService = async (data: IUserInput, client: IClientInfo) => {
        try {
            const { email, password } = data
            const user = new userModel({
                email,
                password: await bcrypt.hash(password, 10)
            })

            user.save()
            const session = await getCredentials(user, client);
            console.log(session)
            // return await getCredentials(user, client);
        } catch (error) {

        }

    }