const express = require('express')
const bcrypt = require('bcryptjs')

const usersModel = require('../users/users-model')
const {restricted} = require('../helpers/auth-middleware')


const router = express.Router()

router.post('/register', (req,res) => {
    const user = req.body

    const hash = bcrypt.hashSync(user.password, 8)

    user.password = hash

    if(!user.username || !user.password){
        res.status(400).json({message: 'username and password are required fields'})
    }
    else {

        usersModel.add(user)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: 'user could not be registered'}, err)
        })
    }


})

router.get('/users', restricted, (req, res) => {
    usersModel.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({meessage: 'could not get users', err})
    })
})

module.exports = router