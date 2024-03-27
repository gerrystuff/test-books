import { AuthorDatasource, AuthorEntity, AuthorRepository, CreateAuthorDto } from "../../domain";

export class AuthorRepositoryImpl implements AuthorRepository {

    constructor(
        private readonly datasource: AuthorDatasource
    ){}


    async create(createAuthorDto:CreateAuthorDto): Promise<AuthorEntity> {
        return this.datasource.create(createAuthorDto);

    }

    async update(createAuthorDto:CreateAuthorDto): Promise<AuthorEntity> {
        return this.datasource.update(createAuthorDto);
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


}