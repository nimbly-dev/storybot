import react from 'react'

const ErrorText = ({
    errorText,
    hasErrors
})=>{
    if (hasErrors === true){
        return(<text id="errorHelp" className="form-text text-muted mt-4">{errorText}</text>)
    }else{
        return null
    }
}

export default ErrorText
