export class BookEntity {
    constructor(
        public id: string,
        public title: string,
        public authorId: string,
        public price: number,
        public category: string,
    ) { }
}