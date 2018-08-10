const mongo_driver = require('mongodb');
const mongo_client = mongo_driver.MongoClient;
const mongo_server = 'mongodb://localhost:27017';
const mongo_database = 'protokol';

async function connect() {
    try {
        const db = await mongo_driver.connect(mongo_server, { useNewUrlParser: true } ); 
        const data = db.db(mongo_database);
        return data;
    }
    catch(exception) {
        console.log(exception);
        return null;
    }
}

async function list(collection, filter = {}) {
    try {
        const data = await connect();
        const cursor = await data.collection(collection).find(filter);
        const documents = cursor.toArray();   
        return documents;
    }
    catch(exception) {
        console.log(exception);
        return null;
    } 
}

async function get(collection, filter = {}) {
    try {
        const data = await connect();
        const document = await data.collection(collection).findOne(filter);     
        return document;
    }
    catch(exception) {
        console.log(exception);
        return null;
    } 
}

async function insert(collection, document) {
    try {
        const data = await connect();      
        var id = await data.collection(collection).insertOne(document); 
        return id;
    }
    catch(exception) {
        console.log(exception);
        return null;
    } 
}

module.exports = { 
    list,
    get,
    insert,
};