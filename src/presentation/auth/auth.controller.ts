
import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUserDto } from '../../domain';
import { JwtAdapter } from '../../config/jwt';
import { handleError } from '../../domain/handlers/error.handler';

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ) {
    }



    signUpUser = async(req:Request, res:Response) => {
        const [ error , registerUSerDto ] = RegisterUserDto.create(req.body);

        if( error ) return res.status(400).json({ message: error });

        this.authRepository.register(registerUSerDto!)
            .then( async user  => {

                res.json({
                    user,
                    token: await JwtAdapter.generateToken({ id: user.id })
                })
            })
            .catch( error => handleError(error, res));

    }

    signInUser = async(req:Request, res:Response) => {

        const { email, password } = req.body;

        this.authRepository.signIn(email, password)
            .then( async user => {
                res.json({
                    user,
                    token: await JwtAdapter.generateToken({ id: user.id })
                })
            })
            .catch( error => handleError(error, res));

    }


    auth = async(req:Request, res:Response) => {

            return res.json({
                user: req.body.user
            })
    }

  
}