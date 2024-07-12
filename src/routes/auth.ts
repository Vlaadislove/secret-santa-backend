import { validateUser } from './../middlewares/middlewares';
import { Router } from "express";
import { login, logout, me, refresh, register } from "../controllers/auth";




const router = Router()


// https://localhost:5000/api/auth
router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', validateUser, logout)
router.get('/me', validateUser, me)



export default router