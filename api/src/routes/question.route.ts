import { Router } from 'express'
import { createQuestion, embedQuestion, getQuestions, getSimilarQuestions } from '../controllers/question.controller';
import { verifyToken } from '../middleware/jwt';
const router  = Router()

router.post('/embed-question', embedQuestion);
router.post('/create-question', verifyToken, createQuestion)
router.post('/find-similar-questions', getSimilarQuestions)
router.get('/', getQuestions)


export default router;