
import { envs } from './config';
import { MongoDatabase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
    main();
})()



async function main() {


    await MongoDatabase.connect
    ({
        url: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    new Server({
        port: 8080,
        routes: AppRoutes.routes
    }).start();
}
