const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

const projectsRouter = require('./projects/projectsRouter')

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send("This works")
})

module.exports = server;