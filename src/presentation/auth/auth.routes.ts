import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImpl();

        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        router.post('/sign-in', controller.signInUser);
        router.post('/sign-up', controller.signUpUser);
        router.get('/',[AuthMiddleware.validateJWT],controller.auth)


        return router;
    }
}