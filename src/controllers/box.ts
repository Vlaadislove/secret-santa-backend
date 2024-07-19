
import { createBoxService } from './../service/box-service';
import { Response, Request } from "express";


export const createBox = (req: Request, res: Response) => {
    try {
        const data = createBoxService(req.body, req.file as Express.Multer.File, req.user.account.id)
    } catch (error) {

    }
}

export const getBoxes = () => { }

export const createCard = () => { }

export const getCard = () => { }

export const getCards = () => { }

export const getWard = () => { }



