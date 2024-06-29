import { Router } from 'express'
import { verifyToken } from '../middleware/jwt';
import { createAnswer, getAnswers } from '../controllers/answer.controller';
const router  = Router()

router.post('/add-answer/:id', verifyToken, createAnswer)
router.get('/:id', getAnswers)



export default router;