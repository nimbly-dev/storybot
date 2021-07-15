const TextAreaForViewStory = (
    {
        value,
        setter,
        labelText
    }
)=>{
    return(
        <div className="form-group form-group-lg">
            <label for="textAreaBody">{labelText}: </label>
            <textarea 
            className="form-control" 
            value={value}
            onChange={e=>setter(e.currentTarget.value)}
            rows="5"
            />
        </div>
    )
}

export default TextAreaForViewStory