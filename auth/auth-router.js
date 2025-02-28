const router = require('express').Router();
const bcrypt = require('bcryptjs');

const generateToken = require('./generateToken.js')
const Users = require('./auth-helpers.js')

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user).then(saved => { res.status(201).json(saved) }).catch(error => { res.status(500).json(error) })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username }).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(201).json({
          message: `Welcome ${user.username}!`, token
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
});

module.exports = router;
