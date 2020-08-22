// api/users/:id 'get, put, delete' '/:id'

const router = require("express").Router();

const Users = require("./users-model.js");
const protected = require("../auth/auth-middleware.js");

router.get("/", protected, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => res.send(err));
});

module.exports = router;
