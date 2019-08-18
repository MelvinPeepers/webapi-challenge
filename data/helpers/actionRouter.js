const express = require("express");

// import db helper files
const Actions = require("./actionModel.js");
const Projects = require("./projectModel.js");

// import express router
const router = express.Router();

// Setting up CRUD

// GET http://localhost:5000/api/actions/
router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The action information could not be retrieved."
    });
  }
});
// TESTED IN POSTMAN

// GET with ID http://localhost:5000/api/actions/1
router.get("/:id", validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Actions.get(id);
    res.status(200).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The action information could not be retrieved."
    });
  }
});
// TESTED IN POSTMAN

// POST http://localhost:5000/api/actions/
router.post("/", async (req, res) => {
  try {
    const action = await Actions.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding action."
    });
  }
});
// TESTED IN POSTMAN

// PUT http://localhost:5000/api/actions/1
router.put("/:id", validateActionId, async (req, res) => {
  try {
    res.status(200).json(await Actions.update(req.params.id, req.body));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the action"
    });
  }
});
// TESTED IN POSTMAN

// DELETE
router.delete("/:id", validateActionId, async (req, res) => {
  try {
    res.status(200).json(await Actions.remove(req.params.id));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The action could not be removed"
    });
  }
});

// When adding an action, make sure the `project_id` provided belongs to an existing `project`.
// If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
// Middleware

function validateActionId(req, res, next) {
  const { id } = req.params;

  Actions.get(id)
    .then(action => {
      if (action) {
        req.action = action;
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
