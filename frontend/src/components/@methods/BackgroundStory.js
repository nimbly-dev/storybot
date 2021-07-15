import axios from "axios"
import { URL_BACKGROUND_STORY } from "../../utility/strings"

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