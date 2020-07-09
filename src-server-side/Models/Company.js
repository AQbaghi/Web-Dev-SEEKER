const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  companyName: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  location: {
    type: String,
  },
  owner: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model('Company', UserSchema);

module.exports = Company;
