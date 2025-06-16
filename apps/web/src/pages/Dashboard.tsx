import { useAuthStore } from '../store/authStore'

function Dashboard() {

    const {user,logout} = useAuthStore()
    console.log(user)

    const handleLogout = () => {
        logout()
    }

  return (
    <div>Dashboard
        <button onClick={() => handleLogout()} 
        >Logout</button>
        <div>
            <h1>name:{user?.name}</h1>
            <h1>email:{user?.email}</h1>
            <h1>phone:{user?.phone}</h1>
        </div>
    </div>
  )
}

export default Dashboard