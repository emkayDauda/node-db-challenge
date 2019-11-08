const express = require("express");

const db = require("./tasksModel");

const tasks = express.Router();

tasks.get("/", (req, res) => {
  db.get()
    .then(tasks =>
      res.status(200).json(
        tasks.map(t => {
          return {
            ...t,
            completed: t.completed ? true : false
          };
        })
      )
    )
    .catch(err => res.status(500).json({ message: err.message }));
});

tasks.get("/:id", (req, res) => {
  db.get(req.params.id)
    .then(task => res.status(200).json({
        ...task,
        completed: task.completed ? true : false
    }))
    .catch(err => res.status(500).json({ message: err.message }));
});

tasks.post("/", (req, res) => {
  db.insert(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = tasks;
