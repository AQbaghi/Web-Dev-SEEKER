const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/User.js');
const router = express.Router();

//all about the users

// creat users
router.post('/api/users/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (user.length === 0) {
      return res
        .status(404)
        .send({ error: 'please conferm your email, and password.' });
    }

    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

router.delete('api/users/deactivate', async (req, res) => {
  try {
    User.findOneAndRemove(
      {
        email: req.body.email,
        password: req.body.password,
      },
      (err) => {
        if (!err) {
          return res.send({ success: 'user successfully deleted!' });
        } else {
          return res.status(404).send({ error: 'user no longer exists.' });
        }
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete route later______________________________________________
router.get('/api/users/show-all', (req, res) => {
  try {
    User.find({}).then((user) => {
      res.status(200).send(user);
    });
  } catch {
    res.status(400).send(err);
  }
});

module.exports = router;
