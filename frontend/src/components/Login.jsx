import React, {useState} from 'react';
import {Link, useHistory, useLocation } from 'react-router-dom'

//Import 3rd party libraries
import axios from 'axios';


//Import child components
import ErrorText from './@error_text/ErrorText';

//Import utility
import { URL_ROUTERS } from '../utility/strings.js'

const INVALID_LOGIN_CREDENTIAL = "Invalid Login Credentials"

const Login = (

)=>{
    const location = useLocation();
    const history = useHistory();

    const [hasError, setHasError] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleTestLogin = (event)=>{
        event.preventDefault()
        axiosLogin()
    }

    const ROBOT_ICON_URL = 'https://i.pinimg.com/originals/a7/98/42/a79842bfa9a2d36047d3478a944b8506.gif'

    const axiosLogin =  () =>{
        let formdata = new FormData()

        formdata.append("username", username)
        formdata.append("password", password)
        
        axios.post(URL_ROUTERS.base_url_login,formdata)
        .then((response)=>{ 
            console.log('Logged in')
            if (response.statusText === 404){
                setHasError(true)
                throw new Error("User credentials not found")
            }
            if (response.statusText === 422){
                setHasError(true)
                throw new Error("Unproccesable entity")
            }
            const result = response.data

            localStorage.setItem('isAuthenticated',true)
            localStorage.setItem('token', JSON.stringify(result))
            const { from } = location.state || { from: { pathname: "/userprofile" } };
            history.replace(from)
            console.log(result)
        })
        .catch((error)=>{
            if (error.response) {
                console.log("HAS ERROR")
                setHasError(true)
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    return(
        <section className='container d-flex justify-content-end' id='login-form'>
                {/* <img src={ROBOT_ICON_URL} alt={'Hotdog'} className={'robot-icon'}/> */}
                <div className='row'>
                    <h1 className='col-12'>Welcome</h1>
                    <form className='mt-4' onSubmit={(e)=>handleTestLogin(e)} id='login_form'>
                        <div class="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                            type="text"
                            className="form-control" 
                            name="username"
                            placeholder='Enter username'
                            onChange={e=>setUsername(e.target.value)}
                            required
                            />
                            
                            <label htmlFor="password" className='mt-4'>Password</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            name="password"
                            placeholder='Enter password'
                            onChange={e=>setPassword(e.target.value)}
                            required
                            />

                            <ErrorText errorText={INVALID_LOGIN_CREDENTIAL} hasErrors={hasError}/> 
                        </div>
                        <button 
                        type="submit" 
                        className="btn btn-primary"
                        >
                            Login
                        </button>
                        <Link to="/register">
                            <a href='#register' 
                            className='col-12' >Don't have a account? Sign up now!
                            </a>
                        </Link>
                    </form>
                </div>
            </section>
    )
}

export default Login