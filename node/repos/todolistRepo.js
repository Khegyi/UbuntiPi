const { MongoClient } = require("mongodb");

function todolistRepo (){
    const url = "mongodb://localhost:27017";
    const dbName = "TodoList";

    function get() {
        return new Promise(async(resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                const items = db.collection('todos').find();

                resolve(await items.toArray());

                client.close();
            } catch (error) {
                reject(error)
            }
        })
    }
    function loadData(data) {
        return new Promise(async(resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);

                results = await db.collection("todos").insertMany(data);
                resolve(results);
                client.close();
            } catch (error) {
                reject(error)
            }
        })
    }
    return {loadData, get}
};

module.exports = todolistRepo();