

// En AuthorMapper
import { AuthorEntity, CustomError } from "../../domain";

export class AuthorMapper {
    static authorEntityFromObject(object: {[key: string]: any}) {

        const { _id, name, email, birthdate } = object;

        if (!_id) {
            throw CustomError.badRequest('Invalid author id');
        }

        if (!name) throw CustomError.badRequest('Invalid author name');
        if (!email) throw CustomError.badRequest('Invalid author email');
        if (!birthdate) throw CustomError.badRequest('Invalid author birthdate');

        return new AuthorEntity(_id, name, email, birthdate);
    }


    // massive authorEntityFromObject

    static massiveAuthorEntityFromObject(object: {[key: string]: any}[]) {
        return object.map(author => this.authorEntityFromObject(author));
    }
}