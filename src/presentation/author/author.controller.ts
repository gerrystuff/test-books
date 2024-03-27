import { AuthorRepository, CreateAuthorDto } from "../../domain";
import { MassiveCreateAuthorDto } from "../../domain/dtos/author/masive-create-author.dto";
import { handleError } from "../../domain/handlers/error.handler";
import { Request, Response } from 'express';

export class AuthorController{
    constructor(
        private readonly authorRepository: AuthorRepository,
    ) {
        
    }



    createAuthor = async(req:Request, response:Response) => {
            
            const [ error, createAuthorDto ] = CreateAuthorDto.create(req.body);
    
            if( error ) return response.status(400).json({ message: error });
    
            this.authorRepository.create(createAuthorDto!)
                .then( author => {
                    response.json(author)
                })
                .catch( error => handleError(error, response)); 

            }


    createMassiveAuthors = async(req:Request, response:Response) => {

        const [ error, massiveCreateAuthorDto ] = MassiveCreateAuthorDto.create(req.body);

        if( error ) return response.status(400).json({ message: error });

        this.authorRepository.massive(massiveCreateAuthorDto!.authors)
            .then( authors => {
                response.json(authors)
            })
            .catch( error => handleError(error, response));

    }


    getAllAuthors = async(req:Request, response:Response) => {
            
            this.authorRepository.list()
                .then( authors => {
                    response.json(authors)
                })
                .catch( error => handleError(error, response));
    
        }



  
}