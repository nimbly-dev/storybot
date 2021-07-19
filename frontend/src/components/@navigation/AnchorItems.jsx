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

    const handleAddStoryRedirect = ()=>{
        const { from } = location.state || { from: { pathname: "/addstory" } };
        history.replace(from)
    }

    const handleSharedRedirect = ()=>{
        const { from } = location.state || { from: { pathname: "/shared" } };
        history.replace(from)
      }

    if(currentPage === 'Userprofile') {
        return(
            <ul className="navbar-nav justify-content-between ml-auto">
                <li className="nav-item">
                    <a onClick={handleSharedRedirect} className="nav-link text-light text-muted"  href="# ">
                        Browse
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active text-light" href="# ">User Profile</a>
                </li>
                <li className="nav-item">
                    <a onClick={handleAddStoryRedirect} className="nav-link text-light text-muted" href="# ">Add Story</a>
                </li>
                <li class="nav-item">
                    <a onClick={handleLogout} className="nav-link text-light text-muted" href="# ">Logout</a>
                </li>
            </ul>
        )
    } 
    else if(currentPage === 'Browse'){
        return(
            <ul className="navbar-nav justify-content-between ml-auto">
                <li className="nav-item">
                    <a className="nav-link text-light active" href="# ">
                        Browse
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={handleUserprofileRedirect} className="nav-link text-light text-muted" href="# ">User Profile</a>
                </li>
                <li className="nav-item">
                    <a onClick={handleAddStoryRedirect} className="nav-link text-light text-muted" href="# ">Add Story</a>
                </li>
                <li class="nav-item">
                    <a onClick={handleLogout} className="nav-link text-light text-muted" href="# ">Logout</a>
                </li>
            </ul>
        )
    }
    else if(currentPage === 'Add Story'){
        return(
        <ul className="navbar-nav justify-content-between ml-auto">
            <li className="nav-item">
                <a onClick={handleSharedRedirect} className="nav-link text-light text-muted" href="# ">
                    Browse
                </a>
            </li>
            <li className="nav-item">
                <a onClick={handleUserprofileRedirect} className="nav-link text-light text-muted" href="#userprofile">User Profile</a>
            </li>
            <li className="nav-item">
                <a onClick={handleAddStoryRedirect} className="nav-link active text-light" href="#addstory">Add Story</a>
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
                    <a onClick={handleSharedRedirect} className="nav-link text-light text-muted" href=" ">
                        Browse
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={handleUserprofileRedirect} className="nav-link text-light text-muted" href="#userprofile">User Profile</a>
                </li>
                <li className="nav-item">
                    <a onClick={handleAddStoryRedirect} className="nav-link text-light text-muted" href="#addstory">Add Story</a>
                </li>
                <li class="nav-item">
                    <a onClick={handleLogout} className="nav-link text-light text-muted" href="#logout">Logout</a>
                </li>
            </ul>
        )
    }
}

export default AnchorItems