import express from 'express';
const router = express.Router();


import {getAccommodators, signin , signup} from '../controllers/accommodator.js';


router.get('/', getAccommodators);
router.post('/signin', signin);
router.post('/signup', signup);

export default router;
