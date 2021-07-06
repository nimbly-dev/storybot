import react from 'react'


const AnchorItems = ({currentPage})=>{
    const handleLogout = ()=>{
        localStorage.clear()
        window.location.reload(false); 
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
                    <a className="nav-link text-light text-muted" href="#">User Profile</a>
                </li>
                <li class="nav-item">
                    <a className="nav-link text-light text-muted" href="#">Logout</a>
                </li>
            </ul>
        )
    }
    else{
        return(
            <p>Error</p>
        )
    }
}

export default AnchorItems