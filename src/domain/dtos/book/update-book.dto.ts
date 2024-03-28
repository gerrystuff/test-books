

export class UpdateBookDto {
    private constructor(
        public title: string,
        public price: number,
    ) { }

    static update(object: {[key: string]: any}): [ string?, UpdateBookDto? ] {


        if(!object) return ['The data allowed to update is title and price'];
        const { title, price, authorId } = object;

        if (authorId) return ['authorId is not allowed to update'];

        return [
            undefined,
            new UpdateBookDto(title, price)
        ]
    }
}