import { AuthorDatasource, AuthorEntity, AuthorRepository, CreateAuthorDto } from "../../domain";
import { UpdateAuthorDto } from "../../domain/dtos/author/update-author.dto";

export class AuthorRepositoryImpl implements AuthorRepository {

    constructor(
        private readonly datasource: AuthorDatasource
    ){}


    async create(createAuthorDto:CreateAuthorDto): Promise<AuthorEntity> {
        return this.datasource.create(createAuthorDto);

    }

    async update(updateAuthorDto:UpdateAuthorDto, id:string): Promise<AuthorEntity> {
        return this.datasource.update(updateAuthorDto,id);
    }

    async delete(id:string): Promise<AuthorEntity> {
        return this.datasource.delete(id);
    }

    async get(id:string): Promise<AuthorEntity> {
        return this.datasource.get(id);
    }

    async list(): Promise<AuthorEntity[]> {
        return this.datasource.list();
    }

    async massive(createAuthorDto:CreateAuthorDto[]): Promise<AuthorEntity[]> {
        return this.datasource.massive(createAuthorDto);
    }


    async searchAuthors(searchTerm:string, page:number ,pagesize:number,sort:string): Promise<AuthorEntity[]> {
        return this.datasource.searchAuthors(searchTerm, page , pagesize,sort);
    }
        

}