import { BookDatasource, BookEntity, BookRepository, CreateBookDto } from "../../domain";

export class BookRepositoryImpl implements BookRepository {
    constructor(
        private readonly datasource: BookDatasource
    ){}

    async create(createBookDto:CreateBookDto): Promise<BookEntity> {
        return this.datasource.create(createBookDto);
    }

    async update(createBookDto:CreateBookDto): Promise<BookEntity> {
        return this.datasource.update(createBookDto);
    }

    async delete(id:string): Promise<BookEntity> {
        return this.datasource.delete(id);
    }

    async get(id:string): Promise<BookEntity> {
        return this.datasource.get(id);
    }

    async list(): Promise<BookEntity[]> {
        return this.datasource.list();
    }
}