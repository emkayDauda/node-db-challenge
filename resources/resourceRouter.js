const express = require("express");

const db = require("./resourcesModel");

const resources = express.Router();

resources.get("/", (req, res) => {
  db.getResources()
    .then(resources => res.status(200).json(resources))
    .catch(err => res.status(500).json({ message: err.message }));
});

resources.get("/:id", resourceIdValidator, (req, res) => {
  res
    .status(200)
    .json({ error: false, message: "Success", data: req.valResource });
});

resources.post("/", resourceBodyValidator, (req, res) => {
  db.insert(req.valResBody)
    .then(resource => res.status(200).json(resource))
    .catch(err => res.status(500).json({ message: err.message }));
});

function resourceIdValidator(req, res, next) {
  db.getResources(req.params.id)
    .then(resource => {
      if (resource) {
        req.valResource = resource;
        next();
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
}

function resourceBodyValidator(req, res, next){
  const { resource_name, description } = req.body
  if(!Object.keys(req.body).length){
      res.status(400).json({error: true, message: 'Request body missing'})
  } else if (!resource_name ) {
    res.status(400).json({error: true, message: 'Required params missing'})
  }
  else {
      req.valResBody = { resource_name, description }
      next()
  }
}

module.exports = resources;
