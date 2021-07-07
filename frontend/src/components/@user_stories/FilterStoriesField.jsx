import react from "react"

const FilterStoriesField = ({handleOnChangeFilterValue,currentFilterValue})=>{
    return(
        <form className="form-inline mt-4">
            <label className="sr-only" for="inlineFormInputGroup">Search Story</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0 pl-4">
                <input 
                type="text" 
                className="form-control" 
                id="inlineFormInputGroup" 
                value={currentFilterValue}
                onChange={handleOnChangeFilterValue}
                placeholder="Filter your stories"
                />
            </div>
            <button type="submit" className="btn btn-primary">Go</button>
        </form>
    )
}

export default FilterStoriesField