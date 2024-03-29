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


/**
 * @openapi
 * /api/v1/authors:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Create a new author
 *     description: Add a new author to the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - birthdate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Lain Reid"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "lainreid@gmail.com"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: "1981-09-24"
 *     responses:
 *       201:
 *         description: Author successfully created.
 *       400:
 *         description: Bad request.
 */

        router.post('/',controller.createAuthor)


        /**
 * @openapi
 * /api/v1/authors:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get all authors
 *     description: Retrieve a list of all authors.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of authors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array

 */


        /**
 * @openapi
 * /api/v1/authors:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get all authors
 *     description: Retrieve a list of all authors.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of authors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */


        router.get('/',controller.getAllAuthors)
/**
 * @openapi
 * /api/v1/authors/{id}:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get an author by ID
 *     description: Retrieve details of an author by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author's ID.
 *     responses:
 *       200:
 *         description: Detailed information about the author.
 *       404:
 *         description: Author not found.
 */

        router.get('/:id',controller.getAnAuthor)
/**
 * @openapi
 * /api/v1/authors/{id}:
 *   delete:
 *     tags:
 *       - Authors
 *     summary: Delete an author by ID
 *     description: Remove an author from the database by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author's ID.
 *     responses:
 *       200:
 *         description: Author successfully deleted.
 *       404:
 *         description: Author not found.
 */

        router.delete('/:id',controller.deleteAnAuthor)

/**
 * @openapi
 * /api/v1/authors/{id}:
 *   put:
 *     tags:
 *       - Authors
 *     summary: Update an author by ID
 *     description: Update details of an existing author. All fields are optional.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author's ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "George R."
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "grauthor@example.com"
 *               birthdate:  # Assuming birthdate can be updated; include if applicable.
 *                 type: string
 *                 format: date
 *                 example: "1948-01-20"
 *     responses:
 *       200:
 *         description: Author details updated.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Author not found.
 */


        router.put('/:id',controller.updateAnAuthor)
        /**
         * @openapi
         * /api/v1/authors/search/{searchTerm}:
         *   get:
         *     tags:
         *       - Authors
         *     summary: Search authors by a search term
         *     parameters:
         *       - in: path
         *         name: searchTerm
         *         required: true
         *         schema:
         *           type: string
         *         description: The terms to search for.
         *       - in: query
         *         name: page
         *         schema:
         *           type: integer
         *           default: 1
         *         description: Page number for pagination.
         *       - in: query
         *         name: pageSize
         *         schema:
         *           type: integer
         *           default: 10
         *         description: Number of authors to return per page.
         *       - in: query
         *         name: sort
         *         schema:
         *           type: string
         *           default: 'asc'
         *           enum: ['asc', 'desc']
         *         description: Sort order.
         *     responses:
         *       200:
         *         description: A list of authors matching the search term.
         */

        router.get('/search/:searchTerm',controller.searchAuthors)


        return router;
    }
}