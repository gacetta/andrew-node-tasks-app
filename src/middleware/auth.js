const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thhisismynewcourse');
    const user = await User.findOne({ _id: decoded.id})
    
    console.log('token:', token);
    console.log('decoded:', decoded);
    console.log('user:', user)
    if (!user) throw new Error();
    
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
}

module.exports = auth;