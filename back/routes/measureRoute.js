import express from 'express';

import Measure from '../models/Measure.js'
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.findById( req.token_data.user_id );
    if(!user) return res.status(400).json({ error : "User not found" })
    return res.status(200).json( user.measures );
});

router.post('/', async (req, res) => {
    const { data } = req.body
    const user = await User.findById( req.token_data.user_id )
    if(!user) return res.status(400).json({ error : "User not found" })
    data.user_id = req.tken_data.user_id;
    const measure = new Measure( data )
    user.measures.push( measure ) 
    try{
        await measure.save()
        await user.save()
    } catch (error) {
        res.status(500).json({message : "There was an error while saving data"})
    }
    return res.status(200).json({ message : ':`)'})
});

export default router;