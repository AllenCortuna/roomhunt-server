import express from 'express';
const router = express.Router();


// import {getAccomodators,signin , signup} from '../controllers/accommodator.js';
import {signin , signup} from '../controllers/accommodator.js';


// router.get('/', getAccomodators);
router.post('/signin', signin);
router.post('/signup', signup);

export default router;
