import { Response } from 'express';


export const handleSuccess = (data: unknown, res: Response, statusCode: number = 200) => {
    const itemCount = Array.isArray(data) ? data.length : undefined;
    return res.status(statusCode).json({
        status: 'success',
        timestamp: new Date().getTime(),
        count: itemCount,
        data
    });
}