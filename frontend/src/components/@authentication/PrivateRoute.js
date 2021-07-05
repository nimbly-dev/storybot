import {Redirect, Route, useLocation} from 'react-router-dom'


const PrivateRoute = ({
    component: Component,
    path, 
    token
})=> {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    console.log("Inside private route")
    console.log(isAuthenticated)
    return isAuthenticated? (
        <Route 
            path={path}
            render={
                 ()=><Component token={token}/>
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