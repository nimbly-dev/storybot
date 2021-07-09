import react from 'react'

import {useHistory, useLocation } from 'react-router-dom'

const AnchorItems = ({currentPage})=>{
    const location = useLocation();
    const history = useHistory();

    const handleLogout = ()=>{
        localStorage.clear()
        window.location.reload(false); 
    }

    const handleUserprofileRedirect = ()=>{
        const { from } = location.state || { from: { pathname: "/userprofile" } };
        history.replace(from)
    }

    if(currentPage === 'Userprofile') {
        return(
            <ul className="navbar-nav justify-content-between ml-auto">
                <li className="nav-item">
                    <a className="nav-link text-light text-muted"  href="#browse">
                        Browse
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active text-light" href="#userprofile">User Profile</a>
                </li>
                <li class="nav-item">
                    <a onClick={handleLogout} className="nav-link text-light text-muted" href="#logout">Logout</a>
                </li>
            </ul>
        )
    } 
    else if(currentPage === 'Browse'){
        return(
            <ul className="navbar-nav justify-content-between ml-auto">
                <li className="nav-item">
                    <a className="nav-link text-light active" href="#">
                        Browse
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={handleUserprofileRedirect} className="nav-link text-light text-muted" href="#userprofile">User Profile</a>
                </li>
                <li class="nav-item">
                    <a onClick={handleLogout} className="nav-link text-light text-muted" href="#logout">Logout</a>
                </li>
            </ul>
        )
    }
    else{
        return(
            <ul className="navbar-nav justify-content-between ml-auto">
                <li className="nav-item">
                    <a className="nav-link text-light text-muted" href="#">
                        Browse
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={handleUserprofileRedirect} className="nav-link text-light text-muted" href="#userprofile">User Profile</a>
                </li>
                <li class="nav-item">
                    <a onClick={handleLogout} className="nav-link text-light text-muted" href="#logout">Logout</a>
                </li>
            </ul>
        )
    }
}

export default AnchorItems