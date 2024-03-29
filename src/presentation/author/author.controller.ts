import { AuthorRepository, CreateAuthorDto } from "../../domain";
import { MassiveCreateAuthorDto } from "../../domain/dtos/author/masive-create-author.dto";
import { UpdateAuthorDto } from "../../domain/dtos/author/update-author.dto";
import { handleError} from "../../domain/handlers/error.handler";
import { Request, Response } from 'express';
import { handleSuccess } from "../../domain/handlers/success.handler";

export class AuthorController{
    constructor(
        private readonly authorRepository: AuthorRepository,
    ) {
        
    }



    createAuthor = async(req:Request, response:Response) => {
            
            const [ error, createAuthorDto ] = CreateAuthorDto.create(req.body);
    
            if( error ) return response.status(400).json({ message: error });
    
            this.authorRepository.create(createAuthorDto!)
                .then( author => handleSuccess(author, response))
                .catch( error => handleError(error, response)); 

            }


    createMassiveAuthors = async(req:Request, response:Response) => {

        const [ error, massiveCreateAuthorDto ] = MassiveCreateAuthorDto.create(req.body);

        if( error ) return response.status(400).json({ message: error });

        this.authorRepository.massive(massiveCreateAuthorDto!.authors)
            .then( authors => handleSuccess(authors, response))
            .catch( error => handleError(error, response));

    }


    getAllAuthors = async(req:Request, response:Response) => {
            
            this.authorRepository.list()
                .then( authors => handleSuccess(authors, response))
                .catch( error => handleError(error, response));
    
        }

    getAnAuthor = async(req:Request, response:Response) => {
                
                this.authorRepository.get(req.params.id)
                    .then( author => handleSuccess(author, response))
                    .catch( error => handleError(error, response));
        
            }


  deleteAnAuthor = async(req:Request, response:Response) => {
                    
                    this.authorRepository.delete(req.params.id)
                        .then( author => handleSuccess(author, response))
                        .catch( error => handleError(error, response));
            
                }


    updateAnAuthor = async(req:Request, response:Response) => {

        const id = req.params.id;

        if( !id ) return response.status(400).json({ message: 'Id is required' });

        const [ error, updateAuthorDto ] = UpdateAuthorDto.update(req.body);

        if( error ) return response.status(400).json({ message: error });

        this.authorRepository.update(updateAuthorDto!, id)
            .then( author => handleSuccess(author, response))
            .catch( error => handleError(error, response));

    }

    searchAuthors = async(req:Request, response:Response) => {


        const searchTerm = req.params.searchTerm as string;

        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const sort = req.query.sort as string || 'asc';

        if (!searchTerm) return response.status(400).json({ message: 'Search term is required' });

        
        this.authorRepository.searchAuthors(searchTerm, page, pageSize, sort)
            .then( authors => handleSuccess(authors, response))
            .catch( error => handleError(error, response));

    }




  
}