import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthorDatasourceImpl, AuthorRepositoryImpl } from '../../infrastructure';
import { AuthorController } from './author.controller';

export class AuthorRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthorDatasourceImpl();

        const repository = new AuthorRepositoryImpl(datasource);

        const controller = new  AuthorController(repository)

        router.use(AuthMiddleware.validateJWT)

        router.post('/',controller.createAuthor)

        router.post('/massive',controller.createMassiveAuthors)

        router.get('/',controller.getAllAuthors)

        router.get('/:id',controller.getAnAuthor)

        router.delete('/:id',controller.deleteAnAuthor)


        router.put('/:id',controller.updateAnAuthor)

        router.get('/search/:searchTerm',controller.searchAuthors)


        return router;
    }
}