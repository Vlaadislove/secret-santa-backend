import { Response, Request } from "express";
import { registerService } from "../service/auth-service";
// import { IRequest } from "../middlewares/middlewares";

export const register = async (req: Request, res: Response) => {
    try {
        const session = registerService(req.body, req.client)

    } catch (error) {

    }
}