import { ObjectId } from "mongodb";
import { AuthorDatasource, AuthorEntity, CreateAuthorDto, CustomError } from "../../domain";
import { AuthorMapper } from "../mappers/author.mapper";
import { BSONError } from "bson";
import { UpdateAuthorDto } from "../../domain/dtos/author/update-author.dto";
import { cleanObject } from "../../domain/handlers/objects.handler";
import { MongoDatabase } from "../../data";

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


   async update(updateAuthorDto: UpdateAuthorDto,id:string): Promise<AuthorEntity> {



        try {


             const authorsCollection = await MongoDatabase.getCollection('authors');

             if(updateAuthorDto.email){
                const author = await authorsCollection.findOne({ email: updateAuthorDto.email });

                if (author)
                    throw CustomError.conflict('Email already exists');
             }
             
            const author = await authorsCollection.findOne({ _id: new ObjectId(id) });

            if (!author)
                throw CustomError.notFound('Author not found');

           
                cleanObject(updateAuthorDto);

                await authorsCollection.updateOne({ _id: new ObjectId(id) }, {
                    $set: updateAuthorDto
                });

                const updatedAuthor = await authorsCollection.findOne({ _id: new ObjectId(id) });

                return AuthorMapper.authorEntityFromObject(updatedAuthor);


        } catch (error) {
            if (error instanceof BSONError)
                throw CustomError.badRequest('Invalid ID format');

            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }



    }

   async delete(id: string): Promise<AuthorEntity> {

        try {
            const authorsCollection = await MongoDatabase.getCollection('authors');

            const author = await authorsCollection.findOne({ _id: new ObjectId(id) });

            if (!author)
                throw CustomError.notFound('Author not found');

            await authorsCollection.deleteOne({ _id: new ObjectId(id) });


            return AuthorMapper.authorEntityFromObject(author);

        } catch (error) {
            if (error instanceof BSONError)
                throw CustomError.badRequest('Invalid ID format');

            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }
    }


   async  get(id: string): Promise<AuthorEntity> {
        try {
            const authorsCollection = await MongoDatabase.getCollection('authors');

            const author = await authorsCollection.findOne({ _id: new ObjectId(id) });

            if (!author)
                throw CustomError.notFound('Author not found');

            return AuthorMapper.authorEntityFromObject(author);
            
        } catch (error) {
            if (error instanceof BSONError )
            throw CustomError.badRequest('Invalid ID format');

            if (error instanceof CustomError)
            throw error;
        
        throw CustomError.internal();
        }
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

    async searchAuthors(searchTerm: string, page:number, pageSize:number,sort:string): Promise<AuthorEntity[]> {
        try {
            const authorsCollection = await MongoDatabase.getCollection('authors');

            const authors = await authorsCollection.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } }
                ]
            })
            .sort({name:sort === 'asc' ? 1 : -1}) // Sort by name
            .skip((page - 1) * pageSize)
            .limit(pageSize).toArray();

            
            return authors.map(AuthorMapper.authorEntityFromObject);

        } catch (error) {
            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }
    }

}