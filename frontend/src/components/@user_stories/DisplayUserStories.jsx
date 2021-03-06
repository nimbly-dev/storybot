import {useEffect, useState} from 'react'


//Import 3rd party libraries

//Import backend Routers

//Import Child components
import StoryLink from './StoryLink';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { axiosGetStories } from '../@methods/BackgroundStory';


const DisplayUserStories = ({isFiltered, filterValue})=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const [userStories, setUserStories] = useState([])


    useEffect(()=>axiosGetStories(token,setUserStories),[])

    if(isFiltered === true){  //User usesfilter 
        const filtered = userStories.filter((story)=>{
            if (story.title.includes(filterValue))
                return true
            else return false
        })
        return(
            <table className="table table-hover table-striped">
            <thead className='thead-dark'>
                <th scope='col'>#</th>
                <th scope='col'>Story</th>
                <th scope='col'>Character Name</th>
                <th scope='col'>Actions</th>
            </thead>
            <tbody>
                {filtered.map((story,idx)=>{
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