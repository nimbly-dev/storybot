import axios from 'axios'
import {useEffect, useState} from 'react'


import Navigation from './@navigation/Navigation'
import InputForViewStory from './@forms/InputForViewStory';


import { ToggleButton,ToggleButtonGroup } from 'react-bootstrap';
import { URL_ROUTERS } from '../utility/strings'
import { useParams,useHistory,useLocation } from 'react-router-dom'
import TextAreaForViewStory from './@forms/TextAreaForViewStory';

const ViewStory = ()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const { id } = useParams()

    const location = useLocation();
    const history = useHistory();

    const [storyBody, setStoryBody] = useState('')
    const [storyTitle, setStoryTitle] = useState('')
    const [storyCharacterName, setStoryCharacterName] = useState('')
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
            console.log("GET_IS_SHARED: " + response.data.is_shared)
            setStoryBody(response.data.body)
            setStoryTitle(response.data.title)
            setStoryCharacterName(response.data.character_name)
            setStoryIsShared(response.data.is_shared)
            // if(response.data.is_shared === true)
            //     setStoryIsShared(true)
            // else
            //     setStoryIsShared(false)


            // console.log('isShare: '+ sharedValue)
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
        formData.append("character_name", storyCharacterName)
        formData.append("is_shared", storyIsShared)
        console.log("isShared: " +storyIsShared)
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

    useEffect(axiosGetStory)
    // console.log(storyIsShared)

    const handleIsSharedChange = (selectedValue) =>{
        setStoryIsShared(selectedValue)
    }
    
    return(
        <main>
            <Navigation currentPage={''}/>
            <section className='container d-flex justify-content-center'>
                <div className='row'>
                   
                    <form onSubmit={(e)=>axiosUpdateStory(e)}>
                        <div className="col-xs-12">
                            <InputForViewStory 
                                value={storyTitle}
                                setter={setStoryTitle}
                                labelText={"Title"}
                            />
                        </div>
                    
                        <InputForViewStory
                            value={storyCharacterName}
                            setter={setStoryTitle}
                            labelText={"Character Name"}
                        />
                        
                        <TextAreaForViewStory
                            value={storyBody}
                            setter={setStoryBody}
                            labelText={"Click the textarea to edit your story"}
                        />

                        <ToggleButtonGroup  
                            className="btn-group btn-group-toggle mb-5"
                            type="radio" 
                            name="options"
                            // value={storyIsShared}
                            value={storyIsShared}
                            onChange={handleIsSharedChange}
                        >
                            <ToggleButton 
                                variant="outline-primary"
                                id="tbg-radio-1" 
                                value={true}
                                name='shared'
                                type='radio'
                            >
                                Shared
                            </ToggleButton>
                            <ToggleButton 
                                variant="outline-primary"
                                id="tbg-radio-2"
                                type='radio' 
                                name='not_shared'
                                value={false}
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
            </section>
        </main>
    )
}

export default ViewStory