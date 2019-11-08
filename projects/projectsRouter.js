const express = require('express')

const dbHelper = require('./projectsModel')

const resource = require('../resources/resourcesModel')

const projects = express.Router()

projects.get('/', (req, res) => {
    dbHelper.getProjects()
    .then(projects => res.status(200).json(projects.map(p => {
        return {
            ...p,
            completed: p.completed ? true : false
        }
    })))
    .catch(err => res.status(500).json({message: err.message}))
})

projects.get('/:id', projectIdValidator, (req, res) => {
    res.status(200).json(req.valProject)
   
})

projects.get('/:id/resources', projectIdValidator, (req, res) => {
    resource.getProjectResources(req.valProject.project_id)
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(err => res.status(500).json({message: err.message}))
})

projects.post('/', projectBodyValidator, (req, res) => {
    dbHelper.add(req.valProjBody)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({message: err.message}))
})

function projectIdValidator(req, res, next) {
    const id = req.params.id
    dbHelper.getProjects(id)
    .then(project => {
        req.valProject = {...project, completed: project.completed ? true : false}
        next()
    })
    .catch(err => res.status(500).json({message: err.message}))
}

function projectBodyValidator(req, res, next){
    const { project_name } = req.body
    if(!Object.keys(req.body).length || !project_name){
        res.status(400).json({error: true, message: 'Required params missing'})
    }
    else {
        req.valProjBody = { project_name }
        next()
    }
}

module.exports = projects;