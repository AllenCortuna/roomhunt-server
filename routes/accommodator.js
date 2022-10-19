import express from 'express';
const router = express.Router();


import { login , signup, verifyAcc, verifyEmail} from '../controllers/accommodator.js';


// router.get('/', getAccommodators);
// router.get('/', getAccommodator);
router.post('/login', login);
router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/verify-acc', verifyAcc);

export default router;
