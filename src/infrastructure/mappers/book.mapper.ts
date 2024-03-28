// En BookMapper
import { Validators } from "../../config";
import { BookEntity, CustomError } from "../../domain";
import { UpdateBookDto } from "../../domain/dtos/book/update-book.dto";

export class BookMapper {
    
    static bookEntityFromObject(object: {[key: string]: any}) {
    
        const { _id, title, authorId, price,category } = object;

        if (!_id) {
            throw CustomError.badRequest('Invalid book id');
        }
        // TODO - Generate a custom validator for general use


        if (!title) throw CustomError.badRequest('Invalid book title');
        if (!authorId) throw CustomError.badRequest('Invalid book author');
        if (!price) throw CustomError.badRequest('Invalid book price');
        if(!category) throw CustomError.badRequest('Invalid book category');

        

        return new BookEntity(_id, title, authorId, price,category);

    }

    


    


  
    
}