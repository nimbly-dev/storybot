import React from 'react';


const Login = (
    {
        RobotIconURL
    }
)=>{
    return(
        <section className='container d-flex justify-content-end' id='login-form'>
                <div className='row'>
                    <h1 className='col-12'>Welcome</h1>
                    <form className='mt-4'>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Enter email"/>
                            
                            <label for="exampleInputEmail1" className='mt-4'>Password</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Enter email"/>

                            <medium id="emailHelp" className="form-text text-muted mt-4">Error Text Here</medium>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <a href='' className='col-12'>Don't have a account? Sign up now!</a>
                    </form>
                </div>
            </section>
    )
}

export default Login