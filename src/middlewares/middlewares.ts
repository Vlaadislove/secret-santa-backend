import { transformUser } from './../dto/dto';
import jwt, { JwtPayload } from 'jsonwebtoken'
// import { NextFunction, Request, Response } from "express";
import * as settings from "../settings";
import { Request, Response, NextFunction } from 'express-serve-static-core'
import { IAuthenticatedUser } from '../service/auth-service';

export interface IClientInfo {
    id: string | null;
    host: string;
    agent: string;
}

export interface CustomJWT extends JwtPayload {
    token: string | IAuthenticatedUser
}

// export interface IRequest extends Request {
//     client?: IClientInfo;
// };


export const clientInfo = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.client = {
        id: (req.query['deviceId'] as string | null),
        host: req.headers.forwarded || req.socket.remoteAddress,
        agent: req.headers["user-agent"],
    }

    next();
};


export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = jwt.verify(req.signedCookies['access_token'], settings.AUTH.jwtKeyAccess) as IAuthenticatedUser

        if (userData) {
            req.user = {
                ...userData
            }
            next()
        }

    } catch (err) {
        if (err instanceof Error) {
            if (err.message == 'jwt expired') {
                res.status(401).send({ error: { message: "Token expired." } });
            } else {
                res.status(401).send({ error: { message: "Invalid token." } });
            }
        }
    }
}


// export const authErrors = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     if (err) {
//         if (err.message === "jwt expired")
//             res.status(401).send({ error: { message: "Token expired." } });
//         else res.status(401).send({ error: { message: "Invalid token." } });
//     } else next();
// };