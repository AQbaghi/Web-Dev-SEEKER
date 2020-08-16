const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const TempUserSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Must contain email');
        }
      },
    },
    verified: {
      required: true,
      type: Boolean,
    },
    verificationCode: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//middleware______________________________________________________________________________________

const TempUser = mongoose.model('TempUser', TempUserSchema);

module.exports = TempUser;
