

const InputForAddStory = (
    {
        placeholder,
        value,
        setter,
        randomGen
    }
)=>{
    return(
        <div class="input-group mb-3">
            <input 
                type="text" 
                value={value}
                onChange={e=>setter(e.currentTarget.value)}
                className="form-control" 
                placeholder={placeholder}/>
            <div className="input-group-append">
                <button 
                onClick={()=>randomGen(setter)}
                className="btn btn-primary" 
                type="button">Random!</button>
            </div>
        </div> 
    )
}

export default InputForAddStory