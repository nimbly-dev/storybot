import React, {useState} from 'react';
import {Link, useHistory, useLocation } from 'react-router-dom'

//Import 3rd party libraries
import { Col, Row, Form, Button } from 'react-bootstrap';

//Import child components
import ErrorText from './@error_text/ErrorText';

//Import utility
import { axiosLoginUser } from './@methods/User';

const INVALID_LOGIN_CREDENTIAL = "Invalid Login Credentials"

const Login = ()=>{
    const location = useLocation();
    const history = useHistory();

    const [hasError, setHasError] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event)=>{
        event.preventDefault()
        axiosLoginUser(username,password,setHasError,location,history)
    }

    const ROBOT_ICON_URL = 'https://i.pinimg.com/originals/a7/98/42/a79842bfa9a2d36047d3478a944b8506.gif'

    return(
        <section className='container' id='login-form'>
                <Row>
                    <Col md='8'> <img src={ROBOT_ICON_URL} alt={'Hotdog'} className='robot-icon'/></Col>
                    <Col md='4' className='d-flex justify-content-end'>
                        <Form className='mt-4' onSubmit={(e)=>handleLogin(e)} id='login_form'>
                            <h1 className="d-flex justify-content-center">Welcome</h1>
                            <Form.Group>
                                <Form.Label style={{fontSize: 16}}>Username</Form.Label>
                                <Form.Control 
                                    type="text"
                                    className="form-control" 
                                    name="username"
                                    placeholder='Enter username'
                                    onChange={e=>setUsername(e.target.value)}
                                    required
                                />
                                
                                <Form.Label className='mt-3' style={{fontSize: 16}}>Password</Form.Label>
                                    <Form.Control  
                                    type="text" 
                                    className="form-control" 
                                    name="password"
                                    placeholder='Enter password'
                                    onChange={e=>setPassword(e.target.value)}
                                    required
                                        />

                                <ErrorText errorText={INVALID_LOGIN_CREDENTIAL} hasErrors={hasError}/> 
                            </Form.Group>  
                            <Button 
                            type="submit" 
                            variant='primary'
                            >
                                Login
                            </Button>   
                            <Link to="/register">
                                <a href='#register' 
                                className='col-12' >Don't have a account? Sign up now!
                                </a>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </section>
    )
}

export default Login