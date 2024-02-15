import { Router } from "express";
import { getParty, randomize } from "../controllers/randomize";


const router = Router()

// Randomize
// https://localhost:5000/api/randomize/
router.post('/', randomize)
router.get('/:id', getParty)

export default router