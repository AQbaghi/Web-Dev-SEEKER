const mongoose = require('mongoose');
const catagoryList = require('./catagoryList.js');

const JobSchema = new mongoose.Schema(
  {
    catagory: {
      type: String,
      required: true,
    },
    jobTitle: {
      required: true,
      type: String,
    },
    jobDescription: {
      required: true,
      type: String,
    },
    requiredSkills: [
      {
        required: true,
        type: String,
      },
    ],
    responsabilities: [
      {
        required: true,
        type: String,
      },
    ],
    advantages: [
      {
        type: String,
      },
    ],
    salary: {
      type: String,
      required: true,
    },
    JobOwner: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    keyWords: [
      {
        required: true,
        type: String,
      },
    ],
    companyName: {
      type: String,
      required: true,
    },
    companyAvatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

// JobSchema.pre('save', async function (next) {
//   const job = this;
//   let catagoryExists = false;
//   for (let i = 0; i < catagoryList.length; i++) {
//     if (job.catagory === catagoryList[i]) {
//       catagoryExists = true;
//     }
//   }
//   if (catagoryExists === false) {
//     console.log('lool');
//     throw new Error({ error: 'The Catagory Selected, does not exist.' });
//   }
//   next();
// });

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
