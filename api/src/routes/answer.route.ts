import { Router } from 'express'
import { verifyToken } from '../middleware/jwt';
import { createAnswer, getAnswers, handleDownVote, handleUpVote } from '../controllers/answer.controller';
const router  = Router()

router.post('/add-answer/:id', verifyToken, createAnswer);
router.put('/upvote/:id', verifyToken, handleUpVote);
router.put('/downvote/:id', verifyToken, handleDownVote);
router.get('/:id', getAnswers)



export default router;