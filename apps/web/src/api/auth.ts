import type { ILogin, IRegister } from "../types/IAuth";
import axiosInstance from "./axiosInstance";


export const register = async(data: IRegister) => {
    const res = await axiosInstance.post('/api/user/register', data);
    return res.data;
}


export const login = async(data:ILogin) => {
    const res = await axiosInstance.post('/api/user/login',data)
    localStorage.setItem('token',res.data.token)
    return res.data;
}

