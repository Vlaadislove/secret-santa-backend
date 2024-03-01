import { Router } from "express";
import { register } from "../controllers/auth";



const router = Router()


// https://localhost:5000/api/auth
router.post('/register', register)
// router.get('/:id', getParty)

export default router