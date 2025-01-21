import express from 'express';

import User from '../models/User.js';

const router = express.Router();


router.get('/', async (req, res) => {
  const user = await User.findById( req.token_data.user_id )
    .populate('workoutSessions')
  console.log(user)
  if(!user) return res.status(500).json({ message : "User was not found"});
  return res.status(200).json( user.toJSON() );
})

// Update a user
router.put('/', (req, res) => {
  // TODO
});

// Delete a user
router.delete('/', (req, res) => {
  // TODO
});

export default router;