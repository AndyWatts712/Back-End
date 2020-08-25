//api/lists/:id/tasks  '/'

//api/lists/:id/tasks/:id '/:id'

const router = require("express").Router();
const Tasks = require("./tasks-model.js");

router.get("/", (req, res) => {
  const listId = req.listId;

  Tasks.find(listId)
    .then((tasks) => {
      res.status(200).json({ data: tasks });
    })
    .catch((error) => {
      console.log("catch error to GET tasks");
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const listId = req.listId;
  const newTask = req.body;
  if (newTask) {
    //on success
    newTask["list_id"] = listId;
    Tasks.add(newTask)
      .then((task) => {
        res.status(200).json({ data: task });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({ message: "tasks must have a name and type_id." });
  }
});

router.get("/:id", (req, res) => {
  const listId = req.listId;
  const taskId = req.params.id;
  //decodedToken.subject is the user_id
  Tasks.findById(taskId)
    .then((task) => {
      if ((task["list_id"] = listId)) {
        res.status(200).json({ data: task });
      } else {
        res
          .status(401)
          .json({ error: "User is not permitted to access that task." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const changes = req.body;
  //decodedToken.subject is the user_id
  Tasks.update(taskId, changes)
    .then((updated) => {
      res.status(200).json({ data: updated });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const taskId = req.params.id;

  Tasks.remove(taskId)
    .then((deleted) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
