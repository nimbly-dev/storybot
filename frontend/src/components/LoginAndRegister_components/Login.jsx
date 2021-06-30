import React from 'react';


const Login = (
    {
        goToRegister,
        handleAnchorRegister
    }
)=>{
    return(
        <section className='container d-flex justify-content-end' id='login-form'>
                <div className='row'>
                    <h1 className='col-12'>Welcome</h1>
                    <form className='mt-4'>
                        <div class="form-group">
                            <label for="usernameInput">Username</label>
                            <input type="text" className="form-control" id="usernameInput"
                            placeholder="Enter email"/>
                            
                            <label for="passwordInput" className='mt-4'>Password</label>
                            <input type="text" className="form-control" id="passwordInput"
                            placeholder="Enter password"/>

                            <text id="emailHelp" className="form-text text-muted mt-4">Error Text Here</text>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <a href='#register' className='col-12' onClick={handleAnchorRegister} >Don't have a account? Sign up now!</a>
                    </form>
                </div>
            </section>
    )
}

export default Login