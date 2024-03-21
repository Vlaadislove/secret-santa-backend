import { validateUser } from './../middlewares/middlewares';
import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/auth";




const router = Router()


// https://localhost:5000/api/auth
router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', validateUser, logout)
// router.post('/logout', logout)


export default router