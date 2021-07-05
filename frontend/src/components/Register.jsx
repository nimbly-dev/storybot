import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import {Link, useHistory,useLocation} from 'react-router-dom'

//Import third libraries
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';

//Import URL Paths
import strings, { URL_ROUTERS } from "../utility/strings"

const Register = (

)=>{
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
        <section className='container d-flex justify-content-end' id='register-form'>
        <div className='row'>
            <h1 className='col-12 header-register'>Create a account</h1>
            <form className='mt-4' onSubmit={handleSubmit(handleRegisterForm)}>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter email"
                    name="username"
                    {...register("username")}
                    />
                    <medium className="form-text text-muted">
                        {errors.username?.message}
                    </medium>

                    <label for="emailInput" className='mt-3'>Email</label>
                    <input type="email" 
                    name="email"
                    {...register("email")}
                    className="form-control"
                    placeholder="Enter email"
                    />
                    <medium className="form-text text-muted">
                        {errors.email?.message}
                    </medium>
                    <label for="password" className='mt-3'>Password</label>
                    <input type="password" 
                    className="form-control"
                    {...register("password")} 
                    name="password"
                    placeholder="Enter password" 
                    aria-describedby="password-help"
                    />
                    <medium id='password-help'className="form-text text-muted">
                        {errors.password?.message}
                    </medium>


                    <label for="confirmPassword" className='mt-3'>Confirm Password</label>
                    <input 
                    type="password" 
                    className="form-control"
                    placeholder="Confirm password"
                    {...register("confirmPassword")} 
                    name="confirmPassword"
                    />
                    <medium id='password-help'className="form-text text-muted">
                        {errors.confirmPassword?.message}
                    </medium>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <Link to='/login'>
                    <a href='#login'  className='col-12'>Already have an account? Sign in now!</a>
                </Link>
            </form>
        </div>
    </section>
    )
}

export default Register