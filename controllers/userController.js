// controllers/userController.js
const pool = require('../db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY || 'dev_secret_key';

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'select user_id, username, password_hash, role from sport.app_user where username = $1',
      [username]
    );

    if (!result.rows.length) {
      return res.status(401).send('Invalid username or password');
    }

    const user = result.rows[0];

    // Временно сравниваем в лоб; позже замените на bcrypt.compare
    if (password !== user.password_hash) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign(
      { userId: user.user_id, username: user.username, role: user.role },
      secretKey,
      { expiresIn: '2h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.cookie('role', user.role, {
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const me = (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).send('Not authorized');
  res.json({ username: user.username, role: user.role });
};

module.exports = { login, me };
