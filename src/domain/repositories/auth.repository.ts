import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {

    abstract register( registerUserDto: RegisterUserDto ): Promise<UserEntity>;
    abstract signIn( email: string, password: string ): Promise<UserEntity>;

 
}