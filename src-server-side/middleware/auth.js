const jwt = require('jsonwebtoken');
const User = require('../Models/User.js');

// express middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.send({ error: 'please authenticate' });
  }
};

module.exports = auth;
