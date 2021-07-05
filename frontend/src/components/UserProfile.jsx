import React from 'react'


const UserProfile = (
    {
    token
    }
)=>{
    console.log(token)

    const handleLogout = ()=>{
        localStorage.clear()
        window.location.reload(false); 
    }

    if (token.username !== null)
        return(
            <section className='container d-flex justify-content-center'>
                <div>
                    <h3>You are now logged in {token.username}</h3>
                    <button type="button" onClick={handleLogout} className="btn btn-primary">Logout</button>
                </div>
            </section>
        )
    
        
}

export default UserProfile