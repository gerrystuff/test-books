import { Validators } from "../../../config";

export class CreateAuthorDto {
    private constructor(
        public name: string,
        public email: string,
        public birthdate: Date
    ) { }
    

    static create(object: {[key: string]: any}): [ string?, CreateAuthorDto? ] {
        if(!object) return ['author data is required name, email, birthdate'];
        const { name, email, birthdate } = object;

        if (!name) return ['name is required'];
        if (!email) return ['email is required'];
        if (!Validators.email.test(email)) return ['email is invalid'];
        if (!birthdate) return ['birthdate is required'];

        return [
            undefined,
            new CreateAuthorDto(name, email, birthdate)
        ]

    }
}