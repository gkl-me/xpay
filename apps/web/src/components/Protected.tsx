    import { useEffect } from "react"
    import { useAuthStore } from "../store/authStore"
    import { Navigate, Outlet } from "react-router-dom"
import { toast } from "sonner"
import { AxiosError } from "axios"

    function Protected() {

        const {user,fetchUser,isLoading} = useAuthStore()

        useEffect(() => {
            const fetchUserData = async() => {
                try {
                    await fetchUser()
                } catch (error) {
                    if(error instanceof AxiosError){
                        toast.error(error.response?.data.message)
                    }
                }
            }
            fetchUserData()

        },[fetchUser])


        if(isLoading) return <div>Loading</div>
        return user ? <Outlet/> : <Navigate to={'/login'}/>
    }

    export default Protected