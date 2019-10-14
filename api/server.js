const express = require('express')
const helmet = require('helmet')


//routes
const userRouter = require('./users/users-router')

const server = express()

// global middleware
server.use(helmet())
server.use(express.json())

server.use('/api', userRouter)



module.exports = server