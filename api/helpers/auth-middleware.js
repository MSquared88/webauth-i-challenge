module.exports = {
    restricted
}

const bcrypt = require('bcryptjs')

const usersModel = require('../users/users-model')

function restricted(req, res, next) {
    const {username, password} = req.headers


    if(username && password){
        usersModel.getBy({ username })
        .then(user => {
            console.log(user)
            if(user && bcrypt.compareSync(password, user.password)){
                next()
            }
            else{
                res.status(401).json({message: 'You shall not pass!!!'})
            }
        })
        .catch(err => {
            res.status(401).json({message: 'Invalid credentials'})
        })
    }
    else{
        res.status(500).json({message: 'please provide credentials'})
    }
}

// if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'You cannot pass!!' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
//   } else {
//     res.status(400).json({ message: 'please provide credentials' });
//   }