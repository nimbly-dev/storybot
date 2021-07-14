import axios from 'axios'
import {useEffect, useState} from 'react'

//Import child libraries
import Navigation from './@navigation/Navigation'

//Import third party libraroes
import { ToggleButton,ToggleButtonGroup  } from 'react-bootstrap';
import { URL_ROUTERS } from '../utility/strings'
import { useParams,useHistory,useLocation } from 'react-router-dom'

const ViewStory = ()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const { id } = useParams()

    const location = useLocation();
    const history = useHistory();


    const [storyBody, setStoryBody] = useState('')
    const [storyTitle, setStoryTitle] = useState('')
    const [storyCharacter, setStoryCharacter] = useState('')
    const [storyIsShared, setStoryIsShared] = useState(false)

    const axiosGetStory = ()=>{
        const config = {
            headers: {
                "Authorization": "Bearer " + token.access_token
            }
        }
        axios.get(`${URL_ROUTERS.base_url_get_user_background_story}/${id}`,config)
        .then((response)=>{
            console.log("INSIDE GET")
            setStoryBody(response.data.body)
            setStoryTitle(response.data.title)
            setStoryCharacter(response.data.character_name)
            setStoryIsShared(response.data.is_shared)
            console.log('isShare: '+ storyIsShared)
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

    const axiosUpdateStory = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        
        formData.append("title", storyTitle)
        formData.append("body", storyBody)
        formData.append("character_name", storyCharacter)
        formData.append("is_shared", storyIsShared)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token.access_token
            }
        }
        axios.put(`${URL_ROUTERS.base_url_get_user_background_story}/${id}`,{
            title: formData.get('title'),
            body: formData.get('body'),
            character_name: formData.get('character_name'),
            is_shared: formData.get('is_shared')
        } ,config)
        .then((response)=>{
            console.log("Updated")
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

    const handleCancelButton = ()=>{
        const { from } = location.state || { from: { pathname: "/userprofile" } };
        history.replace(from)
    }


    useEffect(axiosGetStory,[token.access_token, id, storyIsShared])
    

    return(
        <main>
            <Navigation currentPage={''}/>
            <section className='container d-flex justify-content-center'>
                <div className='row'>
                    <div className='col-xs-12'>
                        <form onSubmit={(e)=>axiosUpdateStory(e)}>
                        <div className="input-group mb-2 mr-sm-2">
                            <div className="input-group-prepend">
                            <div className="input-group-text">Title: </div>
                            </div>
                            <input 
                            type="text" 
                            className="form-control" 
                            value={storyTitle}
                            onChange={e=>setStoryTitle(e.currentTarget.value)}
                            />
                        </div>
                        
                        <div className="input-group mb-2 mr-sm-2">
                            <div className="input-group-prepend">
                            <div className="input-group-text">Character Name: </div>
                            </div>
                            <input 
                            type="text" 
                            className="form-control"
                            value={storyCharacter}
                            onChange={e=>setStoryCharacter(e.currentTarget.value)}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label for="textAreaBody">Click the textarea to edit your story: </label>
                            <textarea 
                            className="form-control" 
                            value={storyBody}
                            onChange={e=>setStoryBody(e.currentTarget.value)}
                            rows="5"
                            />
                        </div>
                        <ToggleButtonGroup 
                            type="radio" 
                            name="options" 
                            defaultValue={storyIsShared}
                            defaultChecked={storyIsShared}
                        >
                            <ToggleButton 
                                variant="outline-primary"
                                id="tbg-radio-1" 
                                value={true}
                                checked
                                onChange={(e) => setStoryIsShared(e.currentTarget.value)}
                            >
                            Shared
                            </ToggleButton>
                            <ToggleButton 
                                variant="outline-primary"
                                id="tbg-radio-2" 
                                value={false}
                                onChange={(e) => setStoryIsShared(e.currentTarget.value)}
                            >
                            Not Shared
                            </ToggleButton>
                        </ToggleButtonGroup>

                    
            
                        <div className="form-group">
                            <button 
                                type="button" 
                                onClick={handleCancelButton} 
                                className="btn btn-outline-primary mr-3">
                                Cancel
                            </button>
                            <button type="submit" 
                                    className="btn btn-outline-primary ml-3"
                                >Submit
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ViewStory