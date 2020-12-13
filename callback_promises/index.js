const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operation');

const url = "mongodb+srv://github:githubpassword@mongodb-github.vn7kz.mongodb.net/mongoDB-github?retryWrites=true&w=majority";
const dbname = "mongoDB-github";

MongoClient.connect(url).then((client) => {
    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dbOper.insertDocument(db, {name: "New name", description: "test"}, "dishes")
    .then((result) => {
        console.log('Insert Document:\n', result.ops);

        return dbOper.findDocuments(db, "dishes")
    })
    .then ((docs) => {
        console.log('Found Documents:\n', docs);

        return dbOper.updateDocument(db, {name: "New name"}, {description: "update test desc"}, "dishes")
    })
    .then((result) => {
        console.log('Update Documents:\n', result.result);

        return dbOper.findDocuments(db, 'dishes')
    })
    .then((docs) => {
        console.log('Found Documents:\n', docs);

        return db.dropCollection('dishes')
    })
    .then((result)=> {
        console.log('Drop collection', result);
        
        client.close();
    })
})
.catch((err) => {
    console.log(err);
});