const MongoClient = require('mongodb').MongoClient;		//using the mongodb module to use in this node application
const assert = require ('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';	//creating mongodb url, we have already created conFusion table

MongoClient.connect(url, (err,db)=>{	//connecting to mongodb server

	assert.equal(err, null);	//to check if error is null

	console.log('Connected correctly to server');

   dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                db.close();
                            });
                        });
                    });
            });
    });
});