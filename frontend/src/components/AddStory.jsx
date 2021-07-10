
import { URL_ROUTERS } from "../utility/strings"
import Navigation from "./@navigation/Navigation"

//Import third party libraries

const AddStory = ()=>{

    
    return(
        <main>
            <Navigation currentPage={'Add Story'}/>
            <section className='container'>
                <div className='row container d-flex justify-content-center'>
                    <div className='col-md-auto'>
                        <h4>Add a background story</h4>
                    </div>
                </div>
                <div className='row container d-flex justify-content-between'>
                       
                        <div className='col-md-6 column'>
                            <h4>COL 1</h4>  
                            
                            {/*FOR CHARACTER FIRSTNAME*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Enter character first name"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">Random!</button>
                                </div>
                            </div>

                            {/*FOR CHARACTER CLASS*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Enter character class"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">Random!</button>
                                </div>
                            </div>

                            {/*FOR CHARACTER ENEMY FACTION*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Enter character enemy faction"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">Random!</button>
                                </div>
                            </div>
                        </div>
                            
                        
                        
                        <div className='col-md-6 column'>
                            <h4>COL 2</h4>

                            {/*FOR CHARACTER LAST NAME*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Enter character last name"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">Random!</button>
                                </div>
                            </div>

                            {/*FOR CHARACTER RACE*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Enter character race"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">Random!</button>
                                </div>
                            </div>

                            {/*FOR CHARACTER ENEMY NAME*/}
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Enter character enemy name"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">Random!</button>
                                </div>
                            </div>
                        </div>
                </div>

                <div className='row  d-flex justify-content-center'>
                    <div className='col-md-auto '>
                        <button  class="btn btn-outline-primary">Generate Story</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AddStory