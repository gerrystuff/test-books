import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt";
import { ObjectId } from "mongodb";
import { MongoDatabase } from "../../data";

export class AuthMiddleware {

    static  validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.header('Authorization');

        if(!authorization) return res.status(401).json({ message: 'No token provided' });
        if(!authorization.startsWith('Bearer')) return res.status(401).json({ message: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{id:string}>(token);

            if(!payload) return res.status(401).json({ message: 'Invalid token' });


             // Obtener la colección de usuarios
             const usersCollection = await MongoDatabase.getCollection('users');


            // Verificar si existe el usuario mediante su id
            const user = await usersCollection.findOne({ _id: new ObjectId(payload.id)});

            if(!user)
                return res.status(401).json({ message: 'Invalid token' });


            req.body.user = user

            next();
        } catch(error) {
            console.log(error)
            return res.status(401).json({ message: 'Invalid token' });
        }

    }

}