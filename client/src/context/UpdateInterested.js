import { createContext, useReducer, useEffect } from "react";

export const UpdatedInterest = createContext()

export const authReducer = (state, action) =>{
    switch(action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}
export const UpdatedInterestProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    useEffect(()=>{
        //check in the beginning if the cookie exists in localstorage
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN', payload: user})
        }
    },[])
    console.log('UpdatedInterest state:', state)

    return (
        <UpdatedInterest.Provider value={{...state, dispatch}}>
            {children}
        </UpdatedInterest.Provider>
    )
}