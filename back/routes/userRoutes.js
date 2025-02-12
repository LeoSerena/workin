import express from 'express';
import winston from 'winston';

import User from '../models/User.js';

const router = express.Router();

const PROFILE_DATA = {
  "_id" : 1,
  "username" : 1,
  "email" : 1,
  // "profile_picture" :1
}

router.get('/profile', async (req, res) => {
  const user_id = req.token_data.user_id
  winston.debug(req.token_data)

  const user = await User
    .findById( user_id )
    .select( PROFILE_DATA )
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