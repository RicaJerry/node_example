const assert = require('assert');


exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document,(err, result) => {
        assert.strictEqual(err, null); // If error not null it will printout info and quit the applicaiton
        console.log("Inserted " + result.result.n + 
            " doucuments into the collection " + collection); // How many document is the 
        callback(result);
    });
}

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.strictEqual(err, null); // If error not null it will printout info and quit the applicaiton
        callback(docs);
    });
    
}

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        console.log("Remove the document ", document);
        callback(result);
    })
    
}

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        console.log("Update the document", document , " to >", update);
        callback(result);
    });
    
}