const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error('name must only contain letters');
      }
    },
  },
  lastName: {
    required: true,
    type: String,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error('name must only contain letters');
      }
    },
  },
  email: {
    required: true,
    unique: true,
    type: String,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Must contain email');
      }
    },
  },
  password: {
    required: true,
    type: String,
    validate(value) {
      if (value.length < 8) {
        throw new Error('password must be 8 charectors or more');
      }
    },
  },
});

//middleware______________________________________________________________________________________

//password encryption using bcrypt
UserSchema.pre('save', async function (next) {
  const user = this;
  const hashedPassword = await bcrypt.hash(user.password, 8);
  user.password = hashedPassword;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
