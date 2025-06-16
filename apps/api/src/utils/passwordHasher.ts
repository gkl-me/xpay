
import bcrypt from 'bcryptjs';

export async function hashPassword(password:string){
    try {
        
        const salt = 10
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;

    } catch (error) {
        throw new Error('Error hashing password');
    }
}


export async function comparePassword(password:string,hashPassword:string){
    try {
        
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;

    } catch (error) {
        console.log(error)
        throw new Error('Error comparing password');
    }
}