import { useState } from 'react'

import Navigation from './@navigation/Navigation'
import DisplayUserStories from "./@user_stories/DisplayUserStories"
import FilterStoriesField from './@user_stories/FilterStoriesField'

const UserProfile = ()=>{
    const [isFiltered, setIsFiltered] = useState(false)
    const [filterValue, setFilterValue] = useState('')

    const token = JSON.parse(localStorage.getItem('token'))
    const imgSrc = "https://nimbly-dev.github.io/img/test-avatar.91e50cc7.png"

    const handleFilterInputChange = (event)=>{
        if(event.target.value === ''){
            setIsFiltered(false)
            setFilterValue('')
        }else {
            setIsFiltered(true);
            setFilterValue(event.target.value);
        }
    }

 
    if (token.username !== null)
        return(
            <main>
                <Navigation currentPage={'Userprofile'}/>
                <section className='container-fluid d-flex justify-content-center'>
                    <div className="row d-flex  flex-column">
                        <div className="col-xs-12">
                            <img src={imgSrc} style={{
                                width: 280,
                            }} 
                            alt={'Img src not found'}/>
                            <h3 className='mt-3 '
                            style={{
                                paddingLeft: 30
                            }}
                            >Welcome back! {token.username}</h3>
                            <FilterStoriesField 
                            handleOnChangeFilterValue={handleFilterInputChange}
                            currentFilterValue={filterValue}
                            />
                            <p>
                                <DisplayUserStories 
                                isFiltered={isFiltered} 
                                filterValue={filterValue}
                                />
                            </p>
                        </div>
                    </div>
                    
                </section>
            </main>
           
        )
    
        
}

export default UserProfile