
import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import responseTime from 'response-time';
import swaggerDocs from './swagger';


interface Options {
    port: number;
    routes: Router;
}


export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 8080, routes } = options;

        this.port = port;
        this.routes = routes;
    }


    async start() {
        this.app.use(express.json());
        
        this.app.use(cors({
            origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
            optionsSuccessStatus: 200,
        }));


        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });


        this.app.use(this.routes);
        swaggerDocs(this.app, this.port)


    }



}