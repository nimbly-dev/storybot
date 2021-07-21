import { useEffect, useState } from "react";
import { axiosGetSharedBackgroundStories } from "../@methods/BackgroundStory";

import StoryLink from "./StoryLink";
import ViewButton from "./ViewButton";
import { Button } from "react-bootstrap";

const DisplaySharedUserStories = ({isFiltered, filterValue})=>{
    const [sharedStories, setSharedStories] = useState([])

    useEffect(()=>axiosGetSharedBackgroundStories(setSharedStories),[])

    if(isFiltered === true){  //User usesfilter 
        const filtered = sharedStories.filter((story)=>{
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
                <th scope='col'>Creator</th>
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
                            <td>
                                {story.creator.username}
                            </td>
                            <ViewButton id={story.id} storyTitle={story.title}/>
                            <Button
                                variant='danger'
                                size='sm'
                            >
                               <span class="fas fa-heart mr-1"></span>
                                20 Likes
                            </Button>
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
                    <th scope='col'>Creator</th>
                    <th scope='col'>Actions</th>
                </thead>
                <tbody>
                    {sharedStories.map((story,idx)=>{
                        return (
                            <tr>
                                <th scope="row">{idx+1}</th>
                                <td>
                                    <StoryLink id={story.id} storyTitle={story.title}/>
                                </td>
                                <td>
                                    {story.character_name}
                                </td>
                                <td>
                                    {story.creator.username}
                                </td>
                                <ViewButton id={story.id} storyTitle={story.title}/>
                                <Button
                                variant='danger'
                                size='sm'
                                >
                                <span class="fas fa-heart mr-1"></span>
                                    20 Likes
                                </Button>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default DisplaySharedUserStories