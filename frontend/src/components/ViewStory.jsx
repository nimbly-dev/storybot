import axios from 'axios'
import {useEffect, useState} from 'react'

// Child Components
import Navigation from './@navigation/Navigation'
import { Button, Col, Form, InputGroup, Row, ToggleButton,ToggleButtonGroup } from 'react-bootstrap';
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

    const axiosUpdateStory = () =>{
        
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

    useEffect(axiosGetStory,[])

    const handleIsSharedChange = (selectedValue) =>{
        setStoryIsShared(selectedValue)
    }
    
    return(
        <main>
            <Navigation currentPage={''}/>
            <section className='container d-flex justify-content-center'>
                <Row>
                   
                    <Form onSubmit={(e)=>axiosUpdateStory(e)}>
                        <Col xs='12'>
                            <InputGroup size='lg' className="mb-2 mr-sm-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Title: 
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    defaultValue={storyTitle}
                                    onChange={e=>setStoryTitle(e.currentTarget.value)}
                                />
                            </InputGroup>
                        
                            <InputGroup size='lg' className="mb-2 mr-sm-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Character Name: 
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    defaultValue={storyCharacterName}
                                    onChange={e=>setStoryCharacterName(e.currentTarget.value)}
                                />
                            </InputGroup>

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
            
                            <Form.Group>
                                <Button 
                                    type="button" 
                                    onClick={handleCancelButton} 
                                    className="mr-3"
                                    variant='danger'
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" 
                                        className="ml-3"
                                        variant='primary'
                                >
                                    Submit
                                </Button>
                            </Form.Group >
                        </Col>
                    </Form>
                    
                </Row>
            </section>
        </main>
    )
}

export default ViewStory