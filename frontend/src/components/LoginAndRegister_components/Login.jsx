import React, {useState} from 'react';


//Import child components
import ErrorText from './ErrorText';


const INVALID_LOGIN_CREDENTIAL = "Invalid Login Credentials"

const Login = (
    {
        handleLoginAndLogout,
        handleAnchorRegister
    }
)=>{
    const [validCredentials, setValidCredentials] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)

    const [username, setNewUsername] = useState('Enter username')
    const [password, setNewPassword] = useState('Enter password')

    const handleUsernameChange = (event) =>{
        setNewUsername(event.target.value)
    };

    const handlePasswordChange = (event) =>{
        setNewPassword(event.target.value)
    }

    const handleTestLogin = ()=>{
        if (username !== 'test' && password !== 'test2'){
            console.log('Invalid')
            setHasErrors(true)
        }else{
            console.log('Valid')
            setValidCredentials(false)
        }
    }


    return(
        <section className='container d-flex justify-content-end' id='login-form'>
                <div className='row'>
                    <h1 className='col-12'>Welcome</h1>
                    <form className='mt-4' onSubmit={()=>handleTestLogin()}>
                        <div class="form-group">
                            <label for="usernameInput">Username</label>
                            <input 
                            type="text"
                            className="form-control" 
                            id="usernameInput"
                            placeholder={username}
                            onChange={handleUsernameChange}
                            />
                            
                            <label for="passwordInput" className='mt-4'>Password</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="passwordInput"
                            placeholder={password}
                            onChange={handlePasswordChange}
                            />

                            <ErrorText errorText={INVALID_LOGIN_CREDENTIAL} hasErrors={hasErrors}/>
                        </div>
                        <button 
                        type="submit" 
                        className="btn btn-primary">
                            Login
                        </button>
                        <a href='#register' 
                        className='col-12' 
                        onClick={handleAnchorRegister} >Don't have a account? Sign up now!</a>
                    </form>
                </div>
            </section>
    )
}

export default Login