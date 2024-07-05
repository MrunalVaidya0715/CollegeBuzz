import { Router } from 'express'
import { getUserProfileQuestions } from '../controllers/user.controller';
const router  = Router()

router.get('/profile-questions/:userId', getUserProfileQuestions)

export default router;