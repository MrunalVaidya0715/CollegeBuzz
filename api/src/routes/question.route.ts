import { Router } from 'express'
import { createQuestion, deleteQuestion, editQuestion, embedQuestion, getQuestionById, getQuestions, getQuestionsBySearch, getQuestionsToContribute, getSimilarQuestions, getTopQuestions, getUserQuestions, handleDownVote, handleQuestionReport, handleUpVote } from '../controllers/question.controller';
import { verifyToken } from '../middleware/jwt';
const router  = Router()

router.post('/embed-question', embedQuestion);
router.post('/create-question', verifyToken, createQuestion)
router.post('/find-similar-questions', getSimilarQuestions)
router.put('/upvote/:id', verifyToken, handleUpVote);
router.put('/downvote/:id', verifyToken, handleDownVote);
router.put('/edit/:id', verifyToken, editQuestion);
router.put('/report/:id', verifyToken, handleQuestionReport);
router.delete('/delete/:id', verifyToken, deleteQuestion);
router.get('/search', getQuestionsBySearch);
router.get('/my-questions', verifyToken, getUserQuestions);
router.get('/contribute', getQuestionsToContribute)
router.get('/top-questions', getTopQuestions)
router.get('/single/:id', getQuestionById)
router.get('/', getQuestions)


export default router;