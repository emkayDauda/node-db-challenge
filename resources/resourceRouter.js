const express = require("express");

const db = require("./resourcesModel");

const resources = express.Router();

resources.get("/", (req, res) => {
  db.getResources()
    .then(resources => res.status(200).json(resources))
    .catch(err => res.status(500).json({ message: err.message }));
});

resources.get("/:id", (req, res) => {
  db.getResources(req.params.id)
    .then(resources => res.status(200).json(resources))
    .catch(err => res.status(500).json({ message: err.message }));
});

resources.post("/", (req, res) => {
  db.insert(req.body)
    .then(resource => res.status(200).json(resource))
    .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = resources;
