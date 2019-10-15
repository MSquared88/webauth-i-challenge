const db = require('../../database/db-config')

module.exports = {
    add, 
    get, 
    getBy,
    // update,
    // remove
}

function add(user) {
    return db('users').insert(user)
}

function get() {
    return db('users')
}

function getBy(filter) {
    return db('users').where(filter).first()
}

// function update() {

// }

// function remove() {

// }
