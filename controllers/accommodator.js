
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import AccommodatorModal from '../models/accommodator.js';
const secret = 'test';



export const getAccommodators = async (req, res) => { 
    try {
        const userModal = await AccommodatorModal.find()
        console.log('getuser ok');
        res.status(200).json(userModal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getAccommodator = async (req, res) => { 
    try {
        const userModal = await AccommodatorModal.findOne()
        console.log('getuser ok');
        res.status(200).json(userModal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const signin = async (req, res ) => {
    const { email, password } = req.body;

    try {
        const oldAccommodator = await AccommodatorModal.findOne({email});
        if (!oldAccommodator) return res.status(404).json({message: 'Accommodator does not exist '});

        const isPasswordCorrect = await bcrypt.compare(password ,oldAccommodator.password);

        if (!isPasswordCorrect) return res.status(404).json({message: 'Invalid password'});
 
        const token = jwt.sign({email: oldAccommodator.email, id: oldAccommodator._id},secret,{expiresIn: '1w'});
        console.log("login ok");
        res.status(200).json({result: oldAccommodator,token});
    } catch (err) {
        res.status(500).json({message: 'Something went wrong '});
    }
}


export const signup = async (req, res) => {
    const { email,password} = req.body;

    try {
        const oldAccommodator =  await AccommodatorModal.findOne({email});
        if (oldAccommodator)  return res.status(400).json({message: 'Accommodator already exist'});

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await AccommodatorModal.create({email,password: hashedPassword });

        const token = jwt.sign({email: result.email,id : result._id },secret, {expiresIn: '1w'})
        res.status(201).json({result,token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong '});
        console.log(error);
    }
}

