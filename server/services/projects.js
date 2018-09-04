const database = require('../database');
const _ = require('lodash');

async function getAllProjects() {
     return await database.list('projects');
}

module.exports = { 
    getAllProjects,   
};