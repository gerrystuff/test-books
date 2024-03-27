import { CustomError, UserEntity } from "../../domain";

export class UserMapper {

    static userEntityFromObject(object: {[key: string]: any}) {
        const { _id, name, email, password } = object;

        if( !_id) {
            throw CustomError.badRequest('Invalid user id');
        }

        if(!name) throw CustomError.badRequest('Invalid user name');
        if(!email) throw CustomError.badRequest('Invalid user email');
        if(!password) throw CustomError.badRequest('Invalid user password');

        return new UserEntity(_id ,name, email, password);

    }
}