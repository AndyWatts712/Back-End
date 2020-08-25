const router = require("express").Router();
const tasksRouter = require("./tasks/tasks-router.js");
const { listValidation } = require("./req-validation");

const Lists = require("./lists-model.js");

router.get("/", (req, res) => {
  const userId = req.decodedToken.subject;
  //decodedToken.subject is the user_id
  Lists.find(userId)
    .then((lists) => {
      res.status(200).json({ data: lists });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const userId = req.decodedToken.subject;
  const newList = req.body;
  if (listValidation(newList)) {
    //on success
    newList["user_id"] = userId;
    Lists.add(newList)
      .then((list) => {
        res.status(200).json({ data: list });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({ message: "Lists must have a name and type_id." });
  }
});

router.get("/:id", (req, res) => {
  const userId = req.decodedToken.subject;
  const listId = req.params.id;
  //decodedToken.subject is the user_id
  Lists.findById(listId)
    .then((list) => {
      if ((list["user_id"] = userId)) {
        res.status(200).json({ data: list });
      } else {
        res
          .status(401)
          .json({ error: "User is not permitted to access that list." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  const listId = req.params.id;
  const changes = req.body;
  //decodedToken.subject is the user_id
  Lists.update(listId, changes)
    .then((updated) => {
      res.status(200).json({ data: updated });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const listId = req.params.id;

  Lists.remove(listId)
    .then((deleted) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
router.use("/:id/tasks", saveListId, tasksRouter);

function saveListId(req, res, next) {
  req.listId = req.params.id;
  next();
}

module.exports = router;
