// middleware/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY || 'dev_secret_key';

const auth = (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.status(401).send('Not authorized');

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};

module.exports = auth;
