const database = require('../database');
const _ = require('lodash');

async function getAllPasswords() {
     return await database.list('passwords');
}

module.exports = { 
    getAllPasswords,   
};