import express from 'express';
const router = express.Router();


import { signin , signup, verifyAcc, verifyEmail} from '../controllers/accommodator.js';


// router.get('/', getAccommodators);
// router.get('/', getAccommodator);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/verify-acc', verifyAcc);

export default router;
