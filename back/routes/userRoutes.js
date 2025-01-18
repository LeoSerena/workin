const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({ error: error.message }));
});

// Get all users
router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json({ error: error.message }));
});

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

module.exports = router;
