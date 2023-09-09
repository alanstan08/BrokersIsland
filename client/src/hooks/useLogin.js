import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'
 
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const {dispatch } = useAuthContext()
    const login = async(details) => {
        setLoading(true)
        setError(null)
        const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
          'Content-Type': 'application/json',
        }
        })
        const json = await response.json()
        if (!response.ok) {
            setLoading(false)
            setError(json.error)
            
          }
        if (response.ok) {
        setLoading(false)
        //saving user to local storage
        localStorage.setItem('user', JSON.stringify(json));
        //change dispatch function
        dispatch({type: 'LOGIN', payload: json})
        }
    }
    return {login, isLoading, error}
}