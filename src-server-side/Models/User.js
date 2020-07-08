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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//middleware______________________________________________________________________________________

//password encryption using bcrypt when signing up
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;
  }
  next();
});

//logging in user with email and password user middleware-mongoose-schema
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!email) {
    throw new Error('unable to login user');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('unable to login user');
  }
  return user;
};

// instance middleware before signing up and logging in jwt genirator
UserSchema.methods.genirateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'theSecret');
  //save token to the database
  user.tokens = user.tokens.concat({ token });
  return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
