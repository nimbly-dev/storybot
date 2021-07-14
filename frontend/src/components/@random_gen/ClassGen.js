import {GEN_CLASS_ROUTER} from "../../utility/strings"

import axios from "axios"

export const axiosGenerateClass = (setCharacterClass)=>{
    axios.get(GEN_CLASS_ROUTER.url_gen_class)
    .then((response)=>{
        setCharacterClass(response.data)
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