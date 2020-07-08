const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.js');
const auth = require('../middleware/auth.js');
const router = express.Router();

//all about the users

// create users
router.post('/api/users/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.genirateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send('err');
  }
});

//login
router.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.genirateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/api/users/deactivate', async (req, res) => {
  try {
    User.findOneAndRemove(
      {
        email: req.body.email,
        password: req.body.password,
      },
      (err, user) => {
        if (user) {
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

//read profile
router.get('/api/user/me', auth, (req, res) => {
  try {
    res.send(req.user);
  } catch {
    res.status(400).send(err);
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
