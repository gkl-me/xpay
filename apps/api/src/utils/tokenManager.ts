
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function generateToken(userId: string){
    try {

        const token = jwt.sign({
            id: userId
        },process.env.JWT_SECRET as string,{
            expiresIn:"15m"
        })

        return token;

    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
}


export function verifyToken(token:string){
    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string);
        return decoded as { id: string }; // Type assertion to ensure the return type is correct

    } catch (error) {
        console.error('Error verifying token:', error);
        throw new Error('Token verification failed');
    }
}

