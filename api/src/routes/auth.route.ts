import { Router } from 'express'
import { handleGoogleLogin } from '../controllers/auth.controller';
const router  = Router()

router.post('/google-login', handleGoogleLogin)



export default router;