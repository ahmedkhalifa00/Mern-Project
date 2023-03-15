const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const db = require('../metier/singeltonConnection')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      const email = decoded.email;

      const sql = 'SELECT * FROM users WHERE email = ?';
      db.query(sql, [email], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          req.user = {
            nom: results[0].nom,
            prénom: results[0].prénom,
            email: results[0].email,
            numéro: results[0].numéro,
          };

          next();
        } else {
          res.status(401);
          throw new Error('Not authorized');
        }
      });
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
