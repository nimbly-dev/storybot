//Import react libraries
import React from 'react'

//Importing Child Components
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import ViewStory from './components/ViewStory'
import AddStory from './components/AddStory'
import PageNotFound from './components/PageNotFound'
import PrivateRoute from './components/@authentication/PrivateRoute'

//Import react routing
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import SharedStories from './components/SharedStories'

// const ROBOT_ICON_URL = 'https://i.pinimg.com/originals/a7/98/42/a79842bfa9a2d36047d3478a944b8506.gif'

const App = () =>{

    return(
        <Router className='container'>
            <Switch>
                {/* redirect '/' as '/login' */}
                <Redirect exact from="/" to="/login" />
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register" >
                    <Register />
                </Route>
                
                {/* PRIVATE ROUTES THAT NEED THE USER TO BE LOGGED IN */}
                <PrivateRoute exact component={UserProfile} path={'/userprofile'} />
                <PrivateRoute exact component={AddStory} path={'/addstory'}/>
                <PrivateRoute exact component={SharedStories} path={'/shared'}/>
                <PrivateRoute component={ViewStory} path={'/background-story/:id'}/>
                
                {/* IF PAGE NOT FOUND */}
                <Route path="/404" component={PageNotFound} />
                <Redirect to="/404" />
            </Switch>
        </Router>
    )
}

export default App;
