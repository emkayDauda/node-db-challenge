const express = require('express')

const dbHelper = require('./projectsModel')

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

projects.get('/:id', (req, res) => {
    dbHelper.getProjects(req.params.id)
    .then(project => {
        res.status(200).json({...project, completed: project.completed ? true : false})
    })
    .catch(err => res.status(500).json({message: err.message}))
})

projects.post('/', (req, res) => {
    dbHelper.add(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({message: err.message}))
})

module.exports = projects;