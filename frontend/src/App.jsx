//Import react libraries
import React, {useState} from 'react'



//Importing Child Components
// import LoginAndRegister from './components/LoginAndRegister'
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'


//Import react routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// const ROBOT_ICON_URL = 'https://i.pinimg.com/originals/a7/98/42/a79842bfa9a2d36047d3478a944b8506.gif'

const App = () =>{


    const [loginData, setLoginData] = useState([])

  
    const handleLoginData = (response)=>{
        console.log("Setting")
        setLoginData(response)
    }

    return(
        <Router className='container'>
            <Switch>
                <Route path="/login">
                    <Login  handleLoginData={handleLoginData}/>
                </Route>
                <Route path="/register" component={Register} />
                
                <Route path="/userprofile/:username">
                    <UserProfile loginData={loginData}/>
                </Route>
            </Switch>
        </Router>
    )


}

export default App;
