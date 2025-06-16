import AuthForm from '../components/AuthForm'
import { login } from '../api/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function Login() {

  const navigate = useNavigate()
  const {user} = useAuthStore()

  console.log(user)

  useEffect(() => {
    if(user){
      navigate('/dashboard')
    }
  },[user,navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <AuthForm type="login" onSubmit={login} />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="register" className="text-blue-600 hover:text-blue-800 font-medium">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login