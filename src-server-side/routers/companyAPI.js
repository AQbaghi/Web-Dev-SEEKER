const express = require('express');
const Company = require('../Models/Company.js');
const auth = require('../middleware/auth.js');
const router = express.Router();

//all about the Company

// create Company
router.post('/api/company/create', auth, async (req, res) => {
  const company = new Company({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await company.save();
    res.status(201).send(company);
  } catch (err) {
    res.status(400).send(err);
  }
});

//read profile
router.get('/api/company/me', auth, async (req, res) => {
  try {
    const company = await Company.find({ owner: req.user._id });
    res.send(company);
  } catch (err) {
    res.status(400).send(err);
  }
});

//update company info
router.patch('/api/company/update', auth, async (req, res) => {
  const change = req.body;
  const companyArray = await Company.find({ owner: req.user._id });
  const company = companyArray[0];

  // validation to updates
  const allowedUpdates = ['companyName', 'description', 'location'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res
      .status(400)
      .send({ error: 'you can only update a valid company entery' });
  }
  try {
    updates.forEach((update) => console.log(change[update]));
    updates.forEach((update) => {
      company[update] = change[update];
      console.log(company[update]);
    });
    await company.save();
    res.send(company);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
