import RandomizeSchema from "../models/randomize-model";
import { v1 as uuidv1 } from 'uuid'
import { sandEmailRandomize } from './mail-service'

export interface IPair {
    gifter: { name: string; email: string; };
    recipient: { name: string; email: string; }
}
export interface ICreate {
    name: string,
    email: string,
}

export const randomizeService = async (create:ICreate, party: { name: string, email: string }[]) => {
    try {
        function shuffledParty(party: { name: string, email: string }[]): IPair[] {
            const newArray = party.slice();
            const originalArray = party.slice();
            const draw: IPair[] = []

            do {
                for (let i = newArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
            } while (newArray.some((element, index) => element === party[index]));

            for (let i = 0; i < originalArray.length; i++) {
                draw.push({
                    gifter: originalArray[i],
                    recipient: newArray[i]
                })
            }
            return draw
        }
        const pairs = shuffledParty(party)
        const partyLink = uuidv1()
        await sandEmailRandomize(create, pairs, partyLink)

        const newRandomize = new RandomizeSchema({
            create,
            pairs,
            partyLink
        })
        await newRandomize.save()

        return { message: 'Successful save' }
    } catch (error) {
        return { message: 'Ошибка при создание party' }
    }
}

export const getPartyService = async (partyLink:string) => {
    try {
        const party = await RandomizeSchema.findOne({ partyLink })
        if(!party) return {message: 'Некоректная ссылка для получения party'}
        return party.pairs
    } catch (error) {
        console.log(error)
    }
}