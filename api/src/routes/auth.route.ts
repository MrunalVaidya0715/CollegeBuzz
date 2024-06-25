import { Router } from 'express'
import { handleGoogleLogin, logout } from '../controllers/auth.controller';
const router  = Router()

router.post('/google-login', handleGoogleLogin)
router.post('/logout', logout)



export default router;