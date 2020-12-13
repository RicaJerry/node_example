const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb+srv://github:githubpassword@mongodb-github.vn7kz.mongodb.net/mongoDB-github?retryWrites=true&w=majority";
const dbname = "mongoDB-github";

MongoClient.connect(url, (err, client) => {
    assert.strictEqual(err, null); // Assure that the error is not null 
    console.log('Connected correctly to server');

    const db = client.db(dbname);

    const collection = db.collection('dishes');

    collection.insertOne({"name": "pizza", "description": "test"}, (err, result) => {
        assert.strictEqual(err, null); // Assure that the error is not null 

        console.log('After Insert');
        console.log(result.ops); // Operation carried successfully

        collection.find({}).toArray((err, docs) => {
            assert.strictEqual(err, null); // Make sure that is error not null 
            
            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.strictEqual(err, null);

                client.close();
            });
        });
    });
});