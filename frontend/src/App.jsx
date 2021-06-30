//Import react libraries
import React, {useState} from 'react'

//Importing Child Components
import LoginAndRegister from './components/LoginAndRegister'

const ROBOT_ICON_URL = 'https://i.pinimg.com/originals/a7/98/42/a79842bfa9a2d36047d3478a944b8506.gif'

const App = () =>{

    return(
        <main className='container'>
            <LoginAndRegister/>
            <img src={ROBOT_ICON_URL} alt="loading..." className='robot-icon'/>

        </main>
    )
}

export default App;
