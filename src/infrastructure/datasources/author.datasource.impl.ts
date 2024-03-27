import { MongoDatabase } from "../../data/mongodb";
import { AuthorDatasource, AuthorEntity, CreateAuthorDto, CustomError } from "../../domain";
import { AuthorMapper } from "../mappers/author.mapper";

export class AuthorDatasourceImpl implements AuthorDatasource {

    async create(createAuthorDto: any): Promise<AuthorEntity> {
        const { name, email, birthdate } = createAuthorDto;

        try {

            // Buscar si el autor existe mediante el email

            const authorsCollection = await MongoDatabase.getCollection('authors');


            const author = await authorsCollection.findOne({
                email
            });

            if (author)
                throw CustomError.conflict('Author already exists');

            // Crear un nuevo autor

            const newAuthor = await authorsCollection.insertOne({
                name,
                email,
                birthdate
            });


            // Retornar el autor creado

            return AuthorMapper.authorEntityFromObject({
                _id: newAuthor.insertedId,
                name,
                email,
                birthdate
            });


        } catch (error) {
            if (error instanceof CustomError)
                throw error;
            throw CustomError.internal();

        }
    }
    update(createAuthorDto: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async list(): Promise<AuthorEntity[]> {
        try {

            const authorsCollection = await MongoDatabase.getCollection('authors');

            const authors = await authorsCollection.find().toArray();

            return authors.map(AuthorMapper.authorEntityFromObject)


        } catch (error) {
            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();

        }
    }



    async massive(authors: CreateAuthorDto[]): Promise<AuthorEntity[]> {
        try {


            const authorsCollection = await MongoDatabase.getCollection('authors');


            const newAuthors = authors.map(async newAuthor => {
                const { name, email, birthdate } = newAuthor;

                // Buscar si el autor existe mediante el email

                const author = await authorsCollection.findOne({
                    email
                });

                if (author)
                    throw CustomError.conflict('Author already exists');

                // Crear un nuevo autor

                return await authorsCollection.insertOne({
                    name,
                    email,
                    birthdate
                });

            });

            // Retornar los autores creados

            return (await Promise.all(newAuthors)).map((newAuthor, index) => {
                return AuthorMapper.authorEntityFromObject({
                    _id: newAuthor.insertedId,
                    ...authors[index]
                });
            });

        } catch (error) {

            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }



    }

}