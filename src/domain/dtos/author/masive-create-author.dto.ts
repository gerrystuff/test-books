import { CreateAuthorDto } from "./create-author.dto";

export class MassiveCreateAuthorDto {
    private constructor(
        public authors: CreateAuthorDto[]
    ) { }
    

    static create(object: {[key: string]: any}): [ string?, MassiveCreateAuthorDto? ] {
        if(!object) return ['author data is required authors'];
        const { authors } = object;

        if (!authors) return ['authors is required'];


        if (!Array.isArray(authors)) return ['authors must be an array'];

        if (authors.length === 0) return ['authors must have at least one author'];

        for (let i = 0; i < authors.length; i++) {
            const author = authors[i];
            const [ error ] = CreateAuthorDto.create(author);
            if (error) return [error];
        }

        

        

        return [
            undefined,
            new MassiveCreateAuthorDto(authors)
        ]

    }

}