import { Router } from 'express'
import { addWord } from '../controllers/badword.controller';
import { verifyToken } from '../middleware/jwt';
const router  = Router()

router.post('/add-word', verifyToken, addWord);

export default router;