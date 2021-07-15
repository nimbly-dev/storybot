const InputForViewStory = (
    {
        value,
        setter,
        labelText
    }
)=>{
    return(
        <div className="input-group input-group-lg mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{labelText}: </div>
            </div>
            <input 
            type="text" 
            className="form-control form-control-lg" 
            value={value}
            onChange={e=>setter(e.currentTarget.value)}
            />
        </div>
    )
}

export default InputForViewStory