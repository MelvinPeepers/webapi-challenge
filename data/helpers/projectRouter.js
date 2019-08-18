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

// GET with ID http://localhost:5000/api/projects/1
router.get("/:id", validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.get(id);
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The project information could not be retrieved."
    });
  }
});
// TESTED IN POSTMAN

// POST http://localhost:5000/api/projects/ "name": & "description":
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
router.put("/:id", validateProjectId, async (req, res) => {
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
router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    res.status(200).json(await Projects.remove(req.params.id));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The project could not be removed."
    });
  }
});

// When adding an action, make sure the `project_id` provided belongs to an existing `project`.
// If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
// Middleware
// test on POSTMAN http://localhost:5000/api/projects/5
function validateProjectId(req, res, next) {
  const { id } = req.params;

  Projects.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "invalid action ID." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error validating the action."
      });
    });
}

module.exports = router;
