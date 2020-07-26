const express = require('express');
const Company = require('../Models/Company.js');
const Job = require('../Models/Job.js');
const auth = require('../middleware/auth.js');
const router = express.Router();

//all about the Jobs

// create a job posting
router.post('/api/job/post', auth, async (req, res) => {
  try {
    const { companyName, location, _id } = await Company.findOne({
      owner: req.user._id,
    });
    const job = new Job({
      ...req.body,
      location,
      JobOwner: _id,
      companyName,
    });

    await job.save();
    console.log(job);
    res.status(201).send(job);
  } catch (err) {
    res.status(500).send(err);
  }
});

//view job
router.get('/api/job/info/:_id', async (req, res) => {
  try {
    const _id = req.params._id;
    const job = await Job.findById(_id);
    const companyInfo = await Company.findOne({ _id: job.JobOwner });
    res.send({ job, companyInfo });
  } catch (err) {
    res.status(400).send(err);
  }
});

//view all jobs --must include search and pagination
router.get('/api/job/all-job', async (req, res) => {
  //qury link example
  // /api/job/all-job?limit=10&skip=0?catagory=WebDev
  let sortValue = -1;
  try {
    const job = await Job.find({})
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ createdAt: sortValue });
    res.send(job);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
