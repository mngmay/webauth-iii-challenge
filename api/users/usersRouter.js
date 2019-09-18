const router = require("express").Router();

const Users = require("./usersModel.js");
const restricted = require("../auth/restrictedMiddleware.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      let userDept = users.filter(user => req.user.username === user.username);

      let sameDept = users.filter(
        user => user.department === userDept[0].department
      );

      res.status(200).json({ sameDept, loggedInUser: req.user.username });
    })
    .catch(err => res.send(err));
});

module.exports = router;
