import { Router } from 'express'
import { getUser, getUserProfileQuestions } from '../controllers/user.controller';
const router  = Router()

router.get('/:userId', getUser);
router.get('/profile-questions/:userId', getUserProfileQuestions)

export default router;