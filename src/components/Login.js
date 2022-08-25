import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoogleSignin = async() => {
    await loginWithGoogle()
    navigate("/")
  }

  return (
   <div className="w-full max-w-xs m-auto">
    {error && <p>{error}</p>}
     <form onSubmit={handleSubmit} className= "bg-white shadow-md rounded px-8 pt-6 pb-8 b-4">
      
      <div className='mb-4'>
      <label htmlFor="email" className='block text-gray-700 text-sm font-bold-2'>Email</label>
      <input
        type="email"
        name="email"
        placeholder="ejemplo@company.xd"
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leanding-tigth focus:outline-none focus:shadow-outline'
        onChange={handleChange}
      />
      </div>

      <div className="mb-4">
      <label htmlFor="password" className='block text-gray-700 text-sm font-bold-2'>Contraseña</label>
      <input
        type="password"
        name="password"
        placeholder="********"
        id="password"
        onChange={handleChange}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leanding-tigth focus:outline-none focus:shadow-outline'
      />
      </div>

      <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Ingresar</button>
    </form>

    <p className='my-4 text-sm flex justify-between px-3'>No tienes una cuenta? <Link to ='/register'>Registrate</Link></p>

      <button onClick={handleGoogleSignin}
      className= 'bg-slate-50 hover:bg-slate-200 text-black shadow-mb rounded border-2 border-gray-300 py-2 px-4 w-full'>Ingresar con Google</button>
   </div>
  )
}
