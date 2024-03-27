import { BookRepository, CreateBookDto } from "../../domain";
import { Request, Response } from 'express';
import { handleError } from "../../domain/handlers/error.handler";

export class BookController {
    constructor(
        private readonly bookRepository: BookRepository,
    ) {}


    createBook = async(req:Request, response:Response) => {

        const [ error, createBookDto ] = CreateBookDto.create(req.body);

        if( error ) return response.status(400).json({ message: error });

        this.bookRepository.create(createBookDto!)
            .then( book => {
                response.json(book)
            })
            .catch( error => handleError(error, response));


    }


    getAllBooks = async(req:Request, response:Response) => {

        this.bookRepository.list()
            .then( books => {
                response.json(books)
            })
            .catch( error => handleError(error, response));

    }


  
}