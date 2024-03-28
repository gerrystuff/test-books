import { CreateBookDto } from "../dtos/book/create-book.dto";
import { UpdateBookDto } from "../dtos/book/update-book.dto";
import { BookEntity } from "../entities/book.entity";

export abstract class BookRepository {
    
    abstract create(createBookDto:CreateBookDto):Promise<BookEntity>;
    abstract update(createBookDto:UpdateBookDto,id:string):Promise<BookEntity>;
    abstract delete(id:string):Promise<BookEntity>;
    abstract get(id:string):Promise<BookEntity>;
    abstract list():Promise<BookEntity[]>;
    abstract searchBooks(searchTerm:string,page:number,pageSize:number,sort:string):Promise<BookEntity[]>;

}

