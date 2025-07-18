import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthTokenRepository } from '../repositories/AuthTokenRepository';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();
const secret = process.env.TOKEN_SECRET || '';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Inside authenticate middleware");
    try {
        console.log("start");
        const cookie = req.headers.authorization;
        console.log(cookie);
        if (!cookie) throw new Error('No Cookie provided');
        const token = cookie.split(' ')[1];
        console.log(token);
        if(!token) throw new Error('No token provided');

        const authRepo = await AuthTokenRepository.getAuthToken(token);
        console.log(authRepo);
        if (!authRepo) throw new Error('Cannot get token');
        const type = authRepo.type;
        console.log(type);
        
        const { id } = jwt.verify(token, secret) as { id: string };
        console.log(id);
        if(!id) throw new Error('Cannot verify token');
        logger.info("Identity verified successfully");
        console.log("Identity verified successfully");
        console.log("authUser", req.body.authUser);
        req.body.authUser = id;
        console.log("authUser", req.body.authUser);
        req.body.authType = type;
        console.log("authType", req.body.authType);
        console.log("end");
        next();
        
    } catch(err: unknown) {
        if(err instanceof Error) {
            logger.error(err.message);
            res.status(401).json({
                success: false,
                message: err.message
            });
            return;
        } else {
            logger.error('Error checking token in admin middleware');
            res.status(401).json({
                success: false,
                message: 'Error checking token'
            });
            return;
        }
    }

}