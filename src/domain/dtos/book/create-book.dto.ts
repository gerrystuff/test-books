import { Validators } from "../../../config";

export class CreateBookDto {
    private constructor(
        public title: string,
        public price: number,
        public authorId: number,
    ) { }

    static create(object: {[key: string]: any}): [ string?, CreateBookDto? ] {
        if(!object) return ['book data is required title, pages, price, authorId'];
        const { title, price, authorId } = object;

        if (!title) return ['title is required'];
        if (!price) return ['price is required'];
        if (!authorId) return ['authorId is required'];

        return [
            undefined,
            new CreateBookDto(title, price, authorId)
        ]
    }
}