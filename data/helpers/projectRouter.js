const express = require("express");

// import db helper files
const Actions = require("./actionModel.js");
const Projects = require("./projectModel.js");

// import express router
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The project information could not be retrieved."
    });
  }
});
// TESTED IN POSTMAN

// POST
router.post("/", async (req, res) => {
  try {
    const projects = await Projects.insert(req.body);
    res.status(201).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding project."
    });
  }
});
// TESTED IN POSTMAN

// PUT http://localhost:5000/api/projects/1
router.put("/:id", async (req, res) => {
  try {
    res.status(200).json(await Projects.update(req.params.id, req.body));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the project."
    });
  }
});
// TESTED IN POSTMAN

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    res.status(200).json(await Projects.remove(req.params.id));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The project could not be removed."
    });
  }
});

module.exports = router;
