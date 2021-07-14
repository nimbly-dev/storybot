import { GEN_FACTION_ROUTER } from "../../utility/strings";

import axios from "axios";

export const axiosGenFaction = (setFaction)=>{
    axios.get(GEN_FACTION_ROUTER.url_gen_faction)
    .then((response)=>{
        setFaction(response.data)
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