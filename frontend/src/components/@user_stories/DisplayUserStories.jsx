import {useEffect, useState} from 'react'


//Import 3rd party libraries
import axios from 'axios';


//Import backend Routers
import { URL_ROUTERS } from '../../utility/strings';

//Import Child components
import StoryLink from './StoryLink';


const DisplayUserStories = ({isFiltered, filterValue})=>{
    const token = JSON.parse(localStorage.getItem('token'))

    const [userStories, setUserStories] = useState([])

    const axiosGetStories = ()=>{
        const config = {
            headers: {
                "Authorization": "Bearer " + token.access_token
            }
        }
        
        axios.get(URL_ROUTERS.base_url_get_background_story, config)
        .then((response)=>{
            console.log(response.data)
            setUserStories(response.data)
        })
        .catch((error)=>{
            if (error.response) {
                console.log("HAS ERROR")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    useEffect(axiosGetStories,[])

    if(isFiltered === true){  //User usesfilter 
        const filtered = userStories.filter((story)=>{
            if (story.title.includes(filterValue))
                return true
            else return false
        })
        return(
           <div>
               <ul>
               {filtered.map(story=>{
                   return <StoryLink storyTitle={story.title}/>
               })}
               </ul>
           </div>
        )
    }else{ //User did not use filter
        return(
            <div className='mt-3'>
                <ul>
                {userStories.map(story=>{
                    return <StoryLink storyTitle={story.title}/>
                })}
                </ul>
            </div>
        )
    }
}

export default DisplayUserStories