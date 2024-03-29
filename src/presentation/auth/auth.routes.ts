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


        /**
 * @openapi
 * /api/v1/auth/sign-in:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User sign-in
 *     description: Authenticate user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ss11@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "root_root"
 *     responses:
 *       200:
 *         description: Authentication successful, token is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       400:
 *         description: Bad request. User not found or invalid password.
 */

        router.post('/sign-in', controller.signInUser);

        /**
 * @openapi
 * /api/v1/auth/sign-up:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User sign-up
 *     description: Register a new user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "secure_password"
 *     responses:
 *       201:
 *         description: Registration successful, token is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       400:
 *         description: Bad request. Invalid data provided.
 */

        router.post('/sign-up', controller.signUpUser);
        router.get('/',[AuthMiddleware.validateJWT],controller.auth)


        return router;
    }
}