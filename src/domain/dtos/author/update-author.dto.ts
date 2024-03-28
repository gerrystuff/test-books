import { Validators } from "../../../config";


export class UpdateAuthorDto {
    private constructor(
        public name: string,
        public email: string,
    ) { }

    static update(object: {[key: string]: any}): [ string?, UpdateAuthorDto? ] {


        if(!object) return ['The data allowed to update is name and email'];
       
        const { name, email } = object;

        if(email) 
            if (!Validators.email.test(email)) return ['email is invalid'];
        
        
        return [
            undefined,
            new UpdateAuthorDto(name,email)
        ]
    }
}