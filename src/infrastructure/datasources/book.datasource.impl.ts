import { ObjectId } from "mongodb";
import { MongoDatabase } from "../../data/mongodb";
import { BookEntity, CustomError } from "../../domain";
import { BookDatasource } from "../../domain/datasources/book.datasource";
import { CreateBookDto } from "../../domain/dtos/book/create-book.dto";
import { BookMapper } from "../mappers/book.mapper";

export class BookDatasourceImpl extends BookDatasource {
    async create(createBookDto: CreateBookDto): Promise<BookEntity> {

        const { title, price, authorId } = createBookDto;

        try {

            // Buscar si el autor existe

            const authorsCollection = await MongoDatabase.getCollection('authors');

            const author = await authorsCollection.findOne({ _id: new ObjectId(authorId) });

            if (!author)
                throw CustomError.notFound('Author not found');

            // Crear un nuevo libro

            const booksCollection = await MongoDatabase.getCollection('books');

            const book = await booksCollection.insertOne({
                title,
                price,
                authorId: new ObjectId(authorId)
            });

            // Retornar el libro creado

            return BookMapper.bookEntityFromObject({
                _id: book.insertedId,
                title,
                price,
                authorId
            });


            
        } catch (error) {
            if (error instanceof CustomError)
            throw error;

        throw CustomError.internal();
        }
    }
    update(createBookDto: CreateBookDto): Promise<BookEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<BookEntity> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<BookEntity> {
        throw new Error("Method not implemented.");
    }

    
   async list(): Promise<BookEntity[]> {
        try {
            const booksCollection = await MongoDatabase.getCollection('books');

            const books = await booksCollection.find().toArray();

            return books.map(BookMapper.bookEntityFromObject);

            
        } catch (error) {
            if (error instanceof CustomError)
            throw error;

        throw CustomError.internal();
        }
    }

}