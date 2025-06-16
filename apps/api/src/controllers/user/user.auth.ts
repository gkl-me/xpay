import { Request, Response } from 'express';
import primsa from '@repo/db/src/index'
import { generateToken } from '../../utils/tokenManager';
import { comparePassword, hashPassword } from '../../utils/passwordHasher';
import {loginUserSchema, registerUserSchema} from '@repo/common'


export async function registerUser(req:Request, res:Response) {
    try {

        //validate req body
        const {name, email, password,phone} = req.body;

        const validateData = registerUserSchema.safeParse({name,email,password,phone})

        if(!validateData.success){
            res.status(400).json({
                success:false,
                message:validateData.error.errors[0]?.message
            })
            return
        }

        //password validation can be added here
        const hashedPassword = await hashPassword(password);

        //if user already exists
        const userAlreadyExits = await primsa.user.findUnique({
            where:{
                email,
            }
        })

        if(userAlreadyExits){
            res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
            return
        }

        const user = await primsa.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone
            },
        })

        res.status(201).json({
            success:true,
            message: 'User registered successfully',
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'User registration failed',
        });
    }
}


export async function loginUser(req:Request, res:Response) {
    try {
        //validate req body
        const {email, password} = req.body;

        //validate inputs 
        const validateData = loginUserSchema.safeParse({email,password})
        if(!validateData.success){
            res.status(400).json({
                success:false,
                message:validateData.error.errors[0]?.message
            })
        }

        const user = await primsa.user.findUnique({
            where: {
                email
            },
            select:{
                id:true,
                name:true,
                password:true,
            }
        });

        if (!user) {
            res.status(401).json({
                success:false,
                message: 'Invalid email or password'
            });
            return;
        }

        const isMatch = await comparePassword(password,user.password)
        if(!isMatch){
            res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
            return
        }

        //generate token
        const token = generateToken(user.id);

        res.status(200).json({
            success:true,
            message: 'User logged in successfully',
            token,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'User login failed',
            error
        });
    }
}


export async function getUserProfile(req:Request,res:Response) {
    try {
        
        const userId = req.userId

        const user  = await primsa.user.findUnique({
            where: {
                id: userId
            },
            include:{
                transactions: true,
                sentTransactions:true,
                receivedTransactions:true
            },omit:{
                password: true 
            }
        });
        if (!user) {
            res.status(404).json({
                success:false,
                message: 'User not found'
            });
            return;
        }

        
        res.status(200).json({
            success:true,
            message: 'User profile retrieved successfully',
            user
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Error retrieving user profile',
            error
        });
    }
}