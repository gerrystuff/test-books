import { ObjectId } from "mongodb";
import { MongoDatabase } from "../../data/mongodb";
import { BookEntity, CustomError } from "../../domain";
import { BookDatasource } from "../../domain/datasources/book.datasource";
import { CreateBookDto } from "../../domain/dtos/book/create-book.dto";
import { BookMapper } from "../mappers/book.mapper";
import { BSONError } from 'bson';
import { UpdateBookDto } from "../../domain/dtos/book/update-book.dto";
import { cleanObject } from "../../domain/handlers/objects.handler";

export class BookDatasourceImpl extends BookDatasource {




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


    async create(createBookDto: CreateBookDto): Promise<BookEntity> {

        const { title, price, authorId, category } = createBookDto;

        try {

            // Buscar si el autor existe

            const authorsCollection = await MongoDatabase.getCollection('authors');

            const author = await authorsCollection.findOne({ _id: new ObjectId(authorId) });

            if (!author)
                throw CustomError.notFound('Author not found');


            const booksCollection = await MongoDatabase.getCollection('books');

            // Busca si el libro existe por el titulo

            const bookExists = await booksCollection.findOne
                ({ title });

            if (bookExists)
                throw CustomError.conflict('Book already exists');


            // Crear un nuevo libro


            const book = await booksCollection.insertOne({
                title,
                price,
                authorId: new ObjectId(authorId),
                category
            });

            // Retornar el libro creado

            return BookMapper.bookEntityFromObject({
                _id: book.insertedId,
                title,
                price,
                authorId,
                category
            });



        } catch (error) {
            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }
    }

    async update(updateBookDto: UpdateBookDto, id: string): Promise<BookEntity> {
        try {


            const booksCollection = await MongoDatabase.getCollection('books');

            const bookEntity = await booksCollection.findOne({ _id: new ObjectId(id) });

            if (!bookEntity)
                throw CustomError.notFound('Book not found');


            cleanObject(updateBookDto)

            await booksCollection.updateOne({ _id: new ObjectId(id) }, {
                $set: updateBookDto
            });

            const updatedBook = await booksCollection.findOne({ _id: new ObjectId(id) });



            return updatedBook;



        } catch (error) {
            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }
    }


    async delete(id: string): Promise<BookEntity> {

        try {
            const booksCollection = await MongoDatabase.getCollection('books');

            const book = await booksCollection.findOne({ _id: new ObjectId(id) });

            if (!book)
                throw CustomError.notFound('Book not found');

            await booksCollection.deleteOne({ _id: new ObjectId(id) });

            return BookMapper.bookEntityFromObject(book);





        } catch (error) {
            if (error instanceof BSONError)
                throw CustomError.badRequest('Invalid ID format');

            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }
    }


    async get(id: string): Promise<BookEntity> {

        try {
            const booksCollection = await MongoDatabase.getCollection('books');

            const book = await booksCollection.findOne({ _id: new ObjectId(id) });

            if (!book)
                throw CustomError.notFound('Book not found');

            return BookMapper.bookEntityFromObject(book);

        } catch (error) {
            if (error instanceof BSONError)
                throw CustomError.badRequest('Invalid ID format');

            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }
    }



    async searchBooks(searchTerm: string,page:number,pageSize:number,sort:string): Promise<BookEntity[]> {



        try {
            const booksCollection = await MongoDatabase.getCollection('books');

            const books = await booksCollection.find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } }
                ]
            })
            .sort({ title: sort === 'asc' ? 1 : -1 })
            .skip(pageSize * (page - 1)).limit(pageSize).toArray();

            
            return books.map(BookMapper.bookEntityFromObject);

        } catch (error) {
            if (error instanceof CustomError)
                throw error;

            throw CustomError.internal();
        }
    }


}