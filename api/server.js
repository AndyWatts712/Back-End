const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//--routers
const usersRouter = require("../users/users-router.js");
const listsRouter = require("../lists/lists-routers.js");
const authRouter = require("../auth/auth-router.js");
const restricted = require("../auth/auth-middleware.js");
const taskRouter = require("../lists/tasks/tasks-router.js");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", restricted, usersRouter);
server.use("/api/lists", restricted, listsRouter);

server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "started" });
});

module.exports = server;
