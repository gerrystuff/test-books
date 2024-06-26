import { BookRepository, CreateBookDto } from "../../domain";
import { Request, Response } from 'express';
import { handleError} from "../../domain/handlers/error.handler";
import { UpdateBookDto } from "../../domain/dtos/book/update-book.dto";
import { handleSuccess } from "../../domain/handlers/success.handler";

export class BookController {
    constructor(
        private readonly bookRepository: BookRepository,
    ) { }


    createBook = async (req: Request, response: Response) => {

        const [error, createBookDto] = CreateBookDto.create(req.body);

        if (error) return response.status(400).json({ message: error });

        this.bookRepository.create(createBookDto!)
            .then(book => handleSuccess(book, response))
            .catch(error => handleError(error, response));


    }


    getAllBooks = async (req: Request, response: Response) => {

        this.bookRepository.list()
            .then(books => handleSuccess(books, response))
            .catch(error => handleError(error, response));

    }


    getABook = async (req: Request, response: Response) => {

        this.bookRepository.get(req.params.id)
            .then(book => handleSuccess(book, response))
            .catch(error => handleError(error, response));

    }


    deleteABook = async (req: Request, response: Response) => {

        this.bookRepository.delete(req.params.id)
            .then(book => handleSuccess(book, response))
            .catch(error => handleError(error, response));

    }



    updateABook = async (req: Request, response: Response) => {

        const id = req.params.id;


        if (!id) return response.status(400).json({ message: 'Id is required' });

        const [error, updateBookDto] = UpdateBookDto.update(req.body);


        this.bookRepository.update(updateBookDto!, id)
            .then(book => handleSuccess(book, response))
            .catch(error => handleError(error, response));

        if (error) return response.status(400).json({ message: error });







    }

    searchBooks = async (req: Request, response: Response) => {

        const searchTerm = req.params.searchTerm as string;
     
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const sort = req.query.sort as string || 'asc';


        if (!searchTerm) return response.status(400).json({ message: 'Search term is required' });

        this.bookRepository.searchBooks(searchTerm,  page, pageSize,sort)
            .then(books => handleSuccess(books, response))
            .catch(error => handleError(error, response));

    }


    searchBooksByAuthor = async (req: Request, response: Response) => {

        const authorId = req.params.authorId as string;
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const sort = req.query.sort as string || 'asc';

        if (!authorId) return response.status(400).json({ message: 'Author ID is required' });

        this.bookRepository.searchBooksByAuthor(authorId, page, pageSize,sort)
            .then(books => handleSuccess(books, response))
            .catch(error => handleError(error, response));

    }


}