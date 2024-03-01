import {Request, Response} from 'express'

import { getPartyService, randomizeService } from "../service/randomize-service"


//Randomize
export const randomize = async (req:Request, res:Response) => {
    try {
        const {create, party} = req.body
        const status = await randomizeService(create, party)
        res.json(status)
    } catch (error) {
        res.json({error: error, message:'Ошибка при создание party'})
    }
}

export const getParty = async (req:Request, res:Response) => {
    try {
        const link = req.params.id
        const party = await getPartyService(link)
        res.json(party)
    } catch (error) {
        res.json({message:'Ошибка при получении  party'})
    }
}
