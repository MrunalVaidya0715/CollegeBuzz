import { Router } from 'express'
import { getUser, getUserProfileAnswers, getUserProfileQuestions } from '../controllers/user.controller';
const router  = Router()

router.get('/:userId', getUser);
router.get('/profile-questions/:userId', getUserProfileQuestions)
router.get('/profile-answers/:userId', getUserProfileAnswers)

export default router;