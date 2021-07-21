
import { Link } from 'react-router-dom'

const ViewButton = ({id})=>{
    return(
        <Link to={`/background-story/${id}`} className="btn btn-sm btn-primary my-1 my-sm-0">
            <span class="fas fa-binoculars mr-1"></span>
                View
        </Link>
    )
}
export default ViewButton