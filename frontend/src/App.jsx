//Import react libraries
import React, {useState} from 'react'

//Importing Child Components
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import ViewStory from './components/ViewStory'
import PrivateRoute from './components/@authentication/PrivateRoute'

//Import react routing
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'


// const ROBOT_ICON_URL = 'https://i.pinimg.com/originals/a7/98/42/a79842bfa9a2d36047d3478a944b8506.gif'

const App = () =>{

    const history = useHistory();
    const [loginData, setLoginData] = useState([])


    const handleLoginData = (response)=>{
        setLoginData(response)
    }

    return(
        <Router className='container'>
            <Switch>
                <Route path="/login">
                    <Login  handleLoginData={handleLoginData}/>
                </Route>
                <Route path="/register" >
                    <Register />
                </Route>
                <PrivateRoute exact component={UserProfile} path={'/userprofile'} />
                <PrivateRoute component={ViewStory} path={'/background-story/:id'}/>
            </Switch>
        </Router>
    )
}

export default App;
