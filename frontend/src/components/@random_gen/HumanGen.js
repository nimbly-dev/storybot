import {GEN_HUMAN_ROUTERS} from "../../utility/strings"

import axios from 'axios'

export const axiosMaleHumanFirstname =  (setCharacterFirstName)=> {
    
    axios.get(`${GEN_HUMAN_ROUTERS.url_gen_male_firstname}`)
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

export const axiosFemaleHumanfirstname = (setCharacterFirstName)=>{
    axios.get(`${GEN_HUMAN_ROUTERS.url_gen_female_firstname}`)
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

export const axiosHumanLastname = (setCharacterLastname)=>{
    axios.get(`${GEN_HUMAN_ROUTERS.url_gen_lastname}`)
    .then((response)=>{
        setCharacterLastname(response.data)
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

export const axiosHumanLocation = (setCharacterLocation)=>{
    axios.get(`${GEN_HUMAN_ROUTERS.url_gen_locations}`)
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