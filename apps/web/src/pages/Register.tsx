
import AuthForm from '../components/AuthForm'
import { register } from '../api/auth'

function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Register</h1>
          <p className="text-gray-600 mt-2">Please sregister new account</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <AuthForm type='register' onSubmit={register} />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register