const database = require('../database');
const _ = require('lodash');

async function getAllUsers() {
     return await database.list('users');
}

async function getUserByUsername(username) {
    return await database.get('users', { username });
}

async function insertNewUser(newUser) {
    return await database.insert('users', newUser);
}

module.exports = { 
    getAllUsers,
    getUserByUsername,
    insertNewUser,
};