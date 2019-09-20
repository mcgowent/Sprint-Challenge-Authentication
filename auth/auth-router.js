const router = require('express').Router();
const bcrypt = require('bcryptjs');

const restricted = require('./authenticate-middleware.js')
const generateToken = require('./generateToken.js')
const Users = require('./auth-helpers.js')

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user).then(saved => { res.status(200).json(saved) }).catch(error => { res.status(500).json(error) })
});

router.post('/login', restricted, (req, res) => {
  // implement login

});

module.exports = router;
