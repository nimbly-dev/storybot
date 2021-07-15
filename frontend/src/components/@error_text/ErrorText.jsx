const ErrorText = ({
    errorText,
    hasErrors
})=>{
    if (hasErrors === true){
        return(
            <p id="errorHelp" className="form-text text-muted mt-2">{errorText}</p>
        )
    }else{
        return null
    }
}

export default ErrorText
