import { CreateBookDto } from "../dtos/book/create-book.dto";
import { BookEntity } from "../entities/book.entity";

export abstract class BookDatasource {
    
    abstract create(createBookDto:CreateBookDto):Promise<BookEntity>;
    abstract update(createBookDto:CreateBookDto):Promise<BookEntity>;
    abstract delete(id:string):Promise<BookEntity>;
    abstract get(id:string):Promise<BookEntity>;
    abstract list():Promise<BookEntity[]>;

   
}