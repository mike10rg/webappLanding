import { createContext, useContext, useEffect, useState} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../firebase'

export const authcontext = createContext()



export const useAuth = () => {
  const context = useContext(authcontext)
  if (!context) throw new Error('There is no auth provider')
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const singup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }
  const login = async (email, password) => 
     await signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

     useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false)
      })
      return () => unsubscribe()
  },  [])

  return (
    <authcontext.Provider value={{ singup, login, user, logout, loading, loginWithGoogle}}>
      {children}
    </authcontext.Provider>
  )

}
