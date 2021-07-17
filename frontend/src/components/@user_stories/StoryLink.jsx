
import { Link } from 'react-router-dom'

const StoryLink = ({id,storyTitle})=>{
    return(
        <Link to={`/background-story/${id}`}>
          {storyTitle}
        </Link>
    )
}

export default StoryLink