import { MongoDatabase } from "../../data/mongodb";
import { CustomError, RegisterUserDto, UserEntity, AuthDatasource } from "../../domain/index";
import { BcryptAdapter } from "../../config/index";
import { UserMapper } from "../mappers/user.mapper";

export class AuthDatasourceImpl extends AuthDatasource {

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;



        try {

            // Obtener la colección de usuarios
            const usersCollection = await MongoDatabase.getCollection('users');

            // Verificar si existe un usuario con el mismo email
            const exists = await usersCollection.findOne({ email: email });

            if (exists)
                throw CustomError.conflict('User already exists');

            // Crear un nuevo usuario

            const user = await usersCollection.insertOne({
                name,
                email,
                password: BcryptAdapter.hash(password)
            });


            return UserMapper.userEntityFromObject({
                _id: user.insertedId,
                name,
                email,
                password
            
            });




        } catch (error) {

            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }
        
    }


    async signIn(email: string, password: string): Promise<UserEntity> {

        try {

            // Obtener la colección de usuarios
            const usersCollection = await MongoDatabase.getCollection('users');

            // Verificar si existe un usuario con el mismo email
            const user = await usersCollection.findOne({ email: email });

            if (!user)
                throw CustomError.notFound('User not found');

            // Verificar si la contraseña es correcta
            if (!BcryptAdapter.compare(password, user.password))
                throw CustomError.unauthorized('Invalid password');

            return UserMapper.userEntityFromObject(user);

        } catch (error) {

            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }

    }





}