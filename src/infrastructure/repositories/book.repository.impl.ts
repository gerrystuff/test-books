import { BookDatasource, BookEntity, BookRepository, CreateBookDto } from "../../domain";
import { UpdateBookDto } from "../../domain/dtos/book/update-book.dto";

export class BookRepositoryImpl implements BookRepository {
    constructor(
        private readonly datasource: BookDatasource
    ){}

    async create(createBookDto:CreateBookDto): Promise<BookEntity> {
        return this.datasource.create(createBookDto);
    }

    async update(updateBookDto:UpdateBookDto,id:string): Promise<BookEntity> {
        return this.datasource.update(updateBookDto,id);
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

    async searchBooks(searchTerm:string,page:number,pageSize:number,sort:string): Promise<BookEntity[]> {
        return this.datasource.searchBooks(searchTerm,page,pageSize,sort);
    }

    async searchBooksByAuthor(authorId:string, page:number,pageSize:number,sort:string): Promise<BookEntity[]> {
        return this.datasource.searchBooksByAuthor(authorId,page,pageSize,sort);
    }
}