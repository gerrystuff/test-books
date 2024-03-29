import { CustomError } from "../errors/custom.error";
import { Response } from 'express';


export const handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError)
            return res.status(error.statusCode).json({ message: error.message });

            console.log(error)
        return res.status(500).json({ message: 'Internal server error' });

    }


