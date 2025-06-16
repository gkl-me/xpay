import { create } from "zustand"
import { getMe } from "../api/user"
import type { AuthState, User } from "../types/IAuth"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { persist } from "zustand/middleware"


export const useAuthStore = create<AuthState>()(persist(
    (set) => ({
    user:null,
    isLoading:false,

    fetchUser:async () => {
        try {
            set({user:null,isLoading:true})
            const res = await getMe()
            set({user:res.user,isLoading:false})
        } catch (error) {
            set({user:null,isLoading:false})
            if(error instanceof AxiosError){
                toast.error(error.response?.data.message)
            }
        }
    },

    logout: () => {
        localStorage.removeItem('token')
        set({user:null})
        toast.error("User logout success")
    },

    setUser:(user:User) => set({user})
}),{
    name:"auth-store",
    partialize:(state) => ({user:state.user})
}
))