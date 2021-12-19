const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const todolistRepo = require('./repos/todolistRepo');

const data = require('./data/example.json');
const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3080;

const db = mongoose.connect('mongodb://localhost:27017/TodoList');
const todoItem = require('./models/todoItemModel');

const url = "mongodb://localhost:27017";
const dbName = "TodoList";

async function main(){
    const client = new MongoClient(url);
    await client.connect();

    try {
        const results = await todolistRepo.loadData(data);
        assert.equal(data.length, results.insertedCount);
        console.log(results, results.instertedIds);
/* 
        const getData = await todolistRepo.get();
        assert.equal(data.length, getData.insertedCount);
        console.log(getData);  */
        
    } catch (error) {
        console.log(error);
    } finally {
        const admin = client.db(dbName).admin();

      //  await client.db(dbName).dropDatabase();
        console.log(await admin.listDatabases());
        client.close();
    }


}
//main();

function connect(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = [
            { name: 'John', address: 'Highway 71'},
            { name: 'Peter', address: 'Lowstreet 4'},
            { name: 'Amy', address: 'Apple st 652'},
            { name: 'Hannah', address: 'Mountain 21'},
            { name: 'Michael', address: 'Valley 345'},
            { name: 'Sandy', address: 'Ocean blvd 2'},
            { name: 'Betty', address: 'Green Grass 1'},
            { name: 'Richard', address: 'Sky st 331'},
            { name: 'Susan', address: 'One way 98'},
            { name: 'Vicky', address: 'Yellow Garden 2'},
            { name: 'Ben', address: 'Park Lane 38'},
            { name: 'William', address: 'Central st 954'},
            { name: 'Chuck', address: 'Main Road 989'},
            { name: 'Viola', address: 'Sideway 1633'}
          ];
          dbo.collection("customers").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount, res);
            db.close();
    });
});
}


function delete_collections(){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
      });
    });
}


 function find(){
    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
    await dbo.collection("customers").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.length);
            db.db("mydb").dropDatabase();
            db.close();
            return result;
        });
      });
}
console.log("finded");
//connect();
app.use(cors({
    origin: '*'
}));

bookRouter.route("/test")
    .get(async (req,res) => {
     const response = { hello: 'Welcomee'};
/*        todoItem.find((err, est) => {
           if(err){
             return  res.send(err);
           }
            return  res.json(est);
       }); */

       MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
     dbo.collection("customers").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.length);
            db.close();
            res.json(result);
        });
      });


/*      const finded = await find();
console.log(find());
       res.json(find()); */
    });


    bookRouter.route("/delete")
    .get(async (req,res) => {
     const response = { hello: 'Welcomee'};

     MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { address: /^H/ };
        dbo.collection("customers").deleteMany(myquery, function(err, obj) {
          if (err) throw err;
          console.log(obj);
          db.close();
        });
      });

    });


    bookRouter.route("/create_collection")
    .get(async (req,res) => {
     const response = { hello: 'create'};
     connect();
     res.json(response);
    });
    bookRouter.route("/delete_collections")
    .get(async (req,res) => {
     const response = { hello: 'delete'};
     delete_collections();
     res.json(response);
    });

app.use('/api', bookRouter);


app.get('/', (req, res) =>{
    res.send({text: 'Yellow World'});
});




app.listen(port, ()=>{
    console.log(`Running on port  ${port}`);
});