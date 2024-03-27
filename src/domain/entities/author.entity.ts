export class AuthorEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public birthdate: Date
    ) { }
}