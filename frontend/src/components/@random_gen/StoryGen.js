import { GEN_BACKGROUND_STORY } from "../../utility/strings";

import axios from "axios";

export const axiosGenerateBackgroundStory = (setGeneratedCharStory, race, proffesion, antagonist_name, antagonist_faction)=>{
    const input_data = {
        body:{
            race: race,
            proffesion: proffesion,
            antagonist_name: antagonist_name,
            antagonist_faction: antagonist_faction
        }
    }

    let formData = new FormData();

    formData.append("race", race)
    formData.append("proffesion", proffesion)
    formData.append("antagonist_name",  antagonist_name)
    formData.append("antagonist_faction",  antagonist_faction)
    
    axios.post(GEN_BACKGROUND_STORY.url_gen_background_story, {
        race: formData.get("race"),
        profession: formData.get("proffesion"),
        antagonist_name: formData.get("antagonist_name"),
        antagonist_faction: formData.get("antagonist_faction")
    })
    .then((response)=>{
        console.log(response)
        setGeneratedCharStory(response.data)
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