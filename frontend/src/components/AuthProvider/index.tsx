import React, {FC, PropsWithChildren, useState} from "react";
import {useNavigate} from 'react-router-dom'

export const AuthContext = React.createContext<{authenticated:boolean, login:(token:string)=>void,logout:()=>void}|null>(null);

export const AuthProvider:FC<PropsWithChildren<{}>> = (props)=>{
    const [authenticated,setAuthenticated] = useState(!!localStorage.getItem('token'));

    const navigate = useNavigate();

    const login = (token:string)=>{
        localStorage.setItem('token',token);
        setAuthenticated(true);
        navigate('/',{replace:true})
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setAuthenticated(false);
        navigate('/',{replace:true})
    }

    return <AuthContext.Provider value={{authenticated,login,logout}}>
        {props?.children}
    </AuthContext.Provider>
}