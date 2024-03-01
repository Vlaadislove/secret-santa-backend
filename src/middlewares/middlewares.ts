// import { NextFunction, Request, Response } from "express";
import * as settings from "../settings";
import { Request, Response, NextFunction } from 'express-serve-static-core'

export interface IClientInfo {
    id: string | null ;
    host: string | undefined;
    agent: string | undefined;
}

export interface IRequest extends Request {
    client?: IClientInfo;
};


export const clientInfo = (
    req: IRequest,
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
