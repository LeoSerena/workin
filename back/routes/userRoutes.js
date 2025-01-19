import express from 'express';

import User from '../models/User.js';

const router = express.Router();

// Update a user
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
});

// Delete a user
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) return res.status(404).json({ error: 'User not found' });
      res.status(204).send();
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

export default router;