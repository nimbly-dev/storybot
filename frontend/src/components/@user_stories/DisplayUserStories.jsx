import {useEffect, useState} from 'react'


//Import 3rd party libraries
import axios from 'axios';
import { Link } from 'react-router-dom';

//Import backend Routers
import { URL_ROUTERS } from '../../utility/strings';

//Import Child components
import StoryLink from './StoryLink';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';


const DisplayUserStories = ({isFiltered, filterValue})=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const [userStories, setUserStories] = useState([])

    const axiosGetStories = ()=>{
        const config = {
            headers: {
                "Authorization": "Bearer " + token.access_token
            }
        }
        
        axios.get(URL_ROUTERS.base_url_get_user_background_story, config)
        .then((response)=>{
            console.log(response)
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

    console.log(userStories[1])

    useEffect(axiosGetStories,[token.access_token])

    if(isFiltered === true){  //User usesfilter 
        const filtered = userStories.filter((story)=>{
            if (story.title.includes(filterValue))
                return true
            else return false
        })
        return(
            <table className="table">
            <thead>
                <th scope='col'>#</th>
                <th scope='col'>Story</th>
                <th scope='col'>Actions</th>
            </thead>
            <tbody>
                {filtered.map((story,idx)=>{
                    return (
                        <tr>
                            <th scope="row">{idx}</th>
                            <td>
                                <StoryLink id={story.id} storyTitle={story.title}/>
                            </td>
                            <EditButton id={story.id} storyTitle={story.title}/>
                            <a href="#delete" class="btn btn-sm btn-danger my-1 my-sm-0">
                            <span class="fas fa-trash mr-1"></span>
                            Delete</a>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        )
    }else{ //User did not use filter
        return(                           
            <table className="table table-hover table-striped">
                <thead className="thead-dark">
                    <th scope='col'>#</th>
                    <th scope='col'>Story</th>
                    <th scope='col'>Character Name</th>
                    <th scope='col'>Actions</th>
                </thead>
                <tbody>
                    {userStories.map((story,idx)=>{
                        return (
                            <tr>
                                <th scope="row">{idx+1}</th>
                                <td>
                                    <StoryLink id={story.id} storyTitle={story.title}/>
                                </td>
                                <td>
                                    {story.character_name}
                                </td>
                                <EditButton id={story.id} storyTitle={story.title}/>
                                <DeleteButton id={story.id} storyTitle={story.title}/>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default DisplayUserStories