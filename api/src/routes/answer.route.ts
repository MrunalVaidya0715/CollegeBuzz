import { Router } from 'express'
import { verifyToken } from '../middleware/jwt';
import { createAnswer } from '../controllers/answer.controller';
const router  = Router()

router.post('/add-answer/:id', verifyToken, createAnswer)



export default router;