const { MongoClient } = require("mongodb");

function todolistRepo (){
    const url = "mongodb://localhost:27017";
    const dbName = "TodoList";
    function loadData(data) {
        return new Promise(async(resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);

                results = await db.collection("todos").insertMany(data);
                resolve(results);

            } catch (error) {
                reject(error)
            }
        })
    }
    return {loadData}
};

module.exports = todolistRepo();