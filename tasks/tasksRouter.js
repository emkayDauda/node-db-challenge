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

tasks.get("/:id", taskIdValidator, (req, res) => {
  db.get(req.params.id)
    .then(task => res.status(200).json({
        ...task,
        completed: task.completed ? true : false
    }))
    .catch(err => res.status(500).json({ message: err.message }));
});

tasks.post("/", taskBodyValidator, (req, res) => {
  db.insert(req.valTaskBody)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ message: err.message }));
});

function taskIdValidator(req, res, next) {
  db.get(req.params.id)
    .then(task => {
      if (task) {
        req.valTask = task;
        next();
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

function taskBodyValidator(req, res, next){
  const { project_id, description, notes, completed } = req.body
  if(!Object.keys(req.body).length){
      res.status(400).json({error: true, message: 'Request body missing'})
  } else if (!description || !project_id ) {
    res.status(400).json({error: true, message: 'Required params missing'})
  }
  else {
      req.valTaskBody = { project_id, description, notes }
      if(completed) req.valTaskBody.completed = completed
      next()
  }
}

module.exports = tasks;
