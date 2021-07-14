import {GEN_ELF_ROUTERS} from "../../utility/strings"

import axios from 'axios'

export const axiosElfMaleFirstname = (setCharacterFirstName)=>{
    axios.get(`${GEN_ELF_ROUTERS.url_gen_male_firstname}`)
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

export const axiosElfFemaleFirstname = (setCharacterFirstName)=>{
    axios.get(`${GEN_ELF_ROUTERS.url_gen_female_firstname}`)
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

export const axiosElfLastname = (setCharacterLastname)=>{
    axios.get(`${GEN_ELF_ROUTERS.url_gen_lastname}`)
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

export const axiosElfAlternativeLastname = (setCharacterLastname)=>{
    axios.get(`${GEN_ELF_ROUTERS.url_gen_alternative_lastname}`)
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


export const axiosElfLocation = (setCharacterLocation)=>{
    axios.get(`${GEN_ELF_ROUTERS.url_gen_locations}`)
    .then((response)=>{
        setCharacterLocation(response.data)
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