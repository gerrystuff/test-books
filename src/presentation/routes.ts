import { Router } from 'express';
import { AuthRoutes, BookRoutes, AuthorRoutes } from './';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

    
        // Versión 1 de la API
        const apiV1Router = Router();

        // Rutas al router de la versión 1
        apiV1Router.use('/auth', AuthRoutes.routes);
        apiV1Router.use('/books', BookRoutes.routes);
        apiV1Router.use('/authors', AuthorRoutes.routes);


        // Usa el router de la versión 1 en tu router principal con el prefijo '/api/v1'
        router.use('/api/v1', apiV1Router);

        return router;
    }
}