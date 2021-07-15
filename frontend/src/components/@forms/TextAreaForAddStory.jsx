const TextAreaForAddStory = ({
    value,
    setter
})=>{
    return(
        <div className="form-group">
            <label for="textAreaBody">Click the textarea to edit your generated story: </label>
            <textarea 
            placeholder="Generated Story Text are generated here"
            className="form-control" 
            value={value}
            onChange={e=>setter(e.currentTarget.value)}
            rows="5"
            />
        </div>
    )
}

export default TextAreaForAddStory