

const InputNameForAddStory = ({
        placeholder,
        value,
        setter,
        randomGen
})=>{
    return(
        <div class="input-group mb-3">
            <input 
                type="text" 
                className="form-control"
                name="characterFirstName"
                value={value}
                onChange={e=>setter(e.currentTarget.value)}
                placeholder={placeholder}
            />
            <div className="input-group-append">
                <button 
                className="btn btn-primary" 
                onClick={randomGen(setter)}
                type="button">Random!</button>
            </div>
        </div>
    )
}

export default InputNameForAddStory