import { axiosDeleteUserBackgroundStory } from "../@methods/BackgroundStory"

const DeleteButton = ({id})=>{
    return(
        <button
            onClick={()=>axiosDeleteUserBackgroundStory(id)} 
            type="button" 
            className="btn btn-sm btn-danger my-1 my-sm-0">
            <span class="fas fa-edit mr-1"></span>
                Delete
        </button>
    )
}

export default DeleteButton