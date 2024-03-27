// En BookMapper
import { BookEntity, CustomError } from "../../domain";

export class BookMapper {
    
    static bookEntityFromObject(object: {[key: string]: any}) {
    
        const { _id, title, authorId, price } = object;

        if (!_id) {
            throw CustomError.badRequest('Invalid book id');
        }

        if (!title) throw CustomError.badRequest('Invalid book title');
        if (!authorId) throw CustomError.badRequest('Invalid book author');
        if (!price) throw CustomError.badRequest('Invalid book price');

        return new BookEntity(_id, title, authorId, price);

    }
}