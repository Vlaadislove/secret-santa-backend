import jwt from 'jsonwebtoken'
// import { NextFunction, Request, Response } from "express";
import * as settings from "../settings";
import { Request, Response, NextFunction } from 'express-serve-static-core'

export interface IClientInfo {
    id: string | null ;
    host: string;
    agent: string;
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
        id: (req.query[settings.CLIENT_COOKIE] as string | null),
        host: req.headers.forwarded || req.socket.remoteAddress,
        agent: req.headers["user-agent"],
}
    
    next();
};


export const validateUser = (req:Request,res:Response, next: NextFunction) =>{

    try {
        if(req.signedCookies['access_token']){
            const userData = jwt.verify(req.signedCookies['access_token'], settings.AUTH.jwtKeyAccess)
            if(userData){
                console.log('User',userData)
            }
        }
       

    } catch (error) {
        console.log('ОШИБОЧКА',error)
        next()
    }
}

export const authErrors = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err) {
      if (err.message === "jwt expired")
        res.status(401).send({ error: { message: "Token expired." } });
      else res.status(401).send({ error: { message: "Invalid token." } });
    } else next();
  };