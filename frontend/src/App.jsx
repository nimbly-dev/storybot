//Import react libraries
import React, {useState} from 'react'

//Importing Child Components
import LoginAndRegister from './components/LoginAndRegister'
import UserProfile from './components/UserProfile'

const ROBOT_ICON_URL = 'https://i.pinimg.com/originals/a7/98/42/a79842bfa9a2d36047d3478a944b8506.gif'

const App = () =>{

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLoginAndLogout = ()=>{
        if (isLoggedIn === false){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
    }

    //<img src={ROBOT_ICON_URL} alt="loading..." className='robot-icon'/>
    if (isLoggedIn === false){
        return(
            <main className='container'>
                <LoginAndRegister handleLoginAndLogout={handleLoginAndLogout}/>
            </main>
        )
    }else{
        return(
            <main className='container'>
                <UserProfile handleLoginAndLogout={handleLoginAndLogout}/>
            </main>
        ) 
    }

}

export default App;
