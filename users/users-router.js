// api/users/:id 'get, put, delete' '/:id'

const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => res.send(err));
});

//findById
router.get("/:id", checkUserExists, (req, res) => {
  res.status(200).json({data: req.entry})
});

//update
router.put("/:id", checkUserExists, (req, res) => {
  // do your magic!
  const { id } = req;
  const user = req.body;

  Users.update(id, user).then((item) => {
    if ((item = id)) {
      res.status(201).json({ ...user });
    } else {
      res.status(500).json({ error: "The user could not be updated" });
    }
  });
});

//remove
router.delete("/:id", checkUserExists, (req, res) => {
  const { id } = req;

  Users.remove(id).then((item) => {
    if (item == item > 0) {
      res.status(200).json({ message: `The user ${id} has been deleted` });
    } else {
      res.status(500).json({
        message: "Error removing the user",
      });
    }
  });
});

function checkUserExists(req,res,next) {
  Users.findById(req.params.id)
  .then((user) => {
    if (user) {
      req.id = req.params.id
      req.entry = user
      next()
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  })
  .catch((error) => {
    console.log(error);
    res
      .status(500)
      .json({ error: "The user information could not be retrieved." });
  });
}

module.exports = router;
