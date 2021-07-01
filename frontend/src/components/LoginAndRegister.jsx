import React, {useState} from 'react'


//Import child components

import Login from './LoginAndRegister_components/Login'
import Register from './LoginAndRegister_components/Register'

const LoginAndRegister = ({handleLoginAndLogout})=>{
    const [isRegister, setIsRegister] = useState(false)

    const handleAnchorRegister = () =>{
        
        if (isRegister === false){
            setIsRegister(true)
        }else{
            setIsRegister(false)
        }
        
    }

    if (isRegister === false){
        return <Login handleAnchorRegister={handleAnchorRegister} handleLoginAndLogout={handleLoginAndLogout}/>
    }else {
       return <Register handleAnchorRegister={handleAnchorRegister}/>
    }
} 

export default LoginAndRegister