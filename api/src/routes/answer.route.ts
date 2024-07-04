import { Router } from 'express'
import { verifyToken } from '../middleware/jwt';
import { createAnswer, deleteAnswer, editAnswer, getAnswers, handleDownVote, handleUpVote } from '../controllers/answer.controller';
const router  = Router()

router.post('/add-answer/:id', verifyToken, createAnswer);
router.put('/upvote/:id', verifyToken, handleUpVote);
router.put('/downvote/:id', verifyToken, handleDownVote);
router.put('/edit/:id', verifyToken, editAnswer);
router.delete('/delete/:id', verifyToken, deleteAnswer);
router.get('/:id', getAnswers)



export default router;