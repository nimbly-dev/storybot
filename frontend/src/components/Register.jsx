import React from 'react';


const Register = (

)=>{
    return(
        <section className='container d-flex justify-content-end' id='register-form'>
        <div className='row'>
            <h1 className='col-12 header-register'>Create a account</h1>
            <form className='mt-4'>
                <div class="form-group">
                    <label for="usernameInput">Username</label>
                    <input type="text" className="form-control" id="usernameInput"
                    placeholder="Enter email"/>

                    <label for="emailInput" className='mt-3'>Email</label>
                    <input type="email" className="form-control" id="emailInput"
                    placeholder="Enter email"/>
                    
                    <label for="passwordInput" className='mt-3'>Password</label>
                    <input type="password" className="form-control" id="passwordInput"
                    placeholder="Enter password" aria-describedby="passwordHelp"/>
                    <medium id="passwordHelp" className="form-text text-muted">Weak Password!</medium>


                    <label for="passwordInput" className='mt-3'>Confirm Password</label>
                    <input type="password" className="form-control" id="passwordInput"
                    placeholder="Confirm password"/>

                    <medium id="emailHelp" className="form-text text-muted mt-4">Error Text Here</medium>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <a href='' className='col-12'>Already have an account? Sign in now!</a>
            </form>
        </div>
    </section>
    )
}

export default Register