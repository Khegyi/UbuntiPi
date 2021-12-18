const express = require('express');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

const todolistRepo = require('./repos/todolistRepo');

const data = require('./data/example.json');
const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3080;


const url = "mongodb://localhost:27017";
const dbName = "TodoList";

async function main(){
    const client = new MongoClient(url);
    await client.connect();
    const results = await todolistRepo.loadData(data);
    console.log(results.insertedCount, results.ops);
    const admin = client.db(dbName).admin();
//    console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());
}
main();
/* 
app.use(cors({
    origin: '*'
}));

bookRouter.route("/test")
    .get((req,res) => {
        const response = { hello: 'Welcomee'};
        res.json(response);
    });
    app.use('/api', bookRouter);


app.get('/', (req, res) =>{
    res.send({text: 'Yellow World'});
});




app.listen(port, ()=>{
    console.log(`Running on port  ${port}`);
}); */