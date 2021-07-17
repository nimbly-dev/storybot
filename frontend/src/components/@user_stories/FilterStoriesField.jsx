const FilterStoriesField = ({handleOnChangeFilterValue,currentFilterValue})=>{
    return(
        <form className="form-inline mb-3 mt-3">
            <label className="sr-only" for="inlineFormInputGroup">Search Story</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0 pl-4">
                <div className="input-group-prepend">
                    <div className="input-group-text">Filter: </div>
                </div>
                <input 
                type="text" 
                className="form-control" 
                id="inlineFormInputGroup" 
                value={currentFilterValue}
                onChange={handleOnChangeFilterValue}
                placeholder="Enter value"
                />
            </div>
            {/* <button type="submit" className="btn btn-primary">Go</button> */}
        </form>
    )
}

export default FilterStoriesField