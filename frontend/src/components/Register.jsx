import React, {  } from 'react';
import { useForm } from "react-hook-form";

//Import URL Paths
import { URL_ROUTERS } from "../utility/strings"

//Import third libraries
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import {Link, useHistory,useLocation} from 'react-router-dom'
import { Col, Form, Row,Button } from 'react-bootstrap';

const Register = ()=>{
    const schema = yup.object().shape({
        username: yup.string().required('Username field is required'),
        email: yup.string().email('Email must be valid').required('Email field is required'),
        password: yup.string()
            .required('Password field is required')
            .min(1, 'Password is too short - should be 8 chars minimum.'),
        confirmPassword: yup.string()
            .required()
            .oneOf([yup.ref('password'), null],'Password do not match')
    })

    const ROBOT_ICON_URL = 'https://i.pinimg.com/originals/a7/98/42/a79842bfa9a2d36047d3478a944b8506.gif'
    const { register, formState: {errors}, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const location = useLocation();
    const history = useHistory();

    
    const handleRegisterForm = (data)=>{
     
        let formData = new FormData()
        
        formData.append("username", data.username)
        formData.append("email", data.email)
        formData.append("password",  data.password)

        axiosRegister(formData)
    }
    

    const axiosRegister = async (formData)=>{
        axios.post(URL_ROUTERS.base_url_create_account,{
                username: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password"),
        })
        .then((response)=>{
            console.log('Creating New Account')
            const result = response.data
            console.log(result)
            const { from } = location.state || { from: { pathname: "/login" } };
            history.replace(from)
        })
        .catch((error)=>{
            if (error.response) {
                console.log("HAS ERROR")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })

    }

    return(
        <section className='container' id='register-form'>
            <Row>
                <Col md='8'> <img src={ROBOT_ICON_URL} alt={'Hotdog'} className='robot-icon mt-5 ml-2'/></Col>
                <Col md='4' className='mt-3'>
                    <h1 className='d-flex justify-content-center'>Create a account</h1>
                    <Form className='mt-4' onSubmit={handleSubmit(handleRegisterForm)}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter username"
                            name="username"
                            {...register("username")}
                            />
                            <medium className="form-text text-muted">
                                {errors.username?.message}
                            </medium>

                            <Form.Label className='mt-3'>Email</Form.Label>
                            <Form.Control  
                            type="email" 
                            name="email"
                            {...register("email")}
                            placeholder="Enter email"
                            />
                            <medium className="form-text text-muted">
                                {errors.email?.message}
                            </medium>

                            <Form.Label className='mt-3'>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            {...register("password")} 
                            name="password"
                            placeholder="Enter password" 
                            aria-describedby="password-help"
                            />
                            <medium id='password-help'className="form-text text-muted">
                                {errors.password?.message}
                            </medium>


                            <Form.Label for="confirmPassword" className='mt-3'>Confirm Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            className="form-control"
                            placeholder="Confirm password"
                            {...register("confirmPassword")} 
                            name="confirmPassword"
                            />
                            <medium id='password-help'className="form-text text-muted">
                                {errors.confirmPassword?.message}
                            </medium>

                        </Form.Group>
                        <Button type="submit" variant='primary'>Register</Button>
                        <Link to='/login'>
                            <a href='#login'  className='col-12'>Already have an account? Sign in now!</a>
                        </Link>
                    </Form>
                </Col>
            </Row>
    </section>
    )
}

export default Register