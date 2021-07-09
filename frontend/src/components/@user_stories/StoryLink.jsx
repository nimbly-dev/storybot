import react from 'react'

import { Link } from 'react-router-dom'

const StoryLink = ({id,storyTitle})=>{
    return(
        <Link to={`/background-story/${id}`}>
            <li className='mt-2'>{storyTitle}</li>
        </Link>
    )
}

export default StoryLink