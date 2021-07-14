import {GEN_ORC_ROUTERS} from "../../utility/strings"

import axios from 'axios'

export const axiosMaleOrcName =  (setCharacterFirstName)=> {
    
    axios.get(`${GEN_ORC_ROUTERS.url_gen_male_name}`)
    .then((response)=>{
        setCharacterFirstName(response.data)
        return response.data
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

export const axiosFemaleOrcName = (setCharacterFirstName)=>{
    axios.get(`${GEN_ORC_ROUTERS.url_gen_female_name}`)
    .then((response)=>{
        setCharacterFirstName(response.data)
        return response.data
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


export const axiosOrcLocation = (setCharacterLocation)=>{
    axios.get(`${GEN_ORC_ROUTERS.url_gen_locations}`)
    .then((response)=>{
        setCharacterLocation(response.data)
        return response.data
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