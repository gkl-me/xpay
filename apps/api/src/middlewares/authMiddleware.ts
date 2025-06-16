import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/tokenManager";

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}


export async function auth(req:Request,res:Response,next:NextFunction){
    try {
        
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        //verify token using jwt

        const decoded = verifyToken(token)
        if (!decoded) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        req.userId = decoded?.id ; // Attach the decoded user info to the request object

        next();

    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error
        });
    }
}