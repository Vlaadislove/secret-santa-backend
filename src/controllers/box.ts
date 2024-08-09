
import { createBoxService } from './../service/box-service';
import { Response, Request } from "express";


export const createBox = async (req: Request, res: Response) => {
	try {
		const box = await createBoxService(req.body, req.file as Express.Multer.File, req.user.account.id)
		return res.status(200).json(box)
	} catch (error) {
		console.log(error)
	}
}

export const getBoxes = () => { }

export const createCard = () => { }

export const getCard = () => { }

export const getCards = () => { }

export const getWard = () => { }



