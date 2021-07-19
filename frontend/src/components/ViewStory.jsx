import axios from 'axios'
import {useEffect, useState} from 'react'

// Child Components
import Navigation from './@navigation/Navigation'
import { Button, Col, Form, InputGroup, Row, ToggleButton,ToggleButtonGroup } from 'react-bootstrap';
import { URL_BACKGROUND_STORY, URL_ROUTERS } from '../utility/strings'
import { useParams,useHistory,useLocation } from 'react-router-dom'
import TextAreaForViewStory from './@forms/TextAreaForViewStory';
import { axiosCopySharedStory, axiosGetStory, axiosUpdateStory } from './@methods/BackgroundStory';

const ViewStory = ()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const { id } = useParams()

    const location = useLocation();
    const history = useHistory();

    const [storyId, setStoryID] = useState('')
    const [storyBody, setStoryBody] = useState('')
    const [storyTitle, setStoryTitle] = useState('')
    const [storyCharacterName, setStoryCharacterName] = useState('')
    const [storyIsShared, setStoryIsShared] = useState(false)
    const [storyCreator, setStoryCreator] = useState('')

    const handleCancelButton = ()=>{
        const { from } = location.state || { from: { pathname: "/userprofile" } };
        history.replace(from)
    }

    const handleCopyButton = ()=>{
       axiosCopySharedStory(storyId)
       alert('Story has been copied, please check your story list at your userprofile')
    }

    useEffect(()=>axiosGetStory(
            token,
            setStoryBody,
            setStoryTitle,
            setStoryCharacterName,
            setStoryIsShared,
            setStoryCreator,
            setStoryID,
            id)
    ,[])

    const handleIsSharedChange = (selectedValue) =>{
        setStoryIsShared(selectedValue)
    }
    
    //If the current user has access to the selected story
    if(token.user_id === storyCreator.id){
        return(
            <main>
                <Navigation currentPage={''}/>
                <section className='container d-flex justify-content-center'>
                    <Row>
                       
                        <Form onSubmit={()=>
                            axiosUpdateStory(
                                storyTitle,
                                storyBody,
                                storyCharacterName,
                                storyIsShared,
                                token,
                                id
                            )}>
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
    //Else renders a view-only story
    else{
        return(
            <main>
                <Navigation currentPage={''}/>
                <section className='container d-flex justify-content-center'>
                    <Row>
                    
                        <Form onSubmit={(e)=>
                                axiosUpdateStory(
                                    storyTitle,
                                    storyBody,
                                    storyCharacterName,
                                    storyIsShared,
                                    token,
                                    id
                                )}>
                            <Col xs='12'>
                                <InputGroup size='lg' className="mb-2 mr-sm-2">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Creator: 
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control  
                                        disabled 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        value={storyCreator.username}
                                    />
                                </InputGroup>

                                <InputGroup size='lg' className="mb-2 mr-sm-2">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Title: 
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control  
                                        disabled 
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
                                        disabled
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        defaultValue={storyCharacterName}
                                        onChange={e=>setStoryCharacterName(e.currentTarget.value)}
                                    />
                                </InputGroup>

                                
                                <div className="form-group form-group-lg">
                                    <label for="textAreaBody">Story: </label>
                                    <textarea 
                                    disabled
                                    className="form-control" 
                                    value={storyBody}
                                    onChange={e=>setStoryBody(e.currentTarget.value)}
                                    rows="5"
                                    />
                                </div>

                                <Form.Group>
                                    <Button 
                                        type="button" 
                                        className="mr-3"
                                        variant='danger'
                                        onClick={handleCancelButton} 
                                    >
                                        Go back
                                    </Button>
                                    <Button type="button" 
                                            className="ml-3"
                                            variant='primary'
                                            onClick={handleCopyButton} 
                                    >
                                        Copy Story
                                    </Button>
                                </Form.Group >
                            </Col>
                        </Form>
                        
                    </Row>
                </section>
            </main>
        )
    }
}

export default ViewStory