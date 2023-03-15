const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler')
const db =require('../metier/singeltonConnection');
const User = require('../models/userModel')


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req,res) => {
  const { nom,prénom, email, numéro,password } = req.body

  if (!nom  || !prénom|| !email || !numéro || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
     // Hash password

     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)

  // Check if user exists in the database

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (error, results) => {
  if (error) throw error;
  if (results.length > 0) {
    res.status(400);
    throw new Error('User already exists');
  } else {
    // Create user
    const sql = 'INSERT INTO users (nom,prénom ,email,numéro, password) VALUES (?,?,?,?,?)';
    db.query(sql, [nom,prénom,email,numéro,hashedPassword], (error, results) => {
      if (error) throw error;

      const User = {
        nom:nom,
        prénom:prénom,
        email:email,
        numéro:numéro,
        password:password,
      };

      console.log(User);

      res.status(201).json({
        ...User,
        token: generateToken(User.email),
      });
    });
  }
});
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check for user email

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const User = {
        nom: results[0].nom,
        prénom: results[0].prénom,
        email: results[0].email,
        numéro: results[0].numéro,
        password: results[0].password,
      };
      console.log(User);
      if (bcrypt.compareSync(password, User.password)) {
        res.json({
          ...User,
          token: generateToken(User.email),
        });
      } else {
        res.status(400);
        throw new Error('Invalid credentials');
      }
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
})

  // Generate JWT
  const generateToken = (email) => {
  return jwt.sign({email}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}

