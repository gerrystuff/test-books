import { Router } from 'express';
import { AuthRoutes, BookRoutes, AuthorRoutes } from './';


export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        const api = Router();

        // Rutas al router de la versión 1
        api.use('/auth', AuthRoutes.routes);
        api.use('/books', BookRoutes.routes);
        api.use('/authors', AuthorRoutes.routes);

        /**
   * @openapi
   * /api/v1/healtcheck:
   *  get:
   *     tags:
   *      - Healtcheck
   *     description: Verifica que la API esté arriba y corriendo
   *     responses:
   *      200:
   *         description: API is up and running
   * 
   */
        api.get('/healtcheck', (req, res) => {
            res.status(200).json({ message: 'API is up and running' });
        });

        const API_VERSION = process.env.API_VERSION || 'v1';

        router.use(`/api/${API_VERSION}`, api);


        return router;
    }
}