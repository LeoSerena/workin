import express from 'express';

import { runningSession, bodySession, weightSession } from '../models/WorkoutSession.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.findOne( { id_ : req.token_data.user_id } );
    return res.status(200).json({ sessions : user.sessions });
});

router.post('/', async (req, res) => {
    const { data } = req.body
    console.log(data.workoutType + ' Session')
    switch(data.workoutType){
        case "Running":
            break;
        case "Weigth":
            break;
        case "BodyWeight":
            break;
        default:
            return res.status(400).json({ message : 'Wrong workoutType' })
    }
    return res.status(200).json({ message : ':`)'})
});

export default router;