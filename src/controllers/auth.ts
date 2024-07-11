import { Response, Request } from "express";
import { loginService, logoutService, refreshService, registerService } from "../service/auth-service";
import { truncate } from "fs";


export const register = async (req: Request, res: Response) => {
  try {
    const data = await registerService(req.body, req.client);

    if ('messageError' in data) {
      return res.status(409).json({ errorMessage: data.messageError });
    }

    const { session, deviceId, updateUser: { username, id, email }, ...result } = data
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

    return res.status(201).json({
      deviceId,
      username,
      id,
      email
    });
  } catch (error) {
    console.log(error)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginService(req.body, req.client)

    if ('messageError' in data) {
      return res.status(409).json({ errorMessage: data.messageError });
    }
    const { session, deviceId, updateUser: { username, email, id }, ...result } = data
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

    return res.status(201).json({
      deviceId,
      username,
      id,
      email
    });
  } catch (error) {
    console.log(error)
  }

}


export const refresh = async (req: Request, res: Response) => {
  try {
    const { session, clientId, error, ...result } = await refreshService(req.signedCookies['refresh_token'], req.client)

    if (error) return res.status(403).json(error)

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

    return res.status(201).json({ clientId });
  } catch (error) {
    console.log(error)
  }

}
// export const logout = async (req:Request, res:Response) => {
//     const foo = await logoutService(req.user.account.id, req.client)
// }
export const logout = async (req: Request, res: Response) => {
  try {
    const message = await logoutService(req.user.account.id, req.client)
    return res.status(200).json({ message });
  } catch (error) {
    console.log(error)
  }

}