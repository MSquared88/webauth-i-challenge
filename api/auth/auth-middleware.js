module.exports = {
    restricted
}

const bcrypt = require('bcryptjs')

const usersModel = require('../users/users-model')

function restricted(req, res, next) {
    if(req.session && req.session.username){
        next()
    }
    else{
        res.status(401).json({message: 'You shall not pass!!'})
    }
}

