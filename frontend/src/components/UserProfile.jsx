import React from 'react'

const UserProfile = (
    {handleLoginAndLogout}
)=>{
    return(
        <section className='container d-flex justify-content-center'>
            <div>
                <h3>You are now logged in</h3>
                <button type="button" onClick={handleLoginAndLogout} className="btn btn-primary">Logout</button>
            </div>
        </section>
    )
}

export default UserProfile