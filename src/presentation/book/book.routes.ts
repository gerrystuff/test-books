import { Router } from 'express';
import { BookController } from './book.controller';
import { BookDatasourceImpl, BookRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class BookRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new BookDatasourceImpl();

        const repository = new BookRepositoryImpl(datasource);

        const controller = new BookController(repository)

        router.use(AuthMiddleware.validateJWT)


        /**
         * @openapi
         * /api/v1/books:
         *   post:
         *     tags:
         *       - Books
         *     summary: Create a new book
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *                 example: "Im thinking of start the things"
         *               authorId:
         *                 type: string
         *                 example: "66050c933fb50a5197b9e7f4"
         *               category:
         *                 type: string
         *                 example: "Novel"
         *               price:
         *                 type: number
         *                 example: 19.99
         *     responses:
         *       200:
         *         description: Book created
         *       400:
         *         description: Bad request
         */
        router.post('/', controller.createBook)



        /**
         * @openapi
         * /api/v1/books:
         *   get:
         *     tags:
         *       - Books
         *     summary: Retrieve all books
         *     responses:
         *       200:
         *         description: A list of books.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         */

        router.get('/', controller.getAllBooks)

        /**
         * @openapi
         * /api/v1/books/{id}:
         *   get:
         *     tags:
         *       - Books
         *     summary: Retrieve a book by its ID
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: The book's ID.
         *     responses:
         *       200:
         *         description: Detailed information about a book.
         *       404:
         *         description: Book not found.
         */

        router.get('/:id', controller.getABook)



        /**
 * @openapi
 * /api/v1/books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book's ID.
 *     responses:
 *       200:
 *         description: Book successfully deleted.
 *       404:
 *         description: Book not found.
 */


        router.delete('/:id', controller.deleteABook)
        /**
 * @openapi
 * /api/v1/books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book's ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book successfully updated.
 *       404:
 *         description: Book not found.
 */

        router.put('/:id', controller.updateABook)

        /**
         * @openapi
         * /api/v1/books/search/{searchTerm}:
         *   get:
         *     tags:
         *       - Books
         *     summary: Search for books by a search term
         *     parameters:
         *       - in: path
         *         name: searchTerm
         *         required: true
         *         schema:
         *           type: string
         *         description: The term to search for in book titles, descriptions, etc.
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
         *         description: Number of books to return per page.
         *       - in: query
         *         name: sort
         *         schema:
         *           type: string
         *           default: 'asc'
         *           enum: ['asc', 'desc']
         *         description: Sort order.
         *     responses:
         *       200:
         *         description: A list of books matching the search term.
         */

        router.get('/search/:searchTerm', controller.searchBooks)

        /**
 * @openapi
 * /api/v1/books/search/author/{authorId}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Search for books by author's ID
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The author's ID to search for books.
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
 *         description: Number of books to return per page.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: 'asc'
 *           enum: ['asc', 'desc']
 *         description: Sort order.
 *     responses:
 *       200:
 *         description: A list of books by the specified author.
 */
        router.get('/search/author/:authorId', controller.searchBooksByAuthor)

        return router;
    }
}