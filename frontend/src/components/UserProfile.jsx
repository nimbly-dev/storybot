import { useState } from 'react'

import Navigation from './@navigation/Navigation'

const UserProfile = (
   
)=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const imgSrc = "https://nimbly-dev.github.io/img/test-avatar.91e50cc7.png"

    console.log(token.username)
    if (token.username !== null)
        return(
            <main>
                <Navigation currentPage={'Userprofile'}/>
                <section className='container-fluid d-flex justify-content-center'>
                    <div className="row d-flex  flex-column">
                        <div className="col-xs-12">
                            <img src={imgSrc} style={{
                                width: 280,
                            }} 
                            alt={'Img src not found'}/>
                            <h3 className='mt-3 '
                            style={{
                                paddingLeft: 30
                            }}
                            >Welcome back! {token.username}</h3>
                            <form className="form-inline mt-4">
                                <label className="sr-only" for="inlineFormInputGroup">Username</label>
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0 pl-4">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inlineFormInputGroup" 
                                    placeholder="Filter your stories"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Go</button>
                            </form>
                        </div>
                    </div>
                    
                </section>
            </main>
           
        )
    
        
}

export default UserProfile