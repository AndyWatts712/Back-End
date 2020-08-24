

// api/lists/   '/'

// api/lists/:id 'specific list with tasks' '/:id'

// api/lists/:id/tasks   (another router)

const router = require("express").Router();
const tasksRouter = require("./tasks/tasks-router.js");

const Lists = require("./lists-model.js");

router.get("/", (req, res) => {
    const userId = req.decodedToken.subject
    //decodedToken.subject is the user_id
    Lists.find(userId)
        .then(lists => {
            res.status(200).json({data: lists})
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })
});

// router.use("/api/lists/:id/tasks", tasksRouter);

module.exports = router