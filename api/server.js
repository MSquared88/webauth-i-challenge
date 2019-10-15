const express = require('express')
const helmet = require('helmet')
const sessions = require('express-session')
const knexSessionsStore = require('connect-session-knex')(sessions)
const knexConfig = require('../database/db-config')

//routes
const userRouter = require('./users/users-router')

const server = express()


// global middleware
server.use(helmet())
server.use(express.json())
server.use(sessions({
    name: "monkey",
    secret: 'keyboard cat',
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionsStore({
        knex: knexConfig,
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })

}))

server.use('/api', userRouter)



module.exports = server