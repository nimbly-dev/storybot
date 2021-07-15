import axios from "axios"
import { GEN_STORY_TITLE_ROUTER } from "../../utility/strings"



export const axiosTitleGen = (setter)=>{
    axios.get(GEN_STORY_TITLE_ROUTER.url_gen_title)
    .then((response)=>{
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