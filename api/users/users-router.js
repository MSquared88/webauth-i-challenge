const express = require('express')
const bcrypt = require('bcryptjs')

const usersModel = require('../users/users-model')
const {restricted} = require('../auth/auth-middleware')


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

router.post('/login', (req, res) => {
    const { username, password } = req.body

    usersModel.getBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username

        console.log('session', req.session)
        res.status(200).json({
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });

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

router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        res
          .status(200)
          .json({ 
            message: 'successfully logged out',
          });
      });
    } else {
      res.status(200).json({ message: 'already logged out' });
    }
})

module.exports = router