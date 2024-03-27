import { CreateAuthorDto } from "../dtos/author/create-author.dto";
import { AuthorEntity } from "../entities/author.entity";

export abstract class AuthorDatasource {
    abstract create(createAuthorDto:CreateAuthorDto): Promise<AuthorEntity>;
    abstract update(createAuthorDto:CreateAuthorDto): Promise<AuthorEntity>;
    abstract delete(id:string): Promise<AuthorEntity>;
    abstract get(id:string): Promise<AuthorEntity>;
    abstract list(): Promise<AuthorEntity[]>;

    abstract massive( createAuthorDto:CreateAuthorDto[] ): Promise<AuthorEntity[]>;
}