const db = require('../../database/db-config')

module.exports = {
    add, 
    get, 
    getById,
    // update,
    // remove
}

function add(user) {
    return db('users').insert(user)
}

function get() {
    return db('users')
}

function getById(id) {
    return db('users').where({id})
}

// function update() {

// }

// function remove() {

// }
