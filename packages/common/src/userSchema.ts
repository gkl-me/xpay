
import {z} from 'zod'

export const registerUserSchema = z.object({
    name:z.string().min(3,{message:"Name should be present"}),
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(4,{message:"Password should be min three char"}),
    phone:z.string().min(10,{message:"Phone number should be min 10 digits"})
})

export const loginUserSchema = registerUserSchema.partial()
