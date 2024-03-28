import { CreateAuthorDto } from "../dtos/author/create-author.dto";
import { UpdateAuthorDto } from "../dtos/author/update-author.dto";
import { AuthorEntity } from "../entities/author.entity";

export abstract class AuthorRepository {
        
    abstract create(createAuthorDto:CreateAuthorDto): Promise<AuthorEntity>;
    abstract update(updateAuthorDto:UpdateAuthorDto,id:string): Promise<AuthorEntity>;
    abstract delete(id:string): Promise<AuthorEntity>;
    abstract get(id:string): Promise<AuthorEntity>;
    abstract list(): Promise<AuthorEntity[]>;


    abstract massive( createAuthorDto:CreateAuthorDto[] ): Promise<AuthorEntity[]>;
    abstract searchAuthors(searchTerm:string,page:number,pageSize:number,sort:string): Promise<AuthorEntity[]>;
    
}