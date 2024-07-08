import { Router } from 'express'
import { addWord, getWords } from '../controllers/badword.controller';
import { verifyToken } from '../middleware/jwt';
const router  = Router()

router.post('/add-word', verifyToken, addWord);
router.get('/', getWords);

export default router;