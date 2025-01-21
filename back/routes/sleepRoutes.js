import express from 'express';

import SleepRecord from '../models/SleepRecord.js'
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.findById( req.token_data.user_id );
    if(!user) return res.status(400).json({ error : "User not found" })
    return res.status(200).json( user.sleepRecords );
});

router.post('/', async (req, res) => {
    const { data } = req.body
    const user = await User.findById( req.token_data.user_id )
    if(!user) return res.status(400).json({ error : "User not found" })
    data.user_id = req.tken_data.user_id;
    const sleepRecord = new SleepRecord( data )
    user.sleepRecords.push( sleepRecord )
    try{
        await sleepRecord.save()
        await user.save()
    } catch (error) {
        res.status(500).json({message : "There was an error while saving data"})
    }
    

    return res.status(200).json({ message : ':`)'})
});

export default router;