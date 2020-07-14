const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
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
    if (req.user.ownesCompany === true) {
      return res
        .status(500)
        .send({ error: 'you are only allowd one company per user.' });
    }
    req.user.ownesCompany = true;
    await req.user.save();
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
    });
    await company.save();
    res.send(company);
  } catch (err) {
    res.status(500).send(err);
  }
});

//company avatar routes

//company avatar profile picture upload
const avatar = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error('file must be an image'));
    }
    cb(undefined, true);
  },
});
router.post(
  '/api/company/me/avatar',
  auth,
  avatar.single('avatar'),
  async (req, res) => {
    const companyOwner = req.user._id;
    const company = await Company.findOne({ owner: companyOwner });
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    company.avatar = buffer;
    await company.save();
    res
      .status(201)
      .send({ success: 'avatar picture was successfully uploaded' });
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

//avatar profile picture delete
router.delete('/api/company/me/avatar', auth, async (req, res) => {
  try {
    const companyOwner = req.user._id;
    const company = await Company.findOne({ owner: companyOwner });
    if (!company.avatar) {
      res
        .status(400)
        .send({ error: 'can not delete non existing avatar picture' });
    }
    company.avatar = undefined;
    await company.save();
    res.send({ success: 'avatar picture was successfully deleted' });
  } catch (err) {
    res.status(500).send({ error: 'can not delete avatar profile picture' });
  }
});

module.exports = router;
