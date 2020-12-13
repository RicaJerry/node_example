const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operation');

const url = "mongodb+srv://github:githubpassword@mongodb-github.vn7kz.mongodb.net/mongoDB-github?retryWrites=true&w=majority";
const dbname = "mongoDB-github";

MongoClient.connect(url, (err, client) => {
    assert.strictEqual(err, null); // Assure that the error is  null 
    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dbOper.insertDocument(db, {name: "New name", description: "test"}, "dishes", (result) => {
        console.log('Insert Document:\n', result.ops);

        dbOper.findDocuments(db, "dishes", (docs) => {
            console.log('Found Documents:\n', docs);

            dbOper.updateDocument(db, {name: "New name"}, {description: "update test desc"}, "dishes", (result) => {
                console.log('Update Documents:\n', result.result);

                dbOper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Documents:\n', docs);

                    db.dropCollection('dishes', (result)=> {
                        console.log('Drop collection', result);

                        client.close();
                    })
                })
            })
        })
    });
});