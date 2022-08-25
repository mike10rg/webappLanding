import { useAuth } from "../context/AuthContext";

export function Home(){
  const {user, logout, loading} = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  if (loading) return <h1>Cargando</h1>
  
  return ( 
  <div className="w-full max-w-xs m-auto text-black">
    <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
    <h1 className="text-x1 mb-4"> Bienvenido {user.displayName || user.email}</h1>
    <button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Salir</button>
  </div>
  </div>
  )
}