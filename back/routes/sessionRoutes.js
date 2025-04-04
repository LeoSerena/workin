import express from 'express';

import { workoutSession, runningSession, bodySession, weightSession } from '../models/WorkoutSession.js';
import User from '../models/User.js';
import winston from 'winston';

const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req.token_data)
    const user = await User
        .findById( req.token_data.user_id )
        .populate('workoutSessions');
    if(!user) return res.status(400).json({ error : "User not found" })
    return res.status(200).json({ sessions : user.workoutSessions });
});

/**
 * @route POST /
 * @description Adds a workout session to the authenticated user's profile
 * @access Private (requires authentication token with user ID)
 * 
 * @body {object} data - The workout session data
 * @body {string} data.workoutType - Type of workout session ("Running", "Weight", or "BodyWeight")
 * @body {array} data.workoutRecords - Array of workout records for the session
 * 
 * @example
 * // Request Body for a Running Session
 * {
 *   "data": {
 *     "workoutType": "Running",
 *     "sessionName" : "fractionned"
 *     "workoutRecords": [
 *       { "distance": 5, "duration": "00:25:00", "repetitions": 1 }
 *     ]
 *   }
 * }
 * 
 * @response {200} Success - Successfully added the workout session
 * @response {400} Bad Request - User not found or invalid workoutType
 * @response {500} Internal Server Error - Unexpected server error
 */
router.post('/', async (req, res) => {
    try{
        const { data } = req.body
        winston.debug("posted session: " + data)
        const user = await User.findById( req.token_data.user_id )
        if(!user) return res.status(400).json({ error : "User not found" })
        data.user_id = req.token_data.user_id
        var session = {};
        switch(data.sessionType){
            case "Running":
                session = new runningSession(data)
                break;
            case "Weight":
                session = new weightSession(data)
                break;
            case "BodyWeight":
                session = new bodySession(data)
                break;
            default:
                return res.status(400).json({ message : 'Wrong workoutType' })
        }
        user.workoutSessions.push(session)
        await session.save()
        await user.save()
    } catch (error) {
        winston.error(error)
        return res.status(500).json({message : "There was an error while saving data"  + error})
    }
    

    return res.status(200).json({ message : ':`)'})
});

/**
 * @route POST /workout
 * @description Adds a workout record to an existing workout session
 * @access Private (requires authentication)
 * 
 * @body {object} data - The data to add to the workout session
 * @body {string} data.session_id - The ID of the workout session to update
 * @body {object} data.workout_data - The workout record to add to the session
 * 
 * @example
 * // Request Body for a Running Session
 * {
 *   "data": {
 *     "session_id": "12345abcd",
 *     "workout_data": {
 *       "distance": 5,
 *       "duration": "00:25:00",
 *       "repetitions": 1
 *     }
 *   }
 * }
 * 
 * 
 * @response {200} Success - The workout record was successfully added to the session
 * @response {400} Bad Request - Session not found or invalid input
 * @response {500} Internal Server Error - An unexpected error occurred
 */

router.post('/workout', async (req, res) => {
    const { data } = req.body;
    winston.debug(data)
    const session = await workoutSession.findById( data.session_id );
    if(!session) return res.status(400).json({ error : "Session not found" });
    if( session.user_id !== req.token_data.user_id ) return res.status(403).json({ error : "What are you trying to do here?"});
    session.workoutRecords.push( data.workout_data );
    try{    
        await session.save();
        return res.status(200).json({message : "workout saved successfuly"})
    } catch ( error ){
        return res.status(500).json({message : "There was an error while saving data"})
    }
    
})

router.delete('/', async (req, res) => {
    const { data } = req.body;
    winston.debug("deleting session: " + data.session_id);
    try {
        const session = await workoutSession.findById(data.session_id);
        console.log(session)
        if (!session) return res.status(400).json({ error: "Session not found" });
        if (session.user_id !== req.token_data.user_id) {
            return res.status(403).json({ error: "What are you trying to do here?" });
        }
        await session.deleteOne();
        return res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        winston.error("Error deleting session: ", error);
        return res.status(500).json({ message: "There was an error while deleting the session" });
    }
});

export default router;