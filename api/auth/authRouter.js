const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/usersModel.js");
const secrets = require("../../config/secrets.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token: token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
