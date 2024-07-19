import { createBox } from '../controllers/box';
import { upload } from '../service/box-service';
import { validateUser } from './../middlewares/middlewares';
import { Router } from "express";




const router = Router()


// https://localhost:5000/api/box/create-box
router.post('/create-box', validateUser, upload.single('logo'), createBox)


export default router