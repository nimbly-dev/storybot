
import { Link } from 'react-router-dom'

const EditButton = ({id,storyTitle})=>{
    return(
        <Link to={`/background-story/${id}`} className="btn btn-sm btn-primary my-1 my-sm-0">
            <span class="fas fa-edit mr-1"></span>
                Edit
        </Link>
    )
}

export default EditButton