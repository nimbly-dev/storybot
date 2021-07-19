import axios from "axios";
import { URL_USER } from "../../utility/strings";


export const axiosLoginUser = (
    username,password,setHasError,location,history
)=>{
    let formdata = new FormData()

    formdata.append("username", username)
    formdata.append("password", password)
    
    axios.post(URL_USER.base_url_login,formdata)
    .then((response)=>{ 
        console.log('Logged in')
        if (response.statusText === 404){
            setHasError(true)
            throw new Error("User credentials not found")
        }
        if (response.statusText === 422){
            setHasError(true)
            throw new Error("Unproccesable entity")
        }
        const result = response.data

        localStorage.setItem('isAuthenticated',true)
        localStorage.setItem('token', JSON.stringify(result))
        const { from } = location.state || { from: { pathname: "/userprofile" } };
        history.replace(from)
        console.log(result)
    })
    .catch((error)=>{
        if (error.response) {
            console.log("HAS ERROR")
            setHasError(true)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    })
    
}

export const axiosRegisterUser = (formData,location,history)=>{

    axios.post(URL_USER.base_url_user,{
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    })
    .then((response)=>{
        console.log('Creating New Account')
        const result = response.data
        console.log(result)
        const { from } = location.state || { from: { pathname: "/login" } };
        history.replace(from)
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