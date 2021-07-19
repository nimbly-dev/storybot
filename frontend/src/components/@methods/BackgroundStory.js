import axios from "axios"
import { URL_BACKGROUND_STORY } from "../../utility/strings"


export const axiosDeleteUserBackgroundStory = (story_id)=>{
    const token = JSON.parse(localStorage.getItem('token'))

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token.access_token
        }
    }

    // console.log(`${URL_BACKGROUND_STORY.base_url_background_story}/${story_id}`)
    axios.delete(`${URL_BACKGROUND_STORY.base_url_background_story}/${story_id}`, config)
    .then((response)=>{
        console.log("DELETED THE STORY")
        window.location.reload(false); 
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

export const axiosSaveBackgroundStory = (
    title,
    body,
    character_name
)=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const config = {
        headers: {
            "Authorization": "Bearer " + token.access_token
        }
    }
    let formData = new FormData();
    console.log("USERID: " + token.user_id) 
    formData.append("title", title)
    formData.append("body", body)
    formData.append("character_name", character_name)
    formData.append("is_shared", false)

    axios.post(URL_BACKGROUND_STORY.base_url_background_story,{
        "user_id": token.user_id,
        "title": formData.get("title"),
        'body': formData.get("body"),
        "character_name": formData.get("character_name"),
        "is_shared": formData.get("is_shared")
    }, config)
    .then((response)=>{
        console.log("GENERATED STORY HAS BEEN SAVED")
        console.log(response.data)
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

export const axiosGetSharedBackgroundStories = (setter)=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const config = {
        headers: {
            "Authorization": "Bearer " + token.access_token
        }
    }
    axios.get(URL_BACKGROUND_STORY.base_url_shared_background_stories,config)
    .then((response)=>{
        console.log("NOW GETTING ALL SHARED BACKGROUND STORIES")
        setter(response.data)
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

export const axiosCopySharedStory = (story_id)=>{
    const token = JSON.parse(localStorage.getItem('token'))
    const config = {
        headers: {
            "Authorization": "Bearer " + token.access_token
        }
    }
    axios.post(`${URL_BACKGROUND_STORY.base_url_copy_shared_background_story}/${story_id}`,{} ,config)
    .then((response)=>{
        console.log("STORY IS COPIED")
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

export const axiosGetStories = (token,setUserStories)=>{
    const config = {
        headers: {
            "Authorization": "Bearer " + token.access_token
        }
    }
    
    axios.get(URL_BACKGROUND_STORY.base_url_background_story, config)
    .then((response)=>{
        console.log(response)
        setUserStories(response.data)
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

export const axiosGetStory = (
    token, 
    setStoryBody,
    setStoryTitle,
    setStoryCharacterName,
    setStoryIsShared,
    setStoryCreator,
    setStoryID,
    id
)=>{
    const config = {
        headers: {
            "Authorization": "Bearer " + token.access_token
        }
    }
    axios.get(`${URL_BACKGROUND_STORY.base_url_background_story}/${id}`,config)
    .then((response)=>{
        console.log("INSIDE GET")
        console.log(response.data)
        setStoryBody(response.data.body)
        setStoryTitle(response.data.title)
        setStoryCharacterName(response.data.character_name)
        setStoryIsShared(response.data.is_shared)
        setStoryCreator(response.data.creator)
        setStoryID(response.data.id)
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


export const axiosUpdateStory = (
    storyTitle,
    storyBody,
    storyCharacterName,
    storyIsShared,
    token,
    id
) =>{
        
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
    axios.put(`${URL_BACKGROUND_STORY.base_url_background_story}/${id}`,{
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