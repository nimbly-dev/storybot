import React from 'react'

import {Link, useHistory} from 'react-router-dom'

const UserProfile = (
    {handleLoginAndLogout
    ,loginData
    }
)=>{
    const history = useHistory();
    console.log(loginData)

    if (loginData !== null)
        return(
            <section className='container d-flex justify-content-center'>
                <div>
                    <h3>You are now logged in {loginData.username}</h3>
                    <button type="button" onClick={handleLoginAndLogout} className="btn btn-primary">Logout</button>
                </div>
            </section>
        )
    else if(loginData === null){
        history.push("/login")
        return null
    } 
        
}

export default UserProfile