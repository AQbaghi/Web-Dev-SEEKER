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

//delete user
router.delete('/api/users/deactivate', auth, async (req, res) => {
  try {
    await req.user.delete();
    res.send({
      message: 'user has been succesfully deleted.',
      userInfo: req.user,
    });
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

//update user info
router.patch('/api/users/update', auth, async (req, res) => {
  const change = req.body;

  // validation to updates
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res
      .status(400)
      .send({ error: 'you can only update a valid user entery' });
  }
  try {
    updates.forEach((update) => (req.user[update] = change[update]));
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//logout user
router.post('/api/users/logout', auth, async (req, res) => {
  try {
    console.log(req.user.tokens);
    req.user.tokens = req.user.tokens.filter((token) => {
      console.log(token);
      if (token.token !== req.token) {
        return token;
      }
    });
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

//logout all users
router.post('/api/users/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
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
