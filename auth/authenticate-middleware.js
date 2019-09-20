const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')


module.exports = (req, res, next) => {
  const token = rq.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Login or Token Expired.' })
      } else {
        req.user = { username: decodedToken.username }
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'No Credentials provided!' });
  }
};
