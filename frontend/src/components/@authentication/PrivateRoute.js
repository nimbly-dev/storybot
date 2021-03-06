import {Redirect, Route, useLocation} from 'react-router-dom'


const PrivateRoute = ({
    component: Component,
    path, 
})=> {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    return isAuthenticated? (
        <Route 
            path={path}
            render={
                 ()=><Component/>
            }
        />
    )   
    : (
        <Redirect to={{
            pathname: "/login",
            state: {from:location}
        }}/>
    )
}

export default PrivateRoute