import express from 'express';
const router = express.Router();


import { signin , signup, verifyEmail} from '../controllers/accommodator.js';


// router.get('/', getAccommodators);
// router.get('/', getAccommodator);
router.post('/signin', signin);
router.post('/signup', signup);
router.put('/verify-email', verifyEmail);

export default router;
