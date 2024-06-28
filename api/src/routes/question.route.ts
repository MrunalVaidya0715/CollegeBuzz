import { Router } from 'express'
import { createQuestion, embedQuestion, getQuestionById, getQuestions, getSimilarQuestions, handleDownVote, handleUpVote } from '../controllers/question.controller';
import { verifyToken } from '../middleware/jwt';
const router  = Router()

router.post('/embed-question', embedQuestion);
router.post('/create-question', verifyToken, createQuestion)
router.post('/find-similar-questions', getSimilarQuestions)
router.put('/upvote/:id', verifyToken, handleUpVote);
router.put('/downvote/:id', verifyToken, handleDownVote);
router.get('/single/:id', getQuestionById)
router.get('/', getQuestions)


export default router;