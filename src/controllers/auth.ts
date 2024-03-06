import { clientInfo } from './../middlewares/middlewares';
import { Response, Request } from "express";
import { loginService, logoutService, refreshService, registerService } from "../service/auth-service";
import { validateAccessToken } from '../service/token-service';
// import { IRequest } from "../middlewares/middlewares";

export const register = async (req: Request, res: Response) => {
    try {
        const {session,clientId, ...result} = await registerService(req.body, req.client);
        res.cookie("refresh_token", session.refreshToken, {
            expires: session.expiresAt,
            httpOnly: true,
            path: "/",
            signed: true, 
            secure: false,
          });

        res.cookie("access_token", result.accessToken, {
            expires: new Date(new Date().setMinutes(new Date().getMinutes() + 15)),
            httpOnly: true,
            path: "/",
            signed: true,
            secure: false,
          });
      
          return res.status(201).json({clientId});
    } catch (error) {
    }
}

export const login = async (req:Request, res:Response) =>{
    const {session,clientId, ...result} = await loginService(req.body, req.client)
    res.cookie("refresh_token", session.refreshToken, {
        expires: session.expiresAt,
        httpOnly: true,
        path: "/",
        signed: true, 
        secure: false,
      });

    res.cookie("access_token", result.accessToken, {
        expires: new Date(new Date().setMinutes(new Date().getMinutes() + 15)),
        httpOnly: true,
        path: "/",
        signed: true,
        secure: false,
      });
  
      return res.status(201).json({clientId});
}


export const refresh = async (req:Request, res:Response) => {
    const foo = await refreshService(req.signedCookies['refresh_token'], req.client)
}
// export const logout = async (req:Request, res:Response) => {
//     const foo = await logoutService(req.user.account.id, req.client)
// }
export const logout = async (req:Request, res:Response) => {
    const user = validateAccessToken(req.signedCookies['access_token'])
}