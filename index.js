const MongoClient = require('mongodb').MongoClient;		//using the mongodb module to use in this node application
const assert = require ('assert');

const url = 'mongodb://localhost:27017/conFusion';	//creating mongodb url, we have already created conFusion table

MongoClient.connect(url, (err,db)=>{	//connecting to mongodb server

	assert.equal(err, null);	//to check if error is null

	console.log('Connected correctly to server');

    const collection = db.collection("dishes");
    collection.insertOne({"name": "Uthappizza", "description": "test"},
    (err, result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);	//no of operation performed , here one insert

        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);
            
            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {	//remove dishes collection from database
                assert.equal(err,null);

                db.close();
            });
        });
    });

});