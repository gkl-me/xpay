import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { AuthFormProps } from '../types/IAuth';
import { toast } from 'sonner';
import { AxiosError } from 'axios';


const AuthForm= ({ type, onSubmit }:AuthFormProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    const navigate = useNavigate()
    const {fetchUser} = useAuthStore()
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if(type == 'register') {
                const res = await onSubmit({name, email, password, phone});
                toast.success(res.message)
                navigate('/login')
            }else if(type == 'login') {
                const res = await onSubmit({email, password});
                toast.success(res.message)
                if(res.success){
                    await fetchUser()
                    navigate('/dashboard')
                }
            }
        } catch (error) {
            if(error instanceof AxiosError){
                toast.error(error.response?.data.message)
            }
        }
    }

  return (
  type === 'register' ? (

     <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" value={name} className="w-full px-3 py-2 border rounded-md" onChange={(e) => setName(e.target.value)} />
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" value={email}  className="w-full px-3 py-2 border rounded-md"  onChange={(e) => setEmail(e.target.value)} />
        <label className="block text-sm font-medium mb-1">Password</label>
        <input type="password" value={password} className="w-full px-3 py-2 border rounded-md"  onChange={(e) => setPassword(e.target.value)} /> 
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input type="tel" value={phone} className="w-full px-3 py-2 border rounded-md"  onChange={(e) => setPhone(e.target.value)} />
        <button type="submit" className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">Register</button>
     </form>
  ) : (
     <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" value={email} className="w-full px-3 py-2 border rounded-md"  onChange={(e) => setEmail(e.target.value)} />
        <label className="block text-sm font-medium mb-1">Password</label>
        <input type="password" value={password}  className="w-full px-3 py-2 border rounded-md" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">Login</button>
     </form>
  )
)
}

export default AuthForm