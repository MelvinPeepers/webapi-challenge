// created and setup server.js

const express = require("express");

const actionRouter = require("./data/helpers/actionRouter.js");
const projectRouter = require("./data/helpers/projectRouter.js");

const server = express();

// middleware - converts the data to JSON
server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's do this Sprint Challenge!</h2>`);
});

module.exports = server;
