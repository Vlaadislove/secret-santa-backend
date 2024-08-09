import path from 'path';
import { v4 as uuidv4 } from 'uuid'
import multer, { Multer } from 'multer';
import userModel from '../models/user-model';
import boxModel from '../models/box-model';


export interface IData {
	useWish: boolean
	cashLimitMax: number | null
	cashLimitCurrency: string
	cashLimitMin: number | null
	nameBox: string,
	picture: string | null,
	useCashLimit: boolean,
	useNames: boolean,
	usePhone: boolean,

	[key: string]: string | number | boolean | null | undefined;
}


export const createBoxService = async (data: IData, file: Express.Multer.File, userId: string) => {
	try {
		const boxRules = transformObject(data)
		const user = await userModel.findById(userId)
		if (!user) return { error: { message: 'User not found' } }

		const box = new boxModel({
			box: {
				useWish: boxRules.useWish,
				cashLimitMax: boxRules.cashLimitMax,
				cashLimitCurrency: boxRules.cashLimitCurrency,
				cashLimitMin: boxRules.cashLimitMin,
				nameBox: boxRules.nameBox,
				useCashLimit: boxRules.useCashLimit,
				useNames: boxRules.useNames,
				usePhone: boxRules.usePhone,
			},
			admin: {
				email: user.email,
				username: user.username,
			},
		})

		if (file) {
			box.box.logo = file.filename
			box.box.picture = null
		} else if (boxRules.picture) {
			box.box.picture = boxRules.picture
			box.box.logo = null
		}

		user.boxes.push(box._id)
		box.box.inviteLink = `http://localhost:5173/box?join=${String(box._id)}`

		await box.save()
		await user.save()
		return box._id
	} catch (error) {
		console.log(error)
	}


}

const transformObject = (obj: IData) => {
	for (let key in obj) {
		if (obj[key] === "null") {
			obj[key] = null;
		} else if (obj[key] === "false") {
			obj[key] = false;
		} else if (obj[key] === "true") {
			obj[key] = true;
		} else if (obj[key] === "undefined") {
			obj[key] = undefined;
		} else if (typeof obj[key] === 'string' && !isNaN(Number(obj[key]))) {
			obj[key] = Number(obj[key]);
		}
	}
	return obj;
}


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'src/uploads/');
	},
	filename: (req, file, cb) => {
		const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
		cb(null, uniqueName);
	}
});
export const upload = multer({ storage: storage })
