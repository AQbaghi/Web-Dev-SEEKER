const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
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
          throw new Error(
            'must be 8 charectors or more, and contain uppercase and lowercase letters as well as numbers'
          );
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
    ownesCompany: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//middleware______________________________________________________________________________________

//password encryption using bcrypt when signing up
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
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
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  //save token to the database
  user.tokens = user.tokens.concat({ token });
  return token;
};

//sending back profile schema
UserSchema.methods.toJSON = function () {
  const user = this;
  //clone object
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
