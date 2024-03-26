const { MongoClient } = require('mongodb');


interface Options {
    url: string;
    dbName: string;
}


export class MongoDatabase {

    static options: Options;

    
    static async connect(options: Options) {

        const { url, dbName } = options;

        this.options = options;


        try {

    
            const client = new MongoClient(url);

            await client.connect();
            
            console.log('Connected to the database');



            
        } catch (error) {

            console.log("Error connecting to the database")
            throw error;
            
        }

    }

    static async getCollection(collectionName: string) {
        const { url, dbName } = this.options; // Asegúrate de que `this.options` esté definido y accesible
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        return db.collection(collectionName);
    }

}