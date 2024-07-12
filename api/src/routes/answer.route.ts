import { Router } from 'express'
import { verifyToken } from '../middleware/jwt';
import { answerSummary, createAnswer, deleteAnswer, editAnswer, getAnswers, handleAnswerReport, handleDownVote, handleUpVote } from '../controllers/answer.controller';
const router  = Router()

router.post('/answer-summary', answerSummary);
router.post('/add-answer/:id', verifyToken, createAnswer);
router.put('/upvote/:id', verifyToken, handleUpVote);
router.put('/downvote/:id', verifyToken, handleDownVote);
router.put('/edit/:id', verifyToken, editAnswer);
router.put('/report/:id', verifyToken, handleAnswerReport);
router.delete('/delete/:id', verifyToken, deleteAnswer);
router.get('/:id', getAnswers)



export default router;